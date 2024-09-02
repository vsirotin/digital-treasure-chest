import { LoggerFactory } from "@vsirotin/log4ts";
import { KeeperMasterDataAsync, KeeperMasterDataSync } from "./i-keyed-keeper-master-data";
import { RepositoryAdapterAsync, RepositoryAdapterSync, RepositoryReaderAsync, RepositoryReaderSync, RepositoryWriterAsync, RepositoryWriterSync } from "./i-repository-adapters";
import { KeeperMasterDataKeyValueAsync, KeeperMasterDataKeyValueSync } from "./keeper-master-data-key-value";

describe ('KeeperMasterDataKeyValue...', () => {

    describe ('KeeperMasterDataKeyValueSync...', () => {
        let syncReader: RepositoryReaderSync<string>|undefined = undefined;
        let syncWriter: RepositoryWriterSync<string>|undefined = undefined;
        let value: string|undefined = undefined;
        let adapterSync: RepositoryAdapterSync<string>|undefined = undefined;
        let keeperSync: KeeperMasterDataSync<string>|undefined = undefined;

        beforeEach(() => {
            

            syncReader = {
                isAsync: false,
                readSync: (key: string) => {
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

            keeperSync = new KeeperMasterDataKeyValueSync<string>(adapterSync as RepositoryAdapterSync<string>);
           
        });

        afterEach(() => {
            value = undefined;
            syncReader = undefined;
            syncReader = undefined;
            syncWriter = undefined;
            adapterSync = undefined;
            keeperSync = undefined;
        });

        describe ('by creation without readers, only with adapter...', () => {

            it('should be created ', () => {
                expect(keeperSync).toBeTruthy();
            });

            it('should be able to save and after that find the value by key', () => {
                const key = 'key1';
                const value = 'value1';
                keeperSync?.saveObjectSync(key, value);
                const result = keeperSync?.findSync(key);
                expect(result).toEqual(value);
            });

            it('should return undefined for non-existing key', () => {
                const result = keeperSync?.findSync('nonExistingKey');
                expect(result).toBeUndefined();
            });

        });

        describe ('by creation with one reader...', () => {

            let syncReader1: RepositoryReaderSync<string>|undefined = undefined;
            let syncWriter1: RepositoryWriterSync<string>|undefined = undefined;
            let value1: string;

            beforeEach(() => {
                syncReader1 = {
                    isAsync: false,
                    readSync: (key: string) => {
                        return value1;
                    }
                };
                syncWriter1 = {
                    isAsync: false,
                    saveObjectSync: (key: string, val: string) => {
                        value1 = val;
                    }
                };
                
                keeperSync = new KeeperMasterDataKeyValueSync<string>(adapterSync as RepositoryAdapterSync<string>, [syncReader1]);
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
                keeperSync?.saveObjectSync(key, value);
                const result = keeperSync?.findSync(key);
                expect(result).toEqual(value);
            });

            it('should be able to find the value if it is in repository of reader', () => {
                const key = 'key2';
                const value = 'value2';
                syncWriter1?.saveObjectSync(key, value);
                const result = keeperSync?.findSync(key);
                expect(result).toEqual(value);
            });

            it('should be able to save the value in repository of adapter if it is repository of reader', () => {
                const key = 'key3';
                const value3 = 'value3';
                syncWriter1?.saveObjectSync(key, value3);
                keeperSync?.findSync(key); //This should save the value in repository of adapter
                const result = syncReader?.readSync(key);
                expect(result).toEqual(value3);
                expect(value).toEqual(value3); //The value should be saved in repository of adapter
            });

        });

        describe ('by creation with many readers...', () => {

            let syncReader1: RepositoryReaderSync<string>|undefined = undefined;
            let syncReader2: RepositoryReaderSync<string>|undefined = undefined;
            let syncReader3: RepositoryReaderSync<string>|undefined = undefined;
            let syncWriter2: RepositoryWriterSync<string>|undefined = undefined;
            let value1: string|undefined = undefined;
            let value2: string|undefined = undefined;
            let value3: string|undefined = undefined;

            beforeEach(() => {
                syncReader1 = {
                    isAsync: false,
                    readSync: (key: string) => {
                        return value1;
                    }
                };

                syncReader2 = {
                    isAsync: false,
                    readSync: (key: string) => {
                        return value2;
                    }
                };

                syncReader3 = {
                    isAsync: false,
                    readSync: (key: string) => {
                        return value3;
                    }
                };

                syncWriter2 = {
                    isAsync: false,
                    saveObjectSync: (key: string, val: string) => {
                        value1 = val;
                    }
                };
                
                keeperSync = new KeeperMasterDataKeyValueSync<string>(adapterSync as RepositoryAdapterSync<string>, [syncReader1, syncReader2, syncReader3]);
            });

            afterEach(() => {
                value2 = undefined;
                syncReader1 = undefined;
                syncReader2 = undefined;
                syncReader3 = undefined;
                syncWriter2 = undefined;
            });

            it('should be created ', () => {
                expect(keeperSync).toBeTruthy();
            });

            it('should be able to save and after that find the value by key', () => {
                const key = 'key4';
                const value = 'value4';
                keeperSync?.saveObjectSync(key, value);
                const result = keeperSync?.findSync(key);
                expect(result).toEqual(value);
            });

            it('should be able to find the value if it is in repository of reader', () => {
                const key = 'key5';
                const value = 'value5';
                syncWriter2?.saveObjectSync(key, value);
                const result = keeperSync?.findSync(key);
                expect(result).toEqual(value);
            });

            it('should be able to save the value in repository of adapter if it is repository of reader', () => {
                const key = 'key6';
                const value6 = 'value6';
                syncWriter2?.saveObjectSync(key, value6);
                keeperSync?.findSync(key); //This should save the value in repository of adapter
                const result = syncReader?.readSync(key);
                expect(result).toEqual(value6);
                expect(value).toEqual(value6); //The value should be saved in repository of adapter
            });

        });
    
    });

    describe ('KeeperMasterDataKeyValueAync', () => {
        let asyncReader: RepositoryReaderAsync<string>|undefined = undefined;
        let asyncWriter: RepositoryWriterAsync<string>|undefined = undefined;
        let valueA: string|undefined = undefined;
        let adapterAsync: RepositoryAdapterAsync<string>|undefined = undefined;
        let keeperAsync: KeeperMasterDataAsync<string>|undefined = undefined;

        beforeEach(() => {
            
            asyncReader = {
                isAsync: true,
                readAsync: (key: string): Promise<string|undefined> => {
                    return Promise.resolve(valueA);
                }
            };
            asyncWriter = {
                isAsync: true,
                saveObjectAsync: (key: string, val: string): Promise<void> => {
                    valueA = val;
                    return Promise.resolve();
                }
            };
            adapterAsync = {
                isAsync: true,
                reader: asyncReader,
                writer: asyncWriter
            };

            keeperAsync = new KeeperMasterDataKeyValueAsync<string>(adapterAsync as RepositoryAdapterAsync<string>);
           
        });

        afterEach(() => {
            valueA = undefined;
            asyncReader = undefined;
            asyncReader = undefined;
            asyncWriter = undefined;
            adapterAsync = undefined;
            keeperAsync = undefined;
        });

        describe ('by creation without readers, only with adapter...', () => {

            it('should be created ', () => {
                expect(keeperAsync).toBeTruthy();
            });

            it('should be able to save and after that find the value by key', async () => {
                const key = 'key11';
                const value = 'value11';
                await keeperAsync?.saveObjectAsync(key, value);
                await keeperAsync?.findAsync(key).then((result) => {
                    expect(result).toEqual(value);
                });
            });

            it('should return undefined for non-existing key', async () => {
                await keeperAsync?.findAsync('nonExistingKey2').then((result) => {
                    expect(result).toBeUndefined();
                });       
            });

        });

        describe ('by creation with one reader...', () => {

            let asyncReader1: RepositoryReaderAsync<string>|undefined = undefined;
            let asyncWriter1: RepositoryWriterAsync<string>|undefined = undefined;
            let valueB: string|undefined = undefined;

            beforeEach(() => {
                asyncReader1 = {
                    isAsync: true,
                    readAsync: (key: string): Promise<string|undefined> => {
                        return Promise.resolve(valueB);
                    }
                };
                asyncWriter1 = {
                    isAsync: true,
                    saveObjectAsync: (key: string, val: string): Promise<void> => {
                        valueB = val;
                        return Promise.resolve();
                    }
                };
                

                keeperAsync = new KeeperMasterDataKeyValueAsync<string>(adapterAsync as RepositoryAdapterAsync<string>, [asyncReader1]);
            });

            afterEach(() => {
                valueA = undefined;
                asyncReader = undefined;
                asyncReader = undefined;
                asyncWriter = undefined;
                adapterAsync = undefined;
                keeperAsync = undefined;
                valueB = undefined;
                asyncReader1 = undefined;
                asyncWriter1 = undefined;
            });

            it('should be created ', async () => {
                expect(keeperAsync).toBeTruthy();
            });

            it('should be able to save and after that find the value by key', async () => {
                const key = 'key12';
                const value = 'value12';
                keeperAsync?.saveObjectAsync(key, value);
                const result = await keeperAsync?.findAsync(key);
                expect(result).toEqual(value);
            });

            it('should be able to find the value if it is in repository of reader', async () => {
                const key = 'key13';
                const value = 'value13';
                asyncWriter1?.saveObjectAsync(key, value);

                const result = await keeperAsync?.findAsync(key);
                expect(result).toEqual(value);
            });

            it('should be able to save the value in repository of adapter if it is repository of reader', async () => {
                const key = 'key14';
                const value14 = 'value14';
                asyncWriter1?.saveObjectAsync(key, value14);
                await keeperAsync?.findAsync(key); //This should save the value in repository of adapter
                const result = await keeperAsync?.findAsync(key);
                expect(result).toEqual(value14);
                expect(valueA).toEqual(value14); //The value should be saved in repository of adapter
            });

     });

        describe ('by creation with many readers...', () => {

            let asyncReader1: RepositoryReaderAsync<string>|undefined = undefined;
            let asyncReader2: RepositoryReaderAsync<string>|undefined = undefined;
            let asyncReader3: RepositoryReaderAsync<string>|undefined = undefined;
            let asyncWriter2: RepositoryWriterAsync<string>|undefined = undefined;
            let value1: string|undefined = undefined;
            let value2: string|undefined = undefined;
            let value3: string|undefined = undefined;

            beforeEach(() => {
                asyncReader1 = {
                    isAsync: true,
                    readAsync: (key: string): Promise<string|undefined> => {
                        return Promise.resolve(value1);
                    }
                };

                asyncReader2 = {
                    isAsync: true,
                    readAsync: (key: string): Promise<string|undefined> => {
                        return Promise.resolve(value2);
                    }
                };

                asyncReader3 = {
                    isAsync: true,
                    readAsync: (key: string): Promise<string|undefined> => {
                        return Promise.resolve(value3);
                    }
                };

                asyncWriter2 = {
                    isAsync: true,
                    saveObjectAsync: (key: string, val: string): Promise<void> => {
                        value2 = val;
                        return Promise.resolve();
                    }
                };
                

                keeperAsync = new KeeperMasterDataKeyValueAsync<string>(adapterAsync as RepositoryAdapterAsync<string>, 
                    [asyncReader1, asyncReader2, asyncReader3]);
            });

            afterEach(() => {
                valueA = undefined;
                asyncReader = undefined;
                asyncReader = undefined;
                asyncWriter = undefined;
                adapterAsync = undefined;
                keeperAsync = undefined;
                value2 = undefined;
                asyncReader1 = undefined;
                asyncReader2 = undefined;
                asyncReader3 = undefined;
                asyncWriter2 = undefined;
            });

            it('should be created ', () => {
                expect(keeperAsync).toBeTruthy();
            });

            it('should be able to save and after that find the value by key', async () => {
                const key = 'key15';
                const value = 'value15';
                await keeperAsync?.saveObjectAsync(key, value);
                const result = await keeperAsync?.findAsync(key);
                expect(result).toEqual(value);
            });

            it('should be able to find the value if it is in repository of reader', async () => {
                const key = 'key16';
                const value = 'value16';
                await asyncWriter2?.saveObjectAsync(key, value);
                const result = await keeperAsync?.findAsync(key);
                expect(result).toEqual(value);
            });

            it('should be able to save the value in repository of adapter if it is repository of reader', async () => {
                const key17 = 'key17';
                const value17 = 'value17';
                await asyncWriter2?.saveObjectAsync(key17, value17);
                await keeperAsync?.findAsync(key17); //This should save the value in repository of adapter
                
                const result = await asyncReader?.readAsync(key17);
                expect(result).toEqual(value17);
                expect(valueA).toEqual(value17); //The value should be saved in repository of adapter
            });

        });         
     
    });

});