import { LanguageData, Localizer } from './localizer';
import { Observable, Subscription } from 'rxjs';
import { ILanguageChangeNotificator } from './language-change-notificator';
import { DEFAULT_LANG_TAG, ILanguageDescription } from './language-description';
import { LoggerFactory } from '@vsirotin/log4ts';

const TEST_SOURCE_DIR = "assets/languages/features/components/settings/lang/";

describe('Localizer', () => {
  let localizer: Localizer;
  let langDescr: ILanguageDescription;

  let langSelectNotificationService: ILanguageChangeNotificator = Localizer.languageChangeNotificator; 

  beforeEach(() => {
   
   
    localizer = new Localizer(TEST_SOURCE_DIR, 1);
    localStorage.clear();

    
  });

  afterEach(() => {
    localStorage.clear();
  });

  xit('should be created', () => {
    expect(localizer).toBeTruthy();
  });

  xit('by start has DEFAULT_LANG_TAG default language', () => {
    expect(localizer.currentLanguage?.ietfTag).toEqual(DEFAULT_LANG_TAG);
  });


  describe('after change the language on de-DE', () => {
    let languageChanged$: Observable<LanguageData>;

    let subscription: Subscription;
    let spy: jasmine.Spy;
    
    beforeEach(() => {  
      languageChanged$ = localizer.languageChanged$;
      langDescr = {"enName": "German", "originalName": "Deutsch", "ietfTag": "de-DE"};

      
    });

    afterEach(() => {
      subscription.unsubscribe();
    });

    it('the selected language should be de-DE, current language in localizer should be de-DE, the localizer should have languageMap for de-DE', (done) => { 
      const mockResponseData = { "settings": "Einstellungen" }; 
      //Not clear, how  to call this spy many times. Second call make timeout error.
      spyOn(window, 'fetch').and.returnValue(Promise.resolve(new Response(JSON.stringify(mockResponseData))));
      
      subscription = languageChanged$
      .subscribe((languageTag: LanguageData) => {
        expect(languageTag.ietfTag).toEqual("de-DE");
        expect(localizer.currentLanguage?.ietfTag).toEqual("de-DE");
        expect(localizer.getTranslation('settings', 'not-exist')).toEqual("Einstellungen");
        done();
      });
      langSelectNotificationService.selectionChanged(langDescr);
    });        
  });
});



