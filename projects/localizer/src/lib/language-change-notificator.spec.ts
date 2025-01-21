import { ILanguageDescription, LanguageChangeNotificator } from './language-change-notificator';

describe('LanguageChangeNotificator', () => {
  let languageChangeNotificator: LanguageChangeNotificator;

  const expectedDefaultLanguageDescription: ILanguageDescription = 
    { "enName": "English", "originalName": "English", "ietfTag": "en-US" };

  let defaultLanguageDescription: ILanguageDescription = expectedDefaultLanguageDescription;  

  beforeAll(() => {
    languageChangeNotificator = new LanguageChangeNotificator();

    defaultLanguageDescription = languageChangeNotificator.getDefaultLanguageDescription();
  });
  beforeEach(() => {
    languageChangeNotificator = new LanguageChangeNotificator();
    languageChangeNotificator.setDefaultLanguageDescription(defaultLanguageDescription);
    
  });

  afterEach(() => {
    languageChangeNotificator.selectionChanged(languageChangeNotificator.getDefaultLanguageTag());
  });


  it('should be created', () => {
    expect(languageChangeNotificator).toBeTruthy();
  });

  it('should return current language code', () => {
    expect(languageChangeNotificator.getCurrentLanguageCode()).toBe(languageChangeNotificator.getDefaultLanguageTag());
  });

  it('should change returned language after new language set', () => {
    const language = 'de-DE';
    languageChangeNotificator.selectionChanged(language);
    expect(languageChangeNotificator.getCurrentLanguageCode()).toBe(language);
  });

  it('should return true for supported language', () => {
    const supportedLanguage = 'en-US';
    expect(languageChangeNotificator.isLanguageSupported(supportedLanguage)).toBe(true);
  });

  it('should return false for unsupported language', () => {
    const unsupportedLanguage = 'xx-XX';
    expect(languageChangeNotificator.isLanguageSupported(unsupportedLanguage)).toBe(false);
  });

  it('should return the default language description', () => {
    expect(languageChangeNotificator.getDefaultLanguageDescription()).toEqual(defaultLanguageDescription);
  });

  it('should return the default language tag', () => {
    expect(languageChangeNotificator.getDefaultLanguageTag()).toBe(defaultLanguageDescription.ietfTag);
  });

  it('should set a new default language description', () => {
    const newDefaultLanguageDescription: ILanguageDescription =  { "enName": "BlaBla", "originalName": "BlaBlaBla", "ietfTag": "bl-BA" };
    languageChangeNotificator.setDefaultLanguageDescription(newDefaultLanguageDescription);
    expect(languageChangeNotificator.getDefaultLanguageDescription()).toEqual(newDefaultLanguageDescription);
    expect(languageChangeNotificator.getDefaultLanguageTag()).toBe(newDefaultLanguageDescription.ietfTag);
  });
});
