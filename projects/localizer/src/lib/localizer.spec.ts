import { ILocalizationClient, ILocalizer, Localizer } from './localizer';
import { Observable, Subject, Subscription } from 'rxjs';
import { LocalizerFactory } from './localizer-factory';
import { LoggerFactory } from '@vsirotin/log4ts';

const loggerForTest = LoggerFactory.getLogger("Test for Localizer");
LoggerFactory.setLogLevelsByAllLoggers(0);
class TestItems1 {
  constructor(public settings: string = "Settings", public language: string= "Language"){};
}

class TestItems2 {
  constructor(public logging: string = "Logging", public loggingExplanation: string = "Only for support purposes"){};
}

let subject1 = new Subject<void>();
let subject2 = new Subject<void>();

class LocalizationClient1 implements ILocalizationClient<TestItems1> {

  private logger = LoggerFactory.getLogger("LocalizationClient1");
  private localizer: ILocalizer;
  localizationData: TestItems1 | undefined = undefined;
  constructor() {
    this.logger.debug("creation started");
    this.localizer = LocalizerFactory.createLocalizer<TestItems1>("test1", 1, new TestItems1(), this);
    this.logger.debug("created");
  }
  updateLocalization(data: TestItems1): void  {
    this.logger.debug("updateLocalization data=", data, " type=", typeof(data));
    this.localizationData = data;
    subject1.next();
  }

  destuctor() {
    this.localizer.dispose();
  }
}

class LocalizationClient2 implements ILocalizationClient<TestItems2> {

  private localizer: ILocalizer;
  localizationData: TestItems2 | undefined = undefined;
  constructor() {
    this.localizer = LocalizerFactory.createLocalizer<TestItems2>("test2", 1, new TestItems2(), this);
  }
  updateLocalization(data: TestItems2): void  {
    this.localizationData = data;
  }

  destructor() {
    this.localizer.dispose();
  }
}

describe('Localizer...', () => {

  let localizationClient1: LocalizationClient1 | undefined = undefined;
  let localizationClient2: LocalizationClient2 | undefined = undefined;

  let localizationDataForClient1 = undefined;
  let localizationDataForClient2 = undefined;



  let subsciption1: Subscription;



  beforeEach(() => {
    
    localizationClient1 = new LocalizationClient1();
   // localizationClient2 = new LocalizationClient2();
    
  });

  afterEach(() => {
    // localStorage.clear();
    // localizationClient1?.destuctor();
    // localizationClient1 = undefined;

    // localizationClient2?.destructor();
    // localizationClient2 = undefined;

  });

it('both localization clients should be created', () => {
    expect(localizationClient1).toBeTruthy();
 //   expect(localizationClient2).toBeTruthy();
  });

  describe('by default...', () => {
    it('both localization clients should be initialized with default language ', () => {
      subsciption1 = subject1.subscribe(() => {
        const expectedData = new TestItems1();
        const actualData = localizationClient1?.localizationData;

        // Ensure actualData is an instance of TestItems1
        const actualDataInstance = Object.assign(new TestItems1(), actualData);

        expect(actualDataInstance).toEqual(expectedData);
      });
      //expect(localizationClient2?.localizationData).toEqual(new TestItems2());
    });

    xit('after disposing both localization clients will be no more updated ', () => {
      //expect(localizer.currentLanguage?.ietfTag).toEqual(DEFAULT_LANG_TAG);
    });
  });

  xdescribe('after change the language on de-DE...', () => {

    xit('in already existed clients localization data for de-DE language will be updated', () => {
      //expect(localizer.currentLanguage?.ietfTag).toEqual(DEFAULT_LANG_TAG);
    });

    xit('new created clients should be initialized with de-DE language ', () => {
      //expect(localizer.currentLanguage?.ietfTag).toEqual(DEFAULT_LANG_TAG);
    });

    xit('for already existed clients after its re-creation localization data for de-DE language will be updated', () => {
      //expect(localizer.currentLanguage?.ietfTag).toEqual(DEFAULT_LANG_TAG);
    });

  });

  xit('by start both localizers ', () => {
    //expect(localizer.currentLanguage?.ietfTag).toEqual(DEFAULT_LANG_TAG);
  });


  // describe('after change the language on de-DE', () => {
  //   let languageChanged$: Observable<LanguageData>;

  //   let subscription: Subscription;
  //   let spy: jasmine.Spy;
    
  //   beforeEach(() => {  
  //     languageChanged$ = localizer.languageChanged$;
  //     langDescr = {"enName": "German", "originalName": "Deutsch", "ietfTag": "de-DE"};

      
  //   });

  //   afterEach(() => {
  //     subscription.unsubscribe();
  //   });

    // xit('the selected language should be de-DE, current language in localizer should be de-DE, the localizer should have languageMap for de-DE', (done) => { 
    //   const mockResponseData = { "settings": "Einstellungen" }; 
    //   //Not clear, how  to call this spy many times. Second call make timeout error.
    //   spyOn(window, 'fetch').and.returnValue(Promise.resolve(new Response(JSON.stringify(mockResponseData))));
      
    //   subscription = languageChanged$
    //   .subscribe((languageTag: LanguageData) => {
    //     expect(languageTag.ietfTag).toEqual("de-DE");
    //     expect(localizer.currentLanguage?.ietfTag).toEqual("de-DE");
    //     //expect(localizer.getTranslation('settings', 'not-exist')).toEqual("Einstellungen");
    //     done();
    //   });
    //   langSelectNotificationService.selectionChanged(langDescr);
    // });        
  //});
});



