import { ILogger, LoggerFactory } from "@vsirotin/log4ts";
import { KeeperMasterDataKeyValueAsync } from "../keeper-master-data-key-value-async";
import { LocalStorageAdapterWithVersionsAndCategories } from "../specific-adapters/local-storage-adapter/local-storage-adapter-for-number-and-categories";
import { HTTPKeyValueRepositoryReader } from "../specific-readers/reader-http";
import { ReaderDefault } from "../specific-readers/reader-default";


/*
    Keeper of KeeperMasterData for browser local storage with HTTP reader.
    This keeper holds data in local storage. 
    By finding it looks for the data in local storage and if it is not found it tries to find it in the HTTP repository.
*/
export class KeeperMasterDataBrowserLocalStoreHtppDefaultForComponentWithVersion<T> extends KeeperMasterDataKeyValueAsync<T> {

    loggger: ILogger = LoggerFactory.getLogger("KeeperMasterDataBrowserLocalStoreHtppDEfaultForComponentWithVersion");

    /**
     * Create a keeper master data with key-value based data model.
     * @param componentCoordinate Component coordinate
     * @param componentVersion Component version
     * @returns instance of IKeeperMasterDataKeyValue
     */
    constructor(componentCoordinate: string, componentVersion: number, private defaultData: T) {
        super(new LocalStorageAdapterWithVersionsAndCategories(componentVersion, componentCoordinate), 
        [new HTTPKeyValueRepositoryReader(componentCoordinate + "/" + componentVersion + "/"),
        new ReaderDefault<T>(defaultData)
        ]);
        this.loggger.log(" created for ", componentCoordinate, " v.", componentVersion);
    }

}


