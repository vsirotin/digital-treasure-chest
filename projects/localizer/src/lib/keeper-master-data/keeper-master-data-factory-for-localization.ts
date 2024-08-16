import { KeeperMasterDataFactory } from "../../../../keeper-master-data/src/lib/i-keyed-keeper-master-data";
import { KeeperMasterDataFactoryInstance } from "../../../../keeper-master-data/src/lib/keeper-master-data-factory-instance";

/*
    Factory of KeeperMasterData tuned for localization.
*/

export class KeeperMasterDataFactoryForLocalization extends KeeperMasterDataFactory {
    static override instance = new KeeperMasterDataFactoryInstance();
}
