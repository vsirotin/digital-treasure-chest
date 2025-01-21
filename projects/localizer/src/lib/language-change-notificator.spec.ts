import { LanguageChangeNotificator } from './language-change-notificator';

describe('LanguageChangeNotificator', () => {
  let service: LanguageChangeNotificator;

  beforeEach(() => {
    service = new LanguageChangeNotificator();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
