/*
    API for a read-only repository adapter.
*/

export interface IReadOnlyRepositoryAdapter {
    /*
        Fetch (load) an object from repository by key.
        @param key Key
        @param object Object
    */
    fetch(key: string): Promise<Object | undefined>;
}
/*
    API for a writable repository adapter.
*/

export interface WritableRepositoryAdapter extends IReadOnlyRepositoryAdapter {

    /*
        Fetch (load) an object from repository by key.
        @param key Key
        @param object Object
    */
    fetch(key: string): Promise<Object | undefined>;

    /*
        Save an object to repository by key.
        @param key Key
        @param object Object
    */
    saveObject(key: string, object: Object): Promise<void>;
}
