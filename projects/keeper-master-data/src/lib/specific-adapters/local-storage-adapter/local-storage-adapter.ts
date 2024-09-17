import { ILogger, LoggerFactory } from "@vsirotin/log4ts";
import { RepositoryAdapterSync, RepositoryReaderSync, RepositoryWriterSync } from "../../i-repository-adapters";

/*
    Implementation of RepositoryAdapter for local storage based key-value repository.
*/
export class LocalStorageReader implements RepositoryReaderSync<string> {
    protected logger: ILogger = LoggerFactory.getLogger("LocalStorageReader");
    
    /*
        Read an object from repository by key synchronesly.
        @param key Key
        @returns Object
    */
    readSync(key: string): string | undefined {
        const res = localStorage.getItem(key);
        if (res === null) {
            this.logger.log("In readSync key=" + key + " res=null");
            return undefined;
        }
        this.logger.log("In readSync key=" + key + " res=" + res);
        return res;
    }
    /*
        Shows if an adapter is async.
    */
    isAsync: boolean = false;
}

/*
    Implementation of RepositoryWriter for local storage based key-value repository.
*/
export class LocalStorageWriter implements RepositoryWriterSync<string> {
    protected logger: ILogger = LoggerFactory.getLogger("LocalStorageWriter");

    /*
        Save an object to repository by key synchronesly.
        @param key Key
        @param data saved data as string
    */
    saveObjectSync(key: string, data: string): void {
        this.logger.log("In saveObjectSync key=" + key + " data=" + data);
        localStorage.setItem(key, data);
    }

    /*
        Shows if an adapter is async.
    */
    isAsync: boolean = false;

}

/*
    Implementation of RepositoryAdapter for local storage based key-value repository.
*/
export class LocalStorageAdapter extends RepositoryAdapterSync<string> {

    override logger: ILogger = LoggerFactory.getLogger("LocalStorageKeyValueRepositoryAdapter");

    constructor() {
        super(new LocalStorageReader(), new LocalStorageWriter());
        this.logger.log("LocalStorageKeyValueRepositoryAdapter created");
    }

    override removeValueForkeySync(key: string): void {
        this.logger.log("In removeValueForkeySync key=" + key);
        localStorage.removeItem(key);
    }
}
