export interface IKeeperMasterData<T> {
    isAsync: boolean;
}

/*
 API for a keeper master data with key-value based data model.
 Keeper generally tryies to keep the data in some local storage, and if not found, try to fetch from known repositories.
*/
export abstract class KeeperMasterDataAsync<T> implements IKeeperMasterData<T> {
    abstract saveObjectAsync(key: string, data: T): Promise<void>;
    abstract findAsync(key: string): Promise<T|undefined>;
    isAsync: boolean = true;
}

export abstract class KeeperMasterDataSync<T> implements IKeeperMasterData<T> {
    abstract saveObjectSync(key: string, data: T): void;
    abstract findSync(key: string): T|undefined;
    isAsync: boolean = false;
}
