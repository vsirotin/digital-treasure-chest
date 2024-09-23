export interface IKeeperMasterData<T> {
    isAsync: boolean;
}

/*
    API for a asynchronesly keeper master data with key-value based data model.
    Keeper generally tryies to keep the data in some own storage.
    By finding, if it not founds data in its storage, it tryies to fetch from known repositories.
*/
export abstract class KeeperMasterDataAsync<T> implements IKeeperMasterData<T> {
    /*
        Save an object to repository by key.
        @param key Key
        @param object Object
        @returns Promise
    */
    abstract saveAsync(key: string, data: T): Promise<void>;

    /*
        Find an object in repository by key.
        @param key Key
        @returns Promise with object or undefined
    */
    abstract findAsync(key: string): Promise<T|undefined>;
    isAsync: boolean = true;
}

/*
    API for a synchronesly keeper master data with key-value based data model.
    Keeper generally tryies to keep the data in some own storage.
    By finding, if it not founds data in its storage, it tryies to fetch from known repositories.
*/
export abstract class KeeperMasterDataSync<T> implements IKeeperMasterData<T> {

    /*
        Save an object to repository by key.
        @param key Key
        @param object Object
    */
    abstract saveSync(key: string, data: T): void;

    /*
        Find an object in repository by key.
        @param key Key
        @returns Object or undefined
    */
    abstract findSync(key: string): T|undefined;
    isAsync: boolean = false;
}
