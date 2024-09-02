import { LoggerFactory } from "@vsirotin/log4ts";
import { LocalStorageAdapter } from "./local-storage-adapter";
import { LocalStorageAdapterWithVersionsAndCategories } from "./local-storage-adapter-for-number-and-categories";

describe ('LocalStorageAdapterWithVersionsAndCategories...', () => {

    let category1: string;
    let category2: string;
    let category3: string;
    let version: number;
    let expectedLocalStorageKey: string;
    let key: string = "keyForTest";
    let value: string|undefined = undefined;
    let adapter: LocalStorageAdapterWithVersionsAndCategories;

    beforeEach(() => {
        
        category1 = "category1";
        category2 = "category2";
        category3 = "category3";
        version = 123;
        expectedLocalStorageKey = category1 + "-" + category2 + "-" + category3 + "-v-" + version + "-" + key;
        adapter = new LocalStorageAdapterWithVersionsAndCategories(version, category1, category2, category3);
        
    });

    afterEach(() => {
        value = undefined;
        localStorage.removeItem(expectedLocalStorageKey);
    });

    it('should be created ', () => {
        expect(adapter).toBeTruthy();
    });

    it('should save and read value', () => {
        value = "ValueForTest";
        adapter.saveObjectSync(key, value);
        expect(adapter.readSync(key)).toEqual(value);
    });

    it('should save value with in local storage', () => {
        value = "valueForTest";
        adapter.saveObjectSync(key, value);
        expect(localStorage.getItem(expectedLocalStorageKey)).toEqual(value);
    });

    it('should remove value from local storage', () => {
        value = "valueForTest";
        adapter.saveObjectSync(key, value);
        expect(localStorage.getItem(expectedLocalStorageKey)).toEqual(value);
        adapter.removeValueForkeySync(key);
        expect(localStorage.getItem(expectedLocalStorageKey)).toBeNull();
    });

    
});
