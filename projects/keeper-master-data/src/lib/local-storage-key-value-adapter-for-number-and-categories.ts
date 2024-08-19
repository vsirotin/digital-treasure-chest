import { LoggerFactory } from "@vsirotin/log4ts";
import { LocalStorageKeyValueAdapter } from "./local-storage-key-value-adapter";

/*
    Implementation of WritableRepositoryAdapter for local storage based key-value repository with version and hierarhy of categories.
*/
export class LocalStorageKeyValueAdapterWithNumberAndCategories extends LocalStorageKeyValueAdapter {
    private prefix: string;

    constructor(private version: number, ...categories: string[]) {
        super();
        this.prefix = categories.join("-") + "-v-" + version;
        this.logger = LoggerFactory.getLogger("LocalStorageKeyValueRepositoryAdapter for " + this.prefix);
        this.logger.log("LocalStorageKeyValueRepositoryAdapter created for ", this.prefix);
    }

    protected override generateStorageKey(key: string): string {
        return this.prefix + "-" + key;
    }
}
