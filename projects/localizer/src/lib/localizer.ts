import { Observable, Subject, Subscription } from "rxjs";
import { ILanguageDescription, DEFAULT_LANG_TAG } from './language-description';
import { ILogger, LoggerFactory } from "@vsirotin/log4ts";
import { ILanguageChangeNotificator } from "./language-change-notificator";

import { KeeperMasterDataBrowserLocalStoreHtppForComponentWithVersion } from "@vsirotin/keeper-master-data";
import { CurrentLanguageKeeper } from "./current-language-keeper";

export class LanguageData {
  constructor(public ietfTag: string) {}
}

/*
  Localizer -Interface. Enables simple way to make your component multi-language-aware.
  @param T - type of the language relevant items
*/
export interface ILocalizer<T> {

  /*
    Informs a calle about switching of the language relevant items because of the language change
    @param T - type of the language relevant items or string with the default language tag
  */
  languageSwitched$: Observable<T>;

  /*
    Should be called by callee to avoid memory leaks because running subscription of this class to the languageChangeNotificator
  */
  destructor(): void;
}
const KEY_SAVING_LANGUAGE = "currentLanguage";
export class Localizer<T> implements ILocalizer<T> {

  private readonly subjectLanguageSwitcher = new Subject<T>();

  languageSwitched$ = this.subjectLanguageSwitcher.asObservable();

  keeperMasterData : KeeperMasterDataBrowserLocalStoreHtppForComponentWithVersion<T>;

  currentLanguage: LanguageData = new LanguageData(DEFAULT_LANG_TAG);

  private subject = new Subject<LanguageData>();
  languageChanged$ = this.subject.asObservable();

  private subscription: Subscription;

  logger: ILogger; 

  /*
    Constructor. Creates an instance of the Localizer
    @param componentCooordinate - a coordinate of the component. It is used to find corresponded ressources and to identify the component in the log messages
    @param componentVersion - a version of the component. It is used to find corresponded ressources and to identify the component in the log messages
    @param languageChangeNotificator - an instance of the languageChangeNotificator. It is used to subscribe to the language change events
    @param currentLanguageData - a current language data in application
    @param startLanguageRelevantItems - a start object with language relevant items.
  */
  constructor(private componentCooordinate: string, 
    private componentVersion : number, 
    private languageChangeNotificator: ILanguageChangeNotificator,
    private currentLanguageTag: string,
    private startLanguageRelevantItems: T) {

    this.keeperMasterData = new KeeperMasterDataBrowserLocalStoreHtppForComponentWithVersion(componentCooordinate, componentVersion);

    this.logger = LoggerFactory.getLogger("Localizer for " + componentCooordinate);
    this.logger.log("Localizer created for ", componentCooordinate);


    this.switchLanguage(currentLanguageTag);

    this.subscription = languageChangeNotificator.selectionChanged$
      .subscribe((selectedLanguage: ILanguageDescription) => {
        this.logger.log("In subscription ", this.currentLanguage.ietfTag, " selectedLanguage=", JSON.stringify(selectedLanguage));

        this.switchLanguage(selectedLanguage.ietfTag);
      });
  }

  destructor() {
    this.logger.debug("Start of Localizer.destructor");
    this.subscription.unsubscribe();
  }

  private async switchLanguage(ietfTag: string) {
    this.logger.debug("In switchLanguage ietfTag=" + ietfTag);

    this.currentLanguage = new LanguageData(ietfTag);

    if(this.currentLanguage.ietfTag == DEFAULT_LANG_TAG) {
      this.subjectLanguageSwitcher.next(this.startLanguageRelevantItems);
      return;
    }
    const data = await this.keeperMasterData.findAsync(this.currentLanguage.ietfTag);
    this.logger.debug("In switchLanguage data=" + JSON.stringify(data));
    if(data){
      this.subjectLanguageSwitcher.next(data);
    }   
    this.logger.debug("End of switchLanguage");
  }
}