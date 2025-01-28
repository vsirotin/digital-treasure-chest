import { ILogger, LoggerFactory } from "@vsirotin/log4ts";
import { RepositoryAdapterSync } from "../../i-repository-adapters";
import { LocalStorageReader, LocalStorageWriter } from "./local-storage-adapter";

/*
    Implementation of RepositoryAdapter for local storage based key-value repository with versions and categories.
*/
export class LocalStorageAdapterWithVersionsAndCategories extends RepositoryAdapterSync<string> {
    private prefix: string;

    private logger1: ILogger = LoggerFactory.getLogger("eu.sirotin.kms.LocalStorageAdapterWithVersionsAndCategories");

    constructor(private version: number, ...categories: string[]) {
        super(new LocalStorageReaderWithVersionsAndCategories(version, ...categories), 
        new LocalStorageWriterWithVersionsAndCategories(version, ...categories));
        this.prefix = categories.join("-") + "-v-" + version;
        this.logger1.log("constructor: Instance created");
    }


    /*
        Remove an object from repository by key synchronesly.
        @param key Key
    */
    override removeValueForkeySync(key: string): void {
        this.logger1.log("removeValueForkeySync: key=", key);
        localStorage.removeItem(generateStorageKey(key, this.prefix));
    }

    
}

/**
    Generate a key for local storage based on the key and the prefix.
*/
function generateStorageKey(key: string, prefix: string): string {
    return prefix + "-" + key;
}

/**
 * Implementation of LocalStorageReader for local storage based key-value repository with versions and categories.
 */
export class LocalStorageReaderWithVersionsAndCategories<T> extends LocalStorageReader<T> {
    private prefix: string;
    private logger1: ILogger = LoggerFactory.getLogger("eu.sirotin.kmd.LocalStorageReaderWithVersionsAndCategories");

    constructor(private version: number, ...categories: string[]) {
        super();
        this.prefix = categories.join("-") + "-v-" + version;
        this.logger1.log("constructor: Instance created for prefix=", this.prefix);
    }

    /*
        Read an object from repository by key synchronesly.
        @param key Key
        @returns Object or undefined
    */
    override readSync(key: string): T | undefined {
        const generatedKey = generateStorageKey(key, this.prefix);
        const result = super.readSync(generatedKey);
        const isUnderfined = result === undefined;
        this.logger1.log("readSync: generatedKey=", generatedKey, ", result=", result, " isUnderfined=", isUnderfined);
        return result;
    }

}

/**
 * Implementation of LocalStorageWriter for local storage based key-value repository with versions and categories.
 */
export class LocalStorageWriterWithVersionsAndCategories<T> extends LocalStorageWriter<T> {
    private prefix: string;
    private logger2: ILogger = LoggerFactory.getLogger("eu.sirotin.kmd.LocalStorageWriterWithVersionsAndCategories");

    constructor(private version: number, ...categories: string[]) {
        super();
        this.prefix = categories.join("-") + "-v-" + version;
        this.logger2.log(" created for prefix=", this.prefix);
    }

    /**
     * Save an object to repository by key synchronesly.
     * @param key key
     * @param data data to be saved
     */

    override saveSync(key: string, data: T): void {
        const generatedKey = generateStorageKey(key, this.prefix);
        super.saveSync(generatedKey, data);
        this.logger2.log("saveSync: generatedKey=", generatedKey, ", data=", data);
    }

}
