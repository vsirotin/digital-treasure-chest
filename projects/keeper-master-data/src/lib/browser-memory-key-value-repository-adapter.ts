import { WritableRepositoryAdapter } from "./i-repository-adapters";
import { LocalStorageKeyValueRepositoryAdapter } from "./local-storage-key-value-repository-adapter";

/*
    Implementation of WritableRepositoryAdapter for browser memory based key-value repository.
*/

export class BrowserMemorykeyValueRepositoryAdapter implements WritableRepositoryAdapter {
    implementation: WritableRepositoryAdapter;
    constructor(private version: number, ...categories: string[]) {
        this.implementation = new LocalStorageKeyValueRepositoryAdapter(version, ...categories);
    }

    /*
        Fetch (load) an object from repository by key.
        @param key Key
        @param object Object
    */
    async fetch(key: string): Promise<Object | undefined> {
        return this.implementation.fetch(key);
    }

    /*
        Save an object to repository by key.
        @param key Key
        @param object Object
    */
    async saveObject(key: string, object: Object): Promise<void> {
        this.implementation.saveObject(key, object);
    }
}
