import { ILogger, LoggerFactory } from "@vsirotin/log4ts";

/*
 API for a keeper master data with key-value based data model.
 Keeper generally tryies to keep the data in some local storage, and if not found, try to fetch from known repositories.
*/
export interface IKeeperMasterDataKeyValue<T> {
    find(key: string): Promise<T|undefined>;
}


export interface IReadOnlyRepositoryAdapter {
    fetch(key: string): Promise<Object|undefined>;
    
}

/*
    API for a writable repository adapter.
    (to use it in type check, iz should be in TypeScript a class, not interface).
*/
export abstract class WritableRepositoryAdapter implements IReadOnlyRepositoryAdapter {

    abstract fetch(key: string): Promise<Object|undefined>;
    
     abstract saveObject(key: string, object: Object): Promise<void>;  
}



export class KeeperMasterDataKeyValue<T> implements IKeeperMasterDataKeyValue<T> {
    private logger: ILogger;

    constructor(protected componentCoordinate: string, protected componentVersion: number, protected childKeepers: IReadOnlyRepositoryAdapter[]) {
        this.logger = LoggerFactory.getLogger("KeyedKeeperMasterData for " + componentCoordinate + " - " + componentVersion);
        this.logger.log("KeyedKeeperMasterData created for ", componentCoordinate, ", ", componentVersion, " with ", childKeepers.length, " child keepers");
        if (childKeepers.length <= 0) {
            throw new Error("childKeepers must have at least one element.");
        }
    }   

    async find(key: string): Promise<T|undefined> {
        const n = this.childKeepers.length;
        const promises = [];
        for (let i = 0; i < n; i++) {
            let keeper = this.childKeepers[i];
            let promise = keeper.fetch(key).then((value: Object|undefined) => {
                this.logger.debug("In find key=" + key + " value=" + JSON.stringify(value));
                if(value) {
                    //Try to find out a keeper to save the value
                    for (let j = i; j >=0; j--) {
                        let downKeeper = this.childKeepers[j];
                        if(downKeeper instanceof WritableRepositoryAdapter) {
                            const writableKeeper = downKeeper as WritableRepositoryAdapter;
                            writableKeeper.saveObject(key, value).then(() => {
                                this.logger.debug("In find key=" + key + " value=" + JSON.stringify(value) + " saved");
                            });
                            break;
                        }
                    }
                    return value as T;     
                }else{
                    return undefined;
                } 
                              
            })
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

export class HTTPKeyValueRepositoryAdapter implements IReadOnlyRepositoryAdapter {

    private logger: ILogger;
    constructor(private urlPrefix: string) {
        this.logger = LoggerFactory.getLogger("HTTPKeyValueRepositoryAdapter for " + urlPrefix);
        this.logger.log("HTTPKeyValueRepositoryAdapter created for ", urlPrefix);
    }
    async fetch(key: string): Promise<Object|undefined> {
        let path = this.urlPrefix + key + ".json";
        this.logger.debug("Start of fetching from " + path);
       return await fetch(path)
        .then(response => {
          if (!response.ok) {
            this.logger.warn("In Localizer.loadLanguageRelevantItemsFromServer HTTP error. Status=", 
              response.status, "by fetching from ", path); 
          }
          return response.json(); 
        }).catch((error) => {
            this.logger.error("In fetch catch error=" + error);
            return undefined;
        })
    }
}

export class LocalStorageKeyValueRepositoryAdapter implements WritableRepositoryAdapter {
    private prefix: string;
    private logger: ILogger;
    constructor(private version: number, ...categories: string[]) {
        this.prefix = categories.join("-") + "-v-" + version;
        this.logger = LoggerFactory.getLogger("LocalStorageKeyValueRepositoryAdapter for " + this.prefix);
        this.logger.log("LocalStorageKeyValueRepositoryAdapter created for ", this.prefix);
    }
    async fetch(key: string): Promise<Object|undefined> {
        let res = localStorage.getItem(this.prefix + key);
        this.logger.debug("In fetch key=" + key + " res=" + res); 
        if(res == null){
            return undefined;
        }  
        return JSON.parse(res as string);
    }
    async saveObject(key: string, object: Object): Promise<void> {
        localStorage.setItem(this.prefix + key, JSON.stringify(object));
        
    }
}

export class BrowserMemorykeyValueRepositoryAdapter implements WritableRepositoryAdapter {
    implementation: WritableRepositoryAdapter;
    constructor(private version: number, ...categories: string[]) {
        this.implementation = new LocalStorageKeyValueRepositoryAdapter(version, ...categories)
    }
    async fetch(key: string): Promise<Object|undefined> {
        return this.implementation.fetch(key);
    }
    async saveObject(key: string, object: Object): Promise<void> {
        this.implementation.saveObject(key, object);
    }
}

export interface IKeeperMasterDataFactoryInstance {
    createKeeperMasterDataKeyValue<T>(componentCoordinate: string, componentVersion: number): IKeeperMasterDataKeyValue<T>;
}

export abstract class KeeperMasterDataFactory {
   static instance: IKeeperMasterDataFactoryInstance;
}

export class KeeperMasterDataFactoryInstance implements IKeeperMasterDataFactoryInstance {
    
    createKeeperMasterDataKeyValue<T>(componentCoordinate: string, componentVersion: number): IKeeperMasterDataKeyValue<T> {
        const httpAdapter = new HTTPKeyValueRepositoryAdapter(componentCoordinate + "/" + componentVersion + "/");
        const browserMemoryAdapter = new BrowserMemorykeyValueRepositoryAdapter(componentVersion, componentCoordinate);
        return new KeeperMasterDataKeyValue<T>(componentCoordinate, componentVersion, [httpAdapter, browserMemoryAdapter]);
    }
    
}

export class KeeperMasterDataFactoryForLocalization extends KeeperMasterDataFactory {
    static override instance = new KeeperMasterDataFactoryInstance();
}



 