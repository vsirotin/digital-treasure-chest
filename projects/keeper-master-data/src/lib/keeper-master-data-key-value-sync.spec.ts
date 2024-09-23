import { KeeperMasterDataSync, KeeperMasterDataAsync } from "./i-keyed-keeper-master-data";
import { RepositoryReaderSync, RepositoryWriterSync, RepositoryAdapterSync, RepositoryReaderAsync, RepositoryWriterAsync, RepositoryAdapterAsync } from "./i-repository-adapters";
import { KeeperMasterDataKeyValueSync } from "./keeper-master-data-key-value-sync";
import { KeeperMasterDataKeyValueAsync } from "./keeper-master-data-key-value-async";

describe('KeeperMasterDataKeyValueSync...', () => {
    let syncReader: RepositoryReaderSync<string>;
    let syncWriter: RepositoryWriterSync<string>;
    let value: string | undefined = undefined;
    let adapterSync: RepositoryAdapterSync<string>;
    let keeperSync: KeeperMasterDataSync<string>;

    class TestAdapterSync extends RepositoryAdapterSync<string> {
        override removeValueForkeySync(key: string): void {
            throw new Error("Method not implemented.");
        }
        constructor(reader: RepositoryReaderSync<string>, writer: RepositoryWriterSync<string>) {
            super(reader, writer);
        }
    }

    beforeEach(() => {

        syncReader = {
            isAsync: false,
            readSync: (key: string) => {
                return value;
            }
        };
        syncWriter = {
            isAsync: false,
            saveSync: (key: string, val: string) => {
                value = val;
            }
        };
        adapterSync = new TestAdapterSync(syncReader, syncWriter);

        keeperSync = new KeeperMasterDataKeyValueSync<string>(adapterSync as RepositoryAdapterSync<string>);

    });

    afterEach(() => {
        value = undefined;
    });

    describe('by creation without readers, only with adapter...', () => {

        it('should be created ', () => {
            expect(keeperSync).toBeTruthy();
        });

        it('should be able to save and after that find the value by key', () => {
            const key = 'key1';
            const value = 'value1';
            keeperSync?.saveSync(key, value);
            const result = keeperSync?.findSync(key);
            expect(result).toEqual(value);
        });

        it('should return undefined for non-existing key', () => {
            const result = keeperSync?.findSync('nonExistingKey');
            expect(result).toBeUndefined();
        });

    });

    describe('by creation with one reader...', () => {

        let syncReader1: RepositoryReaderSync<string> | undefined = undefined;
        let syncWriter1: RepositoryWriterSync<string> | undefined = undefined;
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
                saveSync: (key: string, val: string) => {
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
            keeperSync?.saveSync(key, value);
            const result = keeperSync?.findSync(key);
            expect(result).toEqual(value);
        });

        it('should be able to find the value if it is in repository of reader', () => {
            const key = 'key2';
            const value = 'value2';
            syncWriter1?.saveSync(key, value);
            const result = keeperSync?.findSync(key);
            expect(result).toEqual(value);
        });

        it('should be able to save the value in repository of adapter if it is repository of reader', () => {
            const key = 'key3';
            const value3 = 'value3';
            syncWriter1?.saveSync(key, value3);
            keeperSync?.findSync(key); //This should save the value in repository of adapter
            const result = syncReader?.readSync(key);
            expect(result).toEqual(value3);
            expect(value).toEqual(value3); //The value should be saved in repository of adapter
        });

    });

    describe('by creation with many readers...', () => {

        let syncReader1: RepositoryReaderSync<string> | undefined = undefined;
        let syncReader2: RepositoryReaderSync<string> | undefined = undefined;
        let syncReader3: RepositoryReaderSync<string> | undefined = undefined;
        let syncWriter2: RepositoryWriterSync<string> | undefined = undefined;
        let value1: string | undefined = undefined;
        let value2: string | undefined = undefined;
        let value3: string | undefined = undefined;

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
                saveSync: (key: string, val: string) => {
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
            keeperSync?.saveSync(key, value);
            const result = keeperSync?.findSync(key);
            expect(result).toEqual(value);
        });

        it('should be able to find the value if it is in repository of reader', () => {
            const key = 'key5';
            const value = 'value5';
            syncWriter2?.saveSync(key, value);
            const result = keeperSync?.findSync(key);
            expect(result).toEqual(value);
        });

        it('should be able to save the value in repository of adapter if it is repository of reader', () => {
            const key = 'key6';
            const value6 = 'value6';
            syncWriter2?.saveSync(key, value6);
            keeperSync?.findSync(key); //This should save the value in repository of adapter
            const result = syncReader?.readSync(key);
            expect(result).toEqual(value6);
            expect(value).toEqual(value6); //The value should be saved in repository of adapter
        });

    });

});
