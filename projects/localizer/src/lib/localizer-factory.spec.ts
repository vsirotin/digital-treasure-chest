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

  beforeEach(() => {
    client = new TestLocalizationClient();
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

});