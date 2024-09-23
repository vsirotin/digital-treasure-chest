import { KeeperMasterDataAsync, KeeperMasterDataSync } from "./i-keyed-keeper-master-data";
import { RepositoryAdapterAsync, RepositoryAdapterSync, RepositoryReaderAsync, RepositoryReaderSync, RepositoryWriterAsync, RepositoryWriterSync } from "./i-repository-adapters";
import { KeeperMasterDataKeyValueSync } from "./keeper-master-data-key-value-sync";
import { KeeperMasterDataKeyValueAsync } from "./keeper-master-data-key-value-async";


describe ('KeeperMasterDataKeyValueAync', () => {
    let asyncReader: RepositoryReaderAsync<string>;
    let asyncWriter: RepositoryWriterAsync<string>;
    let valueA: string|undefined = undefined;
    let adapterAsync: RepositoryAdapterAsync<string>;
    let keeperAsync: KeeperMasterDataAsync<string>;

    class TestAdapterAsync extends RepositoryAdapterAsync<string>{
        override removeValueForkeyAsync(key: string): void {
            throw new Error("Method not implemented.");
        }
        constructor(reader: RepositoryReaderAsync<string>, writer: RepositoryWriterAsync<string>){
            super(reader, writer);
        }
    }

    beforeEach(() => {
        
        asyncReader = {
            isAsync: true,
            readAsync: (key: string): Promise<string|undefined> => {
                return Promise.resolve(valueA);
            }
        };
        asyncWriter = {
            isAsync: true,
            saveAsync: (key: string, val: string): Promise<void> => {
                valueA = val;
                return Promise.resolve();
            }
        };
        adapterAsync = new TestAdapterAsync(asyncReader, asyncWriter);

        keeperAsync = new KeeperMasterDataKeyValueAsync<string>(adapterAsync as RepositoryAdapterAsync<string>);
        
    });

    afterEach(() => {
        valueA = undefined;
    });

    describe ('by creation without readers, only with adapter...', () => {

        it('should be created ', () => {
            expect(keeperAsync).toBeTruthy();
        });

        it('should be able to save and after that find the value by key', async () => {
            const key = 'key11';
            const value = 'value11';
            await keeperAsync?.saveAsync(key, value);
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
                saveAsync: (key: string, val: string): Promise<void> => {
                    valueB = val;
                    return Promise.resolve();
                }
            };
            

            keeperAsync = new KeeperMasterDataKeyValueAsync<string>(adapterAsync as RepositoryAdapterAsync<string>, [asyncReader1]);
        });

        afterEach(() => {
            valueA = undefined;
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
            keeperAsync?.saveAsync(key, value);
            const result = await keeperAsync?.findAsync(key);
            expect(result).toEqual(value);
        });

        it('should be able to find the value if it is in repository of reader', async () => {
            const key = 'key13';
            const value = 'value13';
            asyncWriter1?.saveAsync(key, value);

            const result = await keeperAsync?.findAsync(key);
            expect(result).toEqual(value);
        });

        it('should be able to save the value in repository of adapter if it is repository of reader', async () => {
            const key = 'key14';
            const value14 = 'value14';
            asyncWriter1?.saveAsync(key, value14);
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
                saveAsync: (key: string, val: string): Promise<void> => {
                    value2 = val;
                    return Promise.resolve();
                }
            };
            

            keeperAsync = new KeeperMasterDataKeyValueAsync<string>(adapterAsync as RepositoryAdapterAsync<string>, 
                [asyncReader1, asyncReader2, asyncReader3]);
        });

        afterEach(() => {
            valueA = undefined;
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
            await keeperAsync?.saveAsync(key, value);
            const result = await keeperAsync?.findAsync(key);
            expect(result).toEqual(value);
        });

        it('should be able to find the value if it is in repository of reader', async () => {
            const key = 'key16';
            const value = 'value16';
            await asyncWriter2?.saveAsync(key, value);
            const result = await keeperAsync?.findAsync(key);
            expect(result).toEqual(value);
        });

        it('should be able to save the value in repository of adapter if it is repository of reader', async () => {
            const key17 = 'key17';
            const value17 = 'value17';
            await asyncWriter2?.saveAsync(key17, value17);
            await keeperAsync?.findAsync(key17); //This should save the value in repository of adapter
            
            const result = await asyncReader?.readAsync(key17);
            expect(result).toEqual(value17);
            expect(valueA).toEqual(value17); //The value should be saved in repository of adapter
        });

    });         
    
});