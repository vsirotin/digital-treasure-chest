import { ILocalizationClient, ILocalizer, Localizer } from './localizer';
import { Subject, Subscription } from 'rxjs';
import { LocalizerFactory } from './localizer-factory';
import { HTTPKeyValueRepositoryReader } from '@vsirotin/keeper-master-data';
class TestItems {
  constructor(public settings: string = "Settings", public language: string= "Language"){};
}
let subject1 = new Subject<void>();
class LocalizationClient implements ILocalizationClient<TestItems> {

  private localizer: ILocalizer;
  localizationData: TestItems | undefined = undefined;
  constructor() {
    this.localizer = LocalizerFactory.createLocalizer<TestItems>("test1", 1, new TestItems(), this);
  }
  updateLocalization(data: TestItems): void  {
    this.localizationData = data;
    subject1.next(); //For test purposes
  }

  destuctor() {
    this.localizer.dispose();
  }
}

describe('Localizer...', () => {

  let localizationClient: LocalizationClient | undefined = undefined;

  let subsciption1: Subscription;

  afterEach(() => {
    localStorage.clear();
    localizationClient?.destuctor();
    localizationClient = undefined;

    if(subsciption1) {
      subsciption1.unsubscribe();
    }
  });

it('client should be created', () => {
  localizationClient = new LocalizationClient();
  expect(localizationClient).toBeTruthy();
  });

  describe('by default...', () => {
    it('localization client should be initialized with default language ', (done) => {
      subsciption1 = subject1.subscribe(() => {
        const expectedData = new TestItems();
        const actualData = localizationClient?.localizationData;
        const actualDataInstance = Object.assign(new TestItems(), actualData);
        expect(actualDataInstance).toEqual(expectedData);
        done();
      });
      localizationClient = new LocalizationClient();
    });

  });

  describe('after change the language on de-DE...', () => {
    let httpReaderSpy: jasmine.Spy<(key: string) => Promise<Object | undefined>>;
    const expectedValue = new TestItems("aa7", "bb7");
    const newLocal = { "enName": "German", "originalName": "Deutsch", "ietfTag": "de-DE" };
    const newIetfTag = newLocal.ietfTag;

    beforeEach(() => {
      httpReaderSpy = spyOn(HTTPKeyValueRepositoryReader.prototype, 'readAsync').and.returnValue(Promise.resolve(expectedValue));
    });

    afterEach(() => {
      httpReaderSpy.calls.reset();
    });

    it('in already existed clients localization data for de-DE language will be updated', (done) => {
      localizationClient = new LocalizationClient();
      subsciption1 = subject1.subscribe(() => {
        const actualData = localizationClient?.localizationData;
        const actualDataInstance = Object.assign(new TestItems(), actualData);

        expect(actualDataInstance).toEqual(expectedValue);
        done();
      });

      LocalizerFactory.languageChangeNotificator.selectionChanged(newIetfTag);
    });

    it('new created clients should be initialized with de-DE language ', (done) => {
      LocalizerFactory.languageChangeNotificator.selectionChanged(newIetfTag);
      
      subsciption1 = subject1.subscribe(() => {
        const actualData = localizationClient?.localizationData;
        const actualDataInstance = Object.assign(new TestItems(), actualData);

        expect(actualDataInstance).toEqual(expectedValue);
        done();
      });
      localizationClient = new LocalizationClient();
      
    });
  });
});



