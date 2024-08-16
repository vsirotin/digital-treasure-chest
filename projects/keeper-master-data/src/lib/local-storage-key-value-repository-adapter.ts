import { ILogger, LoggerFactory } from "@vsirotin/log4ts";
import { WritableRepositoryAdapter } from "./i-repository-adapters";

/*
    Implementation of WritableRepositoryAdapter for local storage based key-value repository.
*/

export class LocalStorageKeyValueRepositoryAdapter implements WritableRepositoryAdapter {
    private prefix: string;
    private logger: ILogger;
    constructor(private version: number, ...categories: string[]) {
        this.prefix = categories.join("-") + "-v-" + version;
        this.logger = LoggerFactory.getLogger("LocalStorageKeyValueRepositoryAdapter for " + this.prefix);
        this.logger.log("LocalStorageKeyValueRepositoryAdapter created for ", this.prefix);
    }

    /*
        Fetch (load) an object from repository by key.
        @param key Key
        @param object Object
    */
    async fetch(key: string): Promise<Object | undefined> {
        const storageKey = this.generateStorageKey(key);
        const res = localStorage.getItem(this.generateStorageKey(key));
        this.logger.log("In fetch storageKey=" + storageKey + " res=" + res);
        if (res == null) {
            return undefined;
        }
        return JSON.parse(res as string);
    }

    /*
        Save an object to repository by key.
        @param key Key
        @param object Object
    */
    async saveObject(key: string, object: Object): Promise<void> {
        const storageKey = this.generateStorageKey(key);
        this.logger.log("In saveObject storageKey=" + storageKey + " object=" + object);
        localStorage.setItem(storageKey, JSON.stringify(object));

    }

    private generateStorageKey(key: string): string {
        return this.prefix + "-" + key;
    }
}
