import { LoggerFactory } from "@vsirotin/log4ts";
import { KeeperMasterDataSync } from "./i-keyed-keeper-master-data";
import { RepositoryAdapterSync, RepositoryReaderSync, RepositoryWriterSync } from "./i-repository-adapters";
import { KeeperMasterDataKeyValueSync } from "./keeper-master-data-key-value";

describe ('KeeperMasterDataKeyValue', () => {
    let syncReader: RepositoryReaderSync<string>|undefined = undefined;
    let syncWriter: RepositoryWriterSync<string>|undefined = undefined;
    let value: string;
    let adapterSync: RepositoryAdapterSync<string>|undefined = undefined;
    let keeperSync: KeeperMasterDataSync<string>|undefined = undefined;
    describe ('KeeperMasterDataKeyValueSync...', () => {

        beforeEach(() => {
            syncReader = {
                isAsync: false,
                read: (key: string) => {
                    return value;
                }
            };
            syncWriter = {
                isAsync: false,
                saveObjectSync: (key: string, val: string) => {
                    value = val;
                }
            };
            adapterSync = {
                isAsync: false,
                reader: syncReader,
                writer: syncWriter
            };
           
        });

        afterEach(() => {
            value = '';
            syncReader = undefined;
            syncReader = undefined;
            syncWriter = undefined;
            adapterSync = undefined;
            keeperSync = undefined;
        });

        describe ('by creation without readers, only with adapter...', () => {
            beforeEach(() => {
                const adapter = adapterSync as RepositoryAdapterSync<string>;
                keeperSync = new KeeperMasterDataKeyValueSync<string>(adapter);
            });

            it('should be created ', () => {
                expect(keeperSync).toBeTruthy();
            });

            it('should be able to save and after that find the value by key', () => {
                const key = 'key1';
                const value = 'value1';
                const keeper  = keeperSync as KeeperMasterDataKeyValueSync<string>;
                keeper.saveObjectSync(key, value);
                const result = keeper.findSync(key);
                expect(result).toEqual(value);
            });

        });

        describe ('by creation with one reader...', () => {

            let syncReader1: RepositoryReaderSync<string>|undefined = undefined;
            let syncWriter1: RepositoryWriterSync<string>|undefined = undefined;
            let value1: string;

            beforeEach(() => {
                syncReader1 = {
                    isAsync: false,
                    read: (key: string) => {
                        return value1;
                    }
                };
                syncWriter1 = {
                    isAsync: false,
                    saveObjectSync: (key: string, val: string) => {
                        value1 = val;
                    }
                };
                
                let adapterSync1: RepositoryAdapterSync<string> = {
                    isAsync: false,
                    reader: syncReader1,
                    writer: syncWriter1
                };

                const adapter = adapterSync as RepositoryAdapterSync<string>;
                keeperSync = new KeeperMasterDataKeyValueSync<string>(adapter, [syncReader1]);
            });

            afterEach(() => {
                value1 = '';
                syncReader1 = undefined;
                syncWriter1 = undefined;
            });

            it('should be created ', () => {
                expect(keeperSync).toBeTruthy();
            });

            it('should be able to save and after that find the value by key', () => {
                const key = 'key1';
                const value = 'value1';
                const keeper  = keeperSync as KeeperMasterDataKeyValueSync<string>;
                keeper.saveObjectSync(key, value);
                const result = keeper.findSync(key);
                expect(result).toEqual(value);
            });

            it('should be able to finde the value if it is repository of reader', () => {
                const key = 'key1';
                const value = 'value123';
                syncWriter1?.saveObjectSync(key, value);
                const keeper  = keeperSync as KeeperMasterDataKeyValueSync<string>;
                const result = keeper.findSync(key);
                expect(result).toEqual(value);
            });

            it('should be able to save the value in repository of adapter if it is repository of reader', () => {
                LoggerFactory.setLogLevel("KeeperMasterDataKeyValueSync", 0);
                const key = 'key1';
                const value123 = 'value123';
                syncWriter1?.saveObjectSync(key, value123);
                const keeper  = keeperSync as KeeperMasterDataKeyValueSync<string>;
                keeper.findSync(key); //This should save the value in repository of adapter
                const result = syncReader?.read(key);
                expect(result).toEqual(value123);
                expect(value).toEqual(value123); //The value should be saved in repository of adapter
            });

        });
    
    });

    describe ('KeeperMasterDataKeyValueAync', () => {
            
        it('should be created', () => {
            pending('Test not implemented yet');
        });
    });

});