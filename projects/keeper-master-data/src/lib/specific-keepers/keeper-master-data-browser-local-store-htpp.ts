import { ILogger, LoggerFactory } from "@vsirotin/log4ts";
import { KeeperMasterDataKeyValueAsync } from "../keeper-master-data-key-value-async";
import { LocalStorageAdapterWithVersionsAndCategories } from "../specific-adapters/local-storage-adapter/local-storage-adapter-for-number-and-categories";
import { HTTPKeyValueRepositoryReader } from "../specific-readers/reader-http";


/*
    Keeper of KeeperMasterData for browser local storage with HTTP reader.
    This keeper holds data in local storage. 
    By finding it looks for the data in local storage and if it is not found it tries to find it in the HTTP repository.
*/
export class KeeperMasterDataBrowserLocalStoreHtppForComponentWithVersion<T> extends KeeperMasterDataKeyValueAsync<T> {

    loggger: ILogger = LoggerFactory.getLogger("eu.sirotin.kmd.KeeperMasterDataBrowserLocalStoreHtppForComponentWithVersion");

    /**
     * Create a keeper master data with key-value based data model.
     * @param componentCoordinate Component coordinate
     * @param componentVersion Component version
     * @returns instance of IKeeperMasterDataKeyValue
     */
    constructor(componentCoordinate: string, componentVersion: number) {
        super(new LocalStorageAdapterWithVersionsAndCategories(componentVersion, componentCoordinate), 
        [new HTTPKeyValueRepositoryReader(componentCoordinate + "/" + componentVersion + "/")]);
        this.loggger.log("constructor: created for " + componentCoordinate + " v." + componentVersion);
    }

}
