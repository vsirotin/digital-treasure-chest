import { ILogger, LoggerFactory } from "@vsirotin/log4ts";
import { RepositoryAdapterSync, RepositoryReaderSync, RepositoryWriterSync } from "../../i-repository-adapters";

/*
    Implementation of Repository Reader for local storage based key-value repository.
*/
export class LocalStorageReader<T> implements RepositoryReaderSync<T> {
    private logger: ILogger = LoggerFactory.getLogger("eu.sirotin.kmd.LocalStorageReader");
    
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
    Implementation of Repository Writer for local storage based key-value repository.
*/
export class LocalStorageWriter<T> implements RepositoryWriterSync<T> {
    private logger: ILogger = LoggerFactory.getLogger("eu.sirotin.kmd.LocalStorageWriter");

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
    Internal implementation of RepositoryAdapter for local storage based key-value repository.
    Not recomended to use directly. Use LocalStorageAdapter instead.
*/
export class LocalStorageAdapterSync<T> extends RepositoryAdapterSync<T> {

    private logger1: ILogger = LoggerFactory.getLogger("eu.sirotin.kmd.LocalStorageAdapter");

    constructor() {
        super(new LocalStorageReader<T>(), new LocalStorageWriter<T>());
        this.logger1.log("constructor: created");
    }

    /*
        Remove an object from repository by key synchronesly.
        @param key Key
    */
    override removeValueForkeySync(key: string): void {
        this.logger1.log("In removeValueForkeySync key=", key);
        localStorage.removeItem(key);
    }
}

/*
    Implementation of Repository Adapter for local storage based key-value repository.
*/
export class LocalStorageAdapter<T>  {

    private logger: ILogger = LoggerFactory.getLogger("eu.sirotin.kmd.LocalStorageAdapter");

    private implementation: LocalStorageAdapterSync<T> = new LocalStorageAdapterSync<T>();

    constructor(private key: string, private defaultValue: T) {
        this.logger.log("constructor: created");
    }

    /**
     * Read the value of the key given in the constructor
     * @returns the value of the key
     */
    readValue(): T {
        this.logger.log("In read key=", this.key);
        const res = this.implementation.readSync(this.key);
        if (res === undefined) {
            this.logger.log("In read 1 key=", this.key, " res=undefined");
            return this.defaultValue;
        }
        this.logger.log("In read 2 key=", this.key, " res=", res);
        return res;
    }

    /**
     * Save the value of the key given in the constructor
     * @param value the value to be saved
     */
    saveValue(value: T): void {
        this.logger.log("In save key=", this.key, " value=", value);
        this.implementation.saveSync(this.key, value);
    }

    /**
     * Remove the value of the key given in the constructor
     */
    removeValue(): void {
        this.logger.log("In remove key=", this.key);
        this.implementation.removeValueForkeySync(this.key);    
    }
}
