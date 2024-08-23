import { WritableRepositoryAdapterAsync } from "./i-repository-adapters";
import { LocalStorageKeyValueAdapterWithNumberAndCategories } from "./local-storage-key-value-adapter-for-number-and-categories";

/*
    Implementation of WritableRepositoryAdapter for browser memory based key-value repository.
*/

export class BrowserMemorykeyValueAdapterWithNumberAndCategories implements WritableRepositoryAdapterAsync {
    implementation: WritableRepositoryAdapterAsync;
    
    constructor(private version: number, ...categories: string[]) {
        this.implementation = new LocalStorageKeyValueAdapterWithNumberAndCategories(version, ...categories);
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
