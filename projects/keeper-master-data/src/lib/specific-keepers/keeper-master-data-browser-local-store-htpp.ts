import { ILogger, LoggerFactory } from "@vsirotin/log4ts";
import { KeeperMasterDataKeyValueAsync } from "../keeper-master-data-key-value";
import { LocalStorageAdapterWithVersionsAndCategories } from "../specific-adapters/local-storage-adapter/local-storage-adapter-for-number-and-categories";
import { HTTPKeyValueRepositoryReader } from "../specific-adapters/http-key-value-repository-reader";


/*
    Factory of KeeperMasterData.
*/
export class KeeperMasterDataBrowserLocalStoreHtppForComponentWithVersion<T> extends KeeperMasterDataKeyValueAsync<T> {

    loggger: ILogger = LoggerFactory.getLogger("KeeperMasterDataBrowserLocalStoreHtppForComponentWithVersion");

    /**
     * Create a keeper master data with key-value based data model.
     * @param componentCoordinate Component coordinate
     * @param componentVersion Component version
     * @returns instance of IKeeperMasterDataKeyValue
     */
    constructor(componentCoordinate: string, componentVersion: number) {
        super(new LocalStorageAdapterWithVersionsAndCategories(componentVersion, componentCoordinate), 
        [new HTTPKeyValueRepositoryReader(componentCoordinate + "/" + componentVersion + "/")]);
        this.loggger.log(" created for " + componentCoordinate + " v." + componentVersion);
    }

}
