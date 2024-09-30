import { ILogger, LoggerFactory } from "@vsirotin/log4ts";
import { RepositoryAdapterSync, RepositoryReaderSync, RepositoryWriterSync } from "../../i-repository-adapters";

/*
    Implementation of RepositoryAdapter for local storage based key-value repository.
*/
export class LocalStorageReader<T> implements RepositoryReaderSync<T> {
    private logger: ILogger = LoggerFactory.getLogger("LocalStorageReader");
    
    /*
        Read an object from repository by key synchronesly.
        @param key Key
        @returns Object
    */
    readSync(key: string): T | undefined {
        const res = localStorage.getItem(key);
        if (res === null) {
            this.logger.log("In readSync 1 key=", key, " res=null");
            return undefined;
        }
        this.logger.log("In readSync 2 key=", key, " res=", res);
    
        try {
            return JSON.parse(res) as T;
        } catch (e) {
            this.logger.log("In readSync 3 res not parseable, brobably it is a string");
        }
        return res as unknown as T;
    }
    /*
        Shows if an adapter is async.
    */
    isAsync: boolean = false;
}

/*
    Implementation of RepositoryWriter for local storage based key-value repository.
*/
export class LocalStorageWriter<T> implements RepositoryWriterSync<T> {
    private logger: ILogger = LoggerFactory.getLogger("LocalStorageWriter");

    /*
        Save an object to repository by key synchronesly.
        @param key Key
        @param data saved data 
    */
    saveSync(key: string, data: T): void {
        const type = typeof data;
        this.logger.log("In saveSync key=", key, " type=", type, " data=", data);
        if(type === "string") {
            localStorage.setItem(key, data as unknown as string);
            return;
        }
        localStorage.setItem(key, JSON.stringify(data));
    }

    /*
        Shows if an adapter is async.
    */
    isAsync: boolean = false;

}

/*
    Implementation of RepositoryAdapter for local storage based key-value repository.
*/
export class LocalStorageAdapter<T> extends RepositoryAdapterSync<T> {

    private logger1: ILogger = LoggerFactory.getLogger("LocalStorageAdapter");

    constructor() {
        super(new LocalStorageReader<T>(), new LocalStorageWriter<T>());
        this.logger1.log(" created");
    }

    override removeValueForkeySync(key: string): void {
        this.logger1.log("In removeValueForkeySync key=", key);
        localStorage.removeItem(key);
    }
}
