import { ILogger, LoggerFactory } from "@vsirotin/log4ts";
import { KeeperMasterDataAsync, KeeperMasterDataSync } from "./i-keyed-keeper-master-data";
import { IRepositoryReader, RepositoryAdapter, RepositoryAdapterAsync, RepositoryAdapterSync, RepositoryReaderAsync, RepositoryReaderSync, RepositoryWriterAsync, RepositoryWriterSync } from "./i-repository-adapters";


/*
    Implementation of IKeeperMasterDataKeyValue with key-value based data model.
*/

export class KeeperMasterDataKeyValueSync<T> extends KeeperMasterDataSync<T> {

    private logger: ILogger;


    constructor(protected repositoryAdapter: RepositoryAdapter<T>, 
        protected readers: IRepositoryReader<T>[] = []) {
        super();
        this.logger = LoggerFactory.getLogger("KeeperMasterDataKeyValueSync");
        if(this.readers.find((reader) => {reader.isAsync})){
            throw new Error("KeeperMasterDataKeyValueSync: Async reader found in the list of readers. Only sync readers are allowed.");
        }
        this.logger.log("KeyedKeeperMasterData created");
    }

    override saveObjectSync(key: string, data: T): void {
        this.logger.log("In saveObjectSync key=" + key + " data=" + data);
        (this.repositoryAdapter as RepositoryAdapterSync<T>).saveObjectSync(key, data);
    }


    override findSync(key: string): T|undefined {
        this.logger.log("In findSync key=" + key);

        //const adapterReader = this.repositoryAdapter.reader as RepositoryReaderSync<T>;
        const adapterSync = this.repositoryAdapter as RepositoryAdapterSync<T>;

        let result = adapterSync.readSync(key);
        this.logger.log("In findSync after adapterSync.readSync key=", key, " result=", result);

        if(result) {
            return result;
        }

        for(const reader of this.readers) {
            const readerSync = reader as RepositoryReaderSync<T>;
            result = readerSync.readSync(key);
            this.logger.log("In findSync after readerSync.readSync key=", key, " result=", result);
            if(result) {
                //If we are heare, we have found the value is not keeped repositoryAdapter. So we need to save it in it.
                adapterSync.saveObjectSync(key, result);             
                this.logger.log("In findSync after adapterSync.saveObjectSync key=", key, " result=", result);
                break;
            }
        }
        this.logger.log("In findSync before return key=", key, " result=", result);
        return result;
    }
}

export class KeeperMasterDataKeyValueAsync<T> extends KeeperMasterDataAsync<T> {
    private logger: ILogger;


    constructor(protected repositoryAdapter: RepositoryAdapter<T>, 
        protected readers: IRepositoryReader<T>[] = []) {
        super();
        this.logger = LoggerFactory.getLogger("KeeperMasterDataKeyValueAsync");
        this.logger.log("KeeperMasterDataKeyValueAsync created");
    }

    override async saveObjectAsync(key: string, data: T): Promise<void> {
        this.logger.log("In saveObjectAsync key=" + key + " data=" + data);
        return (this.repositoryAdapter as RepositoryAdapterAsync<T>).saveObjectAsync(key, data);
    }


    override async findAsync(key: string): Promise<T|undefined> {
        this.logger.log("In findAsync key=" + key);
        let result: Awaited<T>|undefined = undefined;
        if(this.repositoryAdapter.isAsync) {
           
            const adapterAsync = this.repositoryAdapter as RepositoryAdapterAsync<T>;

            result = await adapterAsync.readAsync(key);
            this.logger.log("In findAsync 1 key=", key, " result=", result);
    
            if(result) {
                return result;
            }
        }else {
            const adapterSync = this.repositoryAdapter as RepositoryAdapterSync<T>;
            const resSync = adapterSync.readSync(key);
            this.logger.log("In findAsync 2.1 key=", key, " resSync=", resSync);
            if(resSync) {
                result = Promise.resolve(resSync) as Awaited<T>;
                this.logger.log("In findAsync 2 key=", key, " result=", result);       
                return result;
            }
        }

        this.logger.log("In findAsync before starts call reades");
        for(const reader of this.readers) {
            if(reader.isAsync) {
                const readerAsync = reader as RepositoryReaderAsync<T>;
                result =  await readerAsync.readAsync(key);
                this.logger.log("In findAsync after readerAsync.readAsync key=", key, " result=", result);
                if(result) {
                    break;
                }
            } else {
                const readerSync = reader as RepositoryReaderSync<T>;
                const resultSync = readerSync.readSync(key);               
                this.logger.log("In findSync after readerSync.readSync key=", key, " result=", result);
                if(result) {
                    result = Promise.resolve(resultSync) as Awaited<T>;
                    break;
                }
            }
        }
        if(result) {
            //If we are heare, we have found the value is not keeped repositoryAdapter. So we need to save it in it.
           // await adapterAsync.saveObjectAsync(key, result);
            this.logger.log("In findAsync after adapterAsync.saveObjectAsync key=", key, " result=", result);
        }

        return result;
    }

}
