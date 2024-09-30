import { ILogger, LoggerFactory } from "@vsirotin/log4ts";
import { RepositoryAdapterSync } from "../../i-repository-adapters";
import { LocalStorageReader, LocalStorageWriter } from "./local-storage-adapter";

/*
    Implementation of RepositoryAdapter for local storage based key-value repository with versions and categories.
*/
export class LocalStorageAdapterWithVersionsAndCategories extends RepositoryAdapterSync<string> {
    private prefix: string;

    private logger1: ILogger = LoggerFactory.getLogger("LocalStorageAdapterWithVersionsAndCategories");

    constructor(private version: number, ...categories: string[]) {
        super(new LocalStorageReaderWithVersionsAndCategories(version, ...categories), 
        new LocalStorageWriterWithVersionsAndCategories(version, ...categories));
        this.prefix = categories.join("-") + "-v-" + version;
        this.logger1.log(" created");
    }


    override removeValueForkeySync(key: string): void {
        this.logger1.log("removeValueForkeySync: key=", key);
        localStorage.removeItem(generateStorageKey(key, this.prefix));
    }

    
}

function generateStorageKey(key: string, prefix: string): string {
    return prefix + "-" + key;
}

export class LocalStorageReaderWithVersionsAndCategories<T> extends LocalStorageReader<T> {
    private prefix: string;
    private logger1: ILogger = LoggerFactory.getLogger("LocalStorageReaderWithVersionsAndCategories");

    constructor(private version: number, ...categories: string[]) {
        super();
        this.prefix = categories.join("-") + "-v-" + version;
        this.logger1.log(" created for prefix=", this.prefix);
    }

    override readSync(key: string): T | undefined {
        const generatedKey = generateStorageKey(key, this.prefix);
        const result = super.readSync(generatedKey);
        const isUnderfined = result === undefined;
        this.logger1.log("readSync: generatedKey=", generatedKey, ", result=", result, " isUnderfined=", isUnderfined);
        return result;
    }

}

export class LocalStorageWriterWithVersionsAndCategories<T> extends LocalStorageWriter<T> {
    private prefix: string;
    private logger2: ILogger = LoggerFactory.getLogger("LocalStorageWriterWithVersionsAndCategories");

    constructor(private version: number, ...categories: string[]) {
        super();
        this.prefix = categories.join("-") + "-v-" + version;
        this.logger2.log(" created for prefix=", this.prefix);
    }

    override saveSync(key: string, data: T): void {
        const generatedKey = generateStorageKey(key, this.prefix);
        super.saveSync(generatedKey, data);
        this.logger2.log("saveSync: generatedKey=", generatedKey, ", data=", data);
    }

}
