import { LocalStorageAdapter } from "./local-storage-adapter";

describe ('LocalStorageAdapter...', () => {

    let key: string;
    let adapter: LocalStorageAdapter<string>;
    let defaultValue = "defaultValue";

    beforeEach(() => {
        key = "keyForTest";
        defaultValue = "defaultValue";
        adapter = new LocalStorageAdapter<string>(key, defaultValue);
        
    });

    afterEach(() => {
        localStorage.removeItem(key);
    });

    it('should be created ', () => {
        expect(adapter).toBeTruthy();
    });

    it('should save and read string value', () => {
        const value = "valueForTest1";
        adapter.saveValue(value);
        expect(adapter.readValue()).toEqual(value);
    });

    it('should save and read object value', () => {
        const defaultValue = {a: 1, b: "blabla"};
        const adapter1 = new LocalStorageAdapter<{a: number, b: string}>(key, defaultValue);
        const value = {a: 1, b: "ax ox ax"};
        adapter1.saveValue(value);
        expect(adapter1.readValue()).toEqual(value);
    });

    it('should save and read object default value', () => {
        const defaultValue = {a: 1, b: "blabla"};
        const adapter1 = new LocalStorageAdapter<{a: number, b: string}>(key, defaultValue);
        expect(adapter1.readValue()).toEqual(defaultValue);
    });

    it('should save value with in local storage', () => {
        const value = 'valueForTest2';
        adapter.saveValue(value);
        expect(localStorage.getItem(key)).toEqual(value);
    });

    it('should remove value from local storage', () => {
        const value = "valueForTest3";
        adapter.saveValue(value);
        expect(localStorage.getItem(key)).toEqual(value);
        adapter.removeValue();
        expect(localStorage.getItem(key)).toBeNull();
    });

});
