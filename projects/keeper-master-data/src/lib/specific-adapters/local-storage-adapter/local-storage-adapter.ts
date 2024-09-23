import { ILogger, LoggerFactory } from "@vsirotin/log4ts";
import { RepositoryAdapterSync, RepositoryReaderSync, RepositoryWriterSync } from "../../i-repository-adapters";

/*
    Implementation of RepositoryAdapter for local storage based key-value repository.
*/
export class LocalStorageReader implements RepositoryReaderSync<string> {
    private logger: ILogger = LoggerFactory.getLogger("LocalStorageReader");
    
    /*
        Read an object from repository by key synchronesly.
        @param key Key
        @returns Object
    */
    readSync(key: string): string | undefined {
        const res = localStorage.getItem(key);
        if (res === null) {
            this.logger.log("In readSync 1 key=", key, " res=null");
            return undefined;
        }
        this.logger.log("In readSync 2 key=", key, " res=", res);
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
    private logger: ILogger = LoggerFactory.getLogger("LocalStorageWriter");

    /*
        Save an object to repository by key synchronesly.
        @param key Key
        @param data saved data as string
    */
    saveSync(key: string, data: string): void {
        this.logger.log("In saveSync key=", key, " data=", data);
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

    private logger1: ILogger = LoggerFactory.getLogger("LocalStorageAdapter");

    constructor() {
        super(new LocalStorageReader(), new LocalStorageWriter());
        this.logger1.log(" created");
    }

    override removeValueForkeySync(key: string): void {
        this.logger1.log("In removeValueForkeySync key=", key);
        localStorage.removeItem(key);
    }
}
