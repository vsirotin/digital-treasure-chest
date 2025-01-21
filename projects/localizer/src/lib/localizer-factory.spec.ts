import { LocalizerFactory } from './localizer-factory';
import { LanguageChangeNotificator } from './language-change-notificator';
import { ILocalizationClient, Localizer } from './localizer';

class TestLocalizationClient implements ILocalizationClient<any> {
  updateLocalization(data: any): void {
    // Implementation for test purposes
  }
}

describe('LocalizerFactory', () => {
  let client: TestLocalizationClient;
  let defaultNavigationLanguage: string;

  beforeAll(() => { 
    defaultNavigationLanguage = navigator.language;
  });

  beforeEach(() => {
    client = new TestLocalizationClient();
  });

  afterEach(() => {
    LocalizerFactory.languageChangeNotificator.selectionChanged(defaultNavigationLanguage);
  });

  it('should create an instance of LocalizerFactory', () => {
    expect(LocalizerFactory).toBeTruthy();
  });

  it('should have a languageChangeNotificator instance', () => {
    expect(LocalizerFactory.languageChangeNotificator).toBeInstanceOf(LanguageChangeNotificator);
  });

  it('should create a Localizer instance', () => {
    const localizer = LocalizerFactory.createLocalizer('test-coordinate', 1, {}, client);
    expect(localizer).toBeInstanceOf(Localizer);
  });

  it('should make easy using a language specif formating', () => {

    LocalizerFactory.languageChangeNotificator.selectionChanged('de-DE');
    let currenrLang = LocalizerFactory.getCurrentLanguageCode();
    const deDEFormatter = new Intl.DateTimeFormat(currenrLang);
    const date = new Date(Date.UTC(2025, 1, 20, 3, 0, 0));

    let result = deDEFormatter.format(date);
    expect(result).toEqual('20.2.2025');

    LocalizerFactory.languageChangeNotificator.selectionChanged('en-US');
    currenrLang = LocalizerFactory.getCurrentLanguageCode();

    const enUSFormatter = new Intl.DateTimeFormat(currenrLang);
    result = enUSFormatter.format(date);
    expect(result).toEqual('2/20/2025');
    
  });


});