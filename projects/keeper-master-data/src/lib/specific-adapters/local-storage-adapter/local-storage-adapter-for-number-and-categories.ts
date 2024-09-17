import { ILogger, LoggerFactory } from "@vsirotin/log4ts";
import { RepositoryAdapterSync } from "../../i-repository-adapters";
import { LocalStorageReader, LocalStorageWriter } from "./local-storage-adapter";

/*
    Implementation of WritableRepositoryAdapter for local storage based key-value repository with version and hierarhy of categories.
*/
export class LocalStorageAdapterWithVersionsAndCategories extends RepositoryAdapterSync<string> {
    private prefix: string;

    override logger: ILogger = LoggerFactory.getLogger("LocalStorageAdapterWithVersionsAndCategories");

    constructor(private version: number, ...categories: string[]) {
        super(new LocalStorageReaderWithVersionsAndCategories(version, ...categories), 
        new LocalStorageWriterWithVersionsAndCategories(version, ...categories));
        this.prefix = categories.join("-") + "-v-" + version;
        this.logger.log(" created");
    }


    override removeValueForkeySync(key: string): void {
        this.logger.log("removeValueForkeySync: key=" + key);
        localStorage.removeItem(generateStorageKey(key, this.prefix));
    }

    
}

function generateStorageKey(key: string, prefix: string): string {
    return prefix + "-" + key;
}

export class LocalStorageReaderWithVersionsAndCategories extends LocalStorageReader {
    private prefix: string;

    constructor(private version: number, ...categories: string[]) {
        super();
        this.prefix = categories.join("-") + "-v-" + version;
    }

    override readSync(key: string): string | undefined {
        const generatedKey = generateStorageKey(key, this.prefix);
        const result = super.readSync(generatedKey);
        this.logger.log("readSync: generatedKey=" + generatedKey + ", result=" + result);
        return result;
    }

}

export class LocalStorageWriterWithVersionsAndCategories extends LocalStorageWriter {
    private prefix: string;

    constructor(private version: number, ...categories: string[]) {
        super();
        this.prefix = categories.join("-") + "-v-" + version;
    }

    override saveObjectSync(key: string, data: string): void {
        const generatedKey = generateStorageKey(key, this.prefix);
        super.saveObjectSync(generatedKey, data);
        this.logger.log("saveObjectSync: generatedKey=" + generatedKey + ", data=" + data);
    }

}
