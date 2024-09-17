import { LocalStorageAdapter } from "./local-storage-adapter";

xdescribe ('LocalStorageAdapter...', () => {

    let key: string;
    let value: string|undefined = undefined;
    let adapter: LocalStorageAdapter;

    beforeEach(() => {
        
        key = "keyForTest";
        adapter = new LocalStorageAdapter();
        
    });

    afterEach(() => {
        value = undefined;
        localStorage.removeItem(key);
    });

    it('should be created ', () => {
        expect(adapter).toBeTruthy();
    });

    it('should save and read value', () => {
        value = "valueForTest";
        adapter.saveObjectSync(key, value);
        expect(adapter.readSync(key)).toEqual(value);
    });

    it('should save value with in local storage', () => {
        value = "valueForTest";
        adapter.saveObjectSync(key, value);
        expect(localStorage.getItem(key)).toEqual(value);
    });

    it('should remove value from local storage', () => {
        value = "valueForTest";
        adapter.saveObjectSync(key, value);
        expect(localStorage.getItem(key)).toEqual(value);
        adapter.removeValueForkeySync(key);
        expect(localStorage.getItem(key)).toBeNull();
    });

});
