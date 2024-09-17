import { LoggerFactory } from "@vsirotin/log4ts";
import { KeeperMasterDataBrowserLocalStoreHtppForComponentWithVersion } from "./keeper-master-data-browser-local-store-htpp";

describe ('KeeperMasterDataBrowserLocalStoreHtppForComponentWithVersion...', () => {
    let keeper: KeeperMasterDataBrowserLocalStoreHtppForComponentWithVersion<string>;
    let componentCoordinate: string = "componentCoordinate";
    let componentVersion: number = 123;
    let key: string = "keyForKeeperTest";
    let expectedLocalStorageKey: string = componentCoordinate + "-v-" + componentVersion + "-" + key;
    let value: string|undefined = undefined;

    beforeEach(() => {
        keeper = new KeeperMasterDataBrowserLocalStoreHtppForComponentWithVersion(componentCoordinate, componentVersion);
    });

    afterEach(() => {
        value = undefined;
        localStorage.removeItem(expectedLocalStorageKey);
    });

    xit('should be created ', () => {
        expect(keeper).toBeTruthy();
    });

    xit('should not findvalue by default', async () => {
        let result = await keeper.findAsync(key);
        expect(result).toEqual(undefined);
    });

    xit('should read previously saved value', async () => {
        value = "ValueForTest";
        localStorage.setItem(expectedLocalStorageKey, value);
        let result = await keeper.findAsync(key);
        expect(result).toEqual(value);
    });

    xit('should call http-reader by default', async () => {

    });

    it('should call logger with warn  by default', async () => {
        const consoleSpyWarn = spyOn(console, 'warn');
        LoggerFactory.setLogLevelsByAllLoggers(0);
        let result = await keeper.findAsync(key);
        expect(consoleSpyWarn).toHaveBeenCalled();
        consoleSpyWarn.calls.reset();
        expect(result).toEqual(undefined);

    });

    xit('should not call http-reader when a vallue already set', async () => {

    });

    xit('should not call http-reader by second call', async () => {

    });


});