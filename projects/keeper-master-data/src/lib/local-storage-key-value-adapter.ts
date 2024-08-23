import { ILogger, LoggerFactory } from "@vsirotin/log4ts";
import { WritableRepositoryAdapter, WritableRepositoryAdapterAsync } from "./i-repository-adapters";

/*
    Implementation of WritableRepositoryAdapter for local storage based key-value repository.
*/

export class LocalStorageKeyValueAdapter implements WritableRepositoryAdapter<string> {

    protected logger: ILogger = LoggerFactory.getLogger("LocalStorageKeyValueRepositoryAdapter");

    /*
        Fetch (load) an object from repository by key.
        @param key Key
        @param object Object
    */
    fetch(key: string): string  {
        const storageKey = this.generateStorageKey(key);
        const res = localStorage.getItem(this.generateStorageKey(key));
        this.logger.log("In fetch storageKey=" + storageKey + " res=" + res);
        if(res === null) {
            return "";
        }
        return res;
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

    protected generateStorageKey(key: string): string {
        return key;
    }
}
