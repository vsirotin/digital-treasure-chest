import { ILogger, LoggerFactory } from "@vsirotin/log4ts";
import { KeeperMasterDataSync } from "./i-keyed-keeper-master-data";
import { RepositoryAdapterSync, RepositoryReaderSync, RepositoryWriterAsync, RepositoryWriterSync } from "./i-repository-adapters";
/*
    Synchrone implementation of IKeeperMasterDataKeyValue with key-value based data model.
*/
export class KeeperMasterDataKeyValueSync<T> extends KeeperMasterDataSync<T> {
    private logger: ILogger = LoggerFactory.getLogger("eu.sirotin.kmd.KeeperMasterDataKeyValueSync");

    /*
        Constructor.
        @param repositoryAdapter Adapter for repository
        @param readers List of readers
        @param logger Logger
    */
    constructor(protected repositoryAdapter: RepositoryAdapterSync<T>, 
        protected readers: RepositoryReaderSync<T>[] = []) {
        super();
        this.logger.log("constructor: created");
    }

    /*
        Save an object to repository by key.
        @param key Key
        @param object Object
    */
    override saveSync(key: string, data: T): void {
        this.logger.log("In saveSync key=" + key + " data=" + data);
        (this.repositoryAdapter as RepositoryAdapterSync<T>).saveSync(key, data);
    }

    /*
        Find an object in repository by key.
        @param key Key
        @returns Object of type T or undefined
    */
    override findSync(key: string): T|undefined {

        let result = this.repositoryAdapter.readSync(key);
        this.logger.log("In findSync after adapterSync.readSync key=", key, " result=", result);

        if(result) {
            return result;
        }

        for(const reader of this.readers) {
            result = reader.readSync(key);
            this.logger.log("In findSync after readerSync.readSync key=", key, " result=", result);
            if(result) {
                //If we are heare, we have found the value is not keeped repositoryAdapter. So we need to save it in it.
                this.repositoryAdapter.saveSync(key, result);             
                this.logger.log("In findSync after adapterSync.saveSync key=", key, " result=", result);
                break;
            }
        }
        this.logger.log("In findSync before return key=", key, " result=", result);
        return result;
    }
}


