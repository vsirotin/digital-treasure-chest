import { ILogger, LoggerFactory } from "@vsirotin/log4ts";
import { IKeeperMasterDataKeyValue } from "./i-keyed-keeper-master-data";
import { IReadOnlyRepositoryAdapter, WritableRepositoryAdapter } from "./i-repository-adapters";

/*
    Implementation of IKeeperMasterDataKeyValue with key-value based data model.
*/

export class KeeperMasterDataKeyValue<T> implements IKeeperMasterDataKeyValue<T> {
    private logger: ILogger;

    /*
        Constructor. Creates an instance of KeeperMasterDataKeyValue.
        @param componentCoordinate Component coordinate
        @param componentVersion Component version
        @param repositoryAdapters Repository adapters. Should be ordered by probability of data presence.
    */
    constructor(protected repositoryAdapters: IReadOnlyRepositoryAdapter[]) {
        this.logger = LoggerFactory.getLogger("KeeperMasterDataKeyValue");
        if (repositoryAdapters.length <= 0) {
            throw new Error("repositoryAdapters must have at least one element.");
        }
        this.logger.log("KeyedKeeperMasterData created");
    }

    private isWritableRepositoryAdapter(obj: any): obj is WritableRepositoryAdapter {
        return typeof obj.saveObject === 'function';
    }

    /*
        Find a value by key in chain of repository accessors and save it, if possible in first of then, that is able to save it.
        @param key Key
        @returns Promise with value or undefined
    */
    async find(key: string): Promise<T | undefined> {
        const n = this.repositoryAdapters.length;
        const promises = [];
        for (let i = 0; i < n; i++) {
            let keeper = this.repositoryAdapters[i];
            let promise = keeper.fetch(key).then((value: Object | undefined) => {
                this.logger.debug("In find key=" + key + " value=" + JSON.stringify(value));
                if (value) {
                    //Try to find out a keeper to save the value
                    for (let j = 0; j < i; j++) {
                        let child = this.repositoryAdapters[j];
                        if (this.isWritableRepositoryAdapter(child)) {
                            const writableKeeper = child as WritableRepositoryAdapter;
                            writableKeeper.saveObject(key, value).then(() => {
                                this.logger.debug("In find key=" + key + " value=" + JSON.stringify(value) + " saved");
                            });
                            break;
                        }
                    }
                    return value as T;
                } else {
                    return undefined;
                }

            });
            promises.push(promise);
        }
        const results = await Promise.all(promises);
        const result = results.find(value => value !== undefined);

        if (result) {
            return result;
        } else {
            this.logger.warn("In find key=" + key + " value not found. Result undefined");
            return undefined;
        }
    }
}
