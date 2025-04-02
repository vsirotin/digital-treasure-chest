import { KeeperCurrentUserLanguage } from "./keeper-current-user-language";

describe ("KeeperCurrentUserLanguage..."    , () => {
    let keeper: KeeperCurrentUserLanguage;
    let key: string = "KeyForKeeperTest";
    let defaultValue: string = "DefaultValueForTest";
    
    beforeEach(() => {
        keeper = new KeeperCurrentUserLanguage(key, defaultValue);
    });

    afterEach(() => {
        localStorage.removeItem(key);
    });

    it('should be created ', () => {
        expect(keeper).toBeTruthy();
    });

    it('should find value by default', () => {
        const result = keeper.readCurrentLang();
        expect(result.length).toEqual(5); // eg.g. en-US
        expect(result).toContain('-');
    });

    it('should write value in local storage by reading', () => {
        keeper.readCurrentLang();
        const result = localStorage.getItem(key) as string;
        expect(result.length).toEqual(5); // eg.g. en-US
        expect(result).toContain('-');
    });

    it('should write value in local storage by writing', () => {
        const value = "ValueForTest2";
        keeper.writeCurrentLang(value);
        const result = localStorage.getItem(key) as string;
        expect(result).toEqual(value);
    });

    it('should read previously saved value', () => {
        const value = "ValueForTest2";
        keeper.writeCurrentLang(value);
        const result = keeper.readCurrentLang();
        expect(result).toEqual(value);
    });

    it('should return false by isCurrentLangSaved by default', () => {
        const result = keeper.isCurrentLangSaved();
        expect(result).toEqual(false);
    });

    it('should return true by isCurrentLangSaved after first reqest', () => {
        const value = keeper.readCurrentLang();
        const result = keeper.isCurrentLangSaved();
        expect(result).toEqual(true);
    });

    
});
