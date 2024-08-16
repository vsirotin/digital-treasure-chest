import { BrowserMemorykeyValueRepositoryAdapter } from "./browser-memory-key-value-repository-adapter";
import { HTTPKeyValueRepositoryAdapter } from "./http-key-value-repository-adapter";
import { IKeeperMasterDataFactory, IKeeperMasterDataKeyValue } from "./i-keyed-keeper-master-data";
import { KeeperMasterDataKeyValue } from "./keeper-master-data-key-value";

/*
    Instance of factory of KeeperMasterData.
*/
export class KeeperMasterDataFactoryInstance implements IKeeperMasterDataFactory {

    /**
     * Create a keeper master data with key-value based data model.
     * @param componentCoordinate Component coordinate
     * @param componentVersion Component version
     * @returns instance of IKeeperMasterDataKeyValue
     */
    createKeeperMasterDataKeyValue<T>(componentCoordinate: string, componentVersion: number): IKeeperMasterDataKeyValue<T> {
        const browserMemoryAdapter = new BrowserMemorykeyValueRepositoryAdapter(componentVersion, componentCoordinate);
        const httpAdapter = new HTTPKeyValueRepositoryAdapter(componentCoordinate + "/" + componentVersion + "/");

        return new KeeperMasterDataKeyValue<T>(componentCoordinate, componentVersion, [browserMemoryAdapter, httpAdapter]);
    }
}
