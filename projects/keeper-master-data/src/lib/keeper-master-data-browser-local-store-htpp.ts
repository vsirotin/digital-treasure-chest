import { BrowserMemorykeyValueAdapterWithNumberAndCategories as BrowserMemorykeyValueRepositoryAdapterForComponentWithVersion } from "./browser-memory-key-value-adapter";
import { HTTPKeyValueRepositoryAdapter } from "./http-key-value-repository-adapter";
import { IKeeperMasterDataKeyValue } from "./i-keyed-keeper-master-data";
import { KeeperMasterDataKeyValue } from "./keeper-master-data-key-value";

/*
    Factory of KeeperMasterData.
*/
export class KeeperMasterDataBrowserLocalStoreHtppForComponentWithVersion<T> implements IKeeperMasterDataKeyValue<T> {

    keeperImpl : IKeeperMasterDataKeyValue<T>;

    /**
     * Create a keeper master data with key-value based data model.
     * @param componentCoordinate Component coordinate
     * @param componentVersion Component version
     * @returns instance of IKeeperMasterDataKeyValue
     */
    constructor(componentCoordinate: string, componentVersion: number) {
        const browserMemoryAdapter = new BrowserMemorykeyValueRepositoryAdapterForComponentWithVersion(componentVersion, componentCoordinate);
        const httpAdapter = new HTTPKeyValueRepositoryAdapter(componentCoordinate + "/" + componentVersion + "/");

        this.keeperImpl = new KeeperMasterDataKeyValue<T>([browserMemoryAdapter, httpAdapter]);
    }
    find(key: string): Promise<T | undefined> {
        return this.keeperImpl.find(key);
    }
}
