import { LocalStorageAdapterSync } from "./local-storage-adapter";

describe ('LocalStorageAdapterSync...', () => {

    let key: string;
    let adapter: LocalStorageAdapterSync<string>;

    beforeEach(() => {
        key = "keyForTest";
        adapter = new LocalStorageAdapterSync<string>();
        
    });

    afterEach(() => {
        const value = localStorage.getItem(key);
        localStorage.removeItem(key);
    });

    it('should be created ', () => {
        expect(adapter).toBeTruthy();
    });

    it('should save and read string value', () => {
        const value = "valueForTest1";
        adapter.saveSync(key, value);
        expect(adapter.readSync(key)).toEqual(value);
    });

    it('should save and read object value', () => {
        const value = {a: 1, b: "blabla"};
        const adapter1 = new LocalStorageAdapterSync<{a: number, b: string}>();
        adapter1.saveSync(key, value);
        expect(adapter1.readSync(key)).toEqual(value);
    });

    it('should save value with in local storage', () => {
        const value = 'valueForTest2';
        adapter.saveSync(key, value);
        expect(localStorage.getItem(key)).toEqual(value);
    });

    it('should remove value from local storage', () => {
        const value = "valueForTest3";
        adapter.saveSync(key, value);
        expect(localStorage.getItem(key)).toEqual(value);
        adapter.removeValueForkeySync(key);
        expect(localStorage.getItem(key)).toBeNull();
    });

});
