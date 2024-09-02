import { ILogger, LoggerFactory } from "@vsirotin/log4ts";
import { KeeperMasterDataAsync, KeeperMasterDataSync } from "./i-keyed-keeper-master-data";
import { IRepositoryReader, RepositoryAdapter, RepositoryReaderAsync, RepositoryReaderSync, RepositoryWriterAsync, RepositoryWriterSync } from "./i-repository-adapters";


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
        const writer = this.repositoryAdapter.writer as RepositoryWriterSync<T>;
        writer.saveObjectSync(key, data);
    }


    override findSync(key: string): T|undefined {
        this.logger.log("In findSync key=" + key);

        const adapterReader = this.repositoryAdapter.reader as RepositoryReaderSync<T>;

        let result = adapterReader.readSync(key);
        this.logger.log("In findSync 1 key=", key, " result=", result);

        if(result) {
            return result;
        }

        for(const reader of this.readers) {
            const readerSync = reader as RepositoryReaderSync<T>;
            result = readerSync.readSync(key);
            if(result) {
                //If we are heare, we have found the value is not keeped repositoryAdapter. So we need to save it in it.
                if (this.repositoryAdapter.writer) {
                    const writerSync = this.repositoryAdapter.writer as RepositoryWriterSync<T>;
                    writerSync.saveObjectSync(key, result);             
                }
                return result;
            }
        }
        this.logger.log("In findSync 2 key=", key, " result=", result);
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
        const writer = this.repositoryAdapter.writer as RepositoryWriterAsync<T>;
        return writer.saveObjectAsync(key, data);
    }


    override async findAsync(key: string): Promise<T|undefined> {

        const adapterReader = this.repositoryAdapter.reader;

        let result = await this.readDataWithSingleReader(key, adapterReader);

        if(result) {
            return result;
        }

        result = await this.readDataWithMultipleReadersRecurcively(key, this.readers);
        if(result) {
            //If we are heare, we have found the value is not keeped repositoryAdapter. So we need to save it in it.
            if (this.repositoryAdapter.writer) {
                const writer = this.repositoryAdapter.writer;
                if (writer.isAsync) {
                    const writerAsync = writer as RepositoryWriterAsync<T>;
                    await writerAsync.saveObjectAsync(key, result);
                }else {
                    const writerSync = writer as RepositoryWriterSync<T>;
                    writerSync.saveObjectSync(key, result);
                }               
            }
        }

        return result;
    }



    private async readDataWithSingleReader(key: string, reader: IRepositoryReader<T>): Promise<T | undefined> {
        if (!reader.isAsync) {
            const readerSync = reader as RepositoryReaderSync<T>;
            return readerSync.readSync(key);
        }
        const readerAsync = reader as RepositoryReaderAsync<T>;
        let result =  await readerAsync.readAsync(key);
        if (result) {
             //If we are heare, we have found the value is not keeped repositoryAdapter. So we need to save it in it.
             if (this.repositoryAdapter.writer) {
                const writerSync = this.repositoryAdapter.writer as RepositoryWriterAsync<T>;
                writerSync.saveObjectAsync(key, result);             
             }
            return result;
        }
        return result;
        
    }

    private async readDataWithMultipleReadersRecurcively(key: string, readers: IRepositoryReader<T>[]): Promise<T | undefined> {
        if (readers.length === 0) {
            return undefined;
        }
        const reader = readers[0];
        const result = await this.readDataWithSingleReader(key, reader);
        if (result) {
            return result;
        }
        return this.readDataWithMultipleReadersRecurcively(key, readers.slice(1));
    }
}
