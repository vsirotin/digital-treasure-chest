import { ILogger, LoggerFactory } from "@vsirotin/log4ts";
import { KeeperMasterDataAsync } from "./i-keyed-keeper-master-data";
import { RepositoryAdapter, IRepositoryReader, RepositoryAdapterSync, RepositoryAdapterAsync, RepositoryReaderAsync, RepositoryReaderSync } from "./i-repository-adapters";

/*
    Aynchrone implementation of KeeperMasterData with key-value based data model.
*/
export class KeeperMasterDataKeyValueAsync<T> extends KeeperMasterDataAsync<T> {
    /*
        Constructor.
        @param repositoryAdapter Adapter for repository, can be async or sync
        @param readers List of readers, can be async or sync
        @param logger Logger
    */
    constructor(protected repositoryAdapter: RepositoryAdapter<T>,
        protected readers: IRepositoryReader<T>[] = [],
        private logger: ILogger = LoggerFactory.getLogger("KeeperMasterDataKeyValueAsync")) {
        super();
        this.logger = LoggerFactory.getLogger("KeeperMasterDataKeyValueAsync");
        this.logger.log("KeeperMasterDataKeyValueAsync created");
    }

    /*
        Save an object to repository by key.
        @param key Key
        @param object Object
        @returns Promise
    */
    override async saveAsync(key: string, data: T): Promise<void> {
        this.logger.log("In saveAsync key=" + key + " data=" + data);
        if (!this.repositoryAdapter.isAsync) {
            return (this.repositoryAdapter as RepositoryAdapterSync<T>).saveSync(key, data);
        }
        return (this.repositoryAdapter as RepositoryAdapterAsync<T>).saveAsync(key, data);
    }

    /*
        Find an object in repository by key.
        @param key Key
        @returns Promise with object of type T or undefined
    */
    override async findAsync(key: string): Promise<T | undefined> {
        this.logger.log("In findAsync key=" + key);
        let result: Awaited<T> | undefined = undefined;
        if (this.repositoryAdapter.isAsync) {

            const adapterAsync = this.repositoryAdapter as RepositoryAdapterAsync<T>;

            result = await adapterAsync.readAsync(key);
            this.logger.log("In findAsync 1 key=", key, " result=", result);

            if (result) {
                return result;
            }
        } else {
            const adapterSync = this.repositoryAdapter as RepositoryAdapterSync<T>;
            const resSync = adapterSync.readSync(key);
            this.logger.log("In findAsync 2.1 key=", key, " resSync=", resSync);
            if (resSync) {
                result = Promise.resolve(resSync) as Awaited<T>;
                this.logger.log("In findAsync 2 key=", key, " result=", result);
                return result;
            }
        }

        this.logger.log("In findAsync before starts call readers");
        for (const reader of this.readers) {
            if (reader.isAsync) {
                const readerAsync = reader as RepositoryReaderAsync<T>;
                result = await readerAsync.readAsync(key);
                this.logger.log("In findAsync after readerAsync.readAsync key=", key, " result=", result);
                if (result) {
                    break;
                }
            } else {
                const readerSync = reader as RepositoryReaderSync<T>;
                const resultSync = readerSync.readSync(key);
                this.logger.log("In findSync after readerSync.readSync key=", key, " resultSync=", resultSync);
                if (resultSync) {
                    result = Promise.resolve(resultSync) as Awaited<T>;
                    this.logger.log("In findAsync after results.push result=", result);
                    break;
                }
            }
        }


        if (result) {
            //If we are heare, we have found the value is not keeped repositoryAdapter. So we need to save it in it.
            const pureRsult = await result as T;
            await this.saveAsync(key, pureRsult);
            this.logger.log("In findAsync after call saveAsync key=", key, " pureRsult=", pureRsult);
            return result;
        }
        

        this.logger.log("In findAsync 3 key=", key, " result undefined");
        return undefined;
    }

}
