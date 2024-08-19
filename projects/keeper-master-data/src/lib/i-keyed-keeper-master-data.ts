/*
 API for a keeper master data with key-value based data model.
 Keeper generally tryies to keep the data in some local storage, and if not found, try to fetch from known repositories.
*/
export interface IKeeperMasterDataKeyValue<T> {
    find(key: string): Promise<T|undefined>;
}
