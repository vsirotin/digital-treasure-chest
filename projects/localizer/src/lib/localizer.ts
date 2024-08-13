import { Observable, Subject, Subscription } from "rxjs";
import { ILanguageDescription, inSupportedLanguages, DEFAULT_LANG_TAG } from './language-description';
import { ILogger, LoggerFactory } from "@vsirotin/log4ts";
import { DbAgent, IKeyValueDB } from "@vsirotin/browser-local-storage";
import { ILanguageChangeNotificator, LanguageChangeNotificator } from "./language-change-notificator";
import { IKeeperMasterDataKeyValue, KeeperMasterDataFactoryForLocalization } from "./keeper-master-data/i-keyed-keeper-master-data";

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
    @param T - type of the language relevant items
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

  keeperMasterData : IKeeperMasterDataKeyValue<T>;
 
   dbAgent: IKeyValueDB = new DbAgent();
   currentLanguage: LanguageData = new LanguageData(DEFAULT_LANG_TAG);
 
    private subject = new Subject<LanguageData>();
    languageChanged$ = this.subject.asObservable();
 
   private subscription: Subscription;

  logger: ILogger; 
  constructor(private componentCooordinate: string, private componentVersion : number, languageChangeNotificator: ILanguageChangeNotificator) {

    this.keeperMasterData = KeeperMasterDataFactoryForLocalization.instance.createKeeperMasterDataKeyValue<T>(componentCooordinate, componentVersion);

    this.logger = LoggerFactory.getLogger("Localizer for " + componentCooordinate);
    this.logger.log("Localizer created for ", componentCooordinate);
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
    //this.dbAgent.set(KEY_SAVING_LANGUAGE, this.currentLanguage.ietfTag);

    if(this.currentLanguage.ietfTag == DEFAULT_LANG_TAG) {
      this.setDefaultLanguage();
      return;
    }
    //await this.loadLanguageRelevantItems();
    const data = await this.keeperMasterData.find(this.currentLanguage.ietfTag);
    this.logger.debug("In switchLanguage data=" + JSON.stringify(data));
    if(data){
      this.notifySwitchingOfCurrentLanguageRelevantItems(data);
    }   
    this.logger.debug("End of switchLanguage");
  }

  private setDefaultLanguage() {
    this.logger.debug("Start of Localizer.setDefaultLanguage");
    this.currentLanguage = new LanguageData(DEFAULT_LANG_TAG);
  }
/*
  private async loadLanguageRelevantItems() {
    this.logger.debug("Start of Localizer.loadLanguageRelevantItems componentCooordinate=" + this.componentCooordinate);
    this.loadLanguageRelevantItemsFromDb()
    .then(
      (dbLoadingResult)=>{ 
        this.logger.debug("In Localizer.loadLanguageRelevantItems dbLoadingResult=" + dbLoadingResult);
        if(!dbLoadingResult){
          this.loadLanguageRelevantItemsFromServer()
        }
      }).catch((error) => {
        this.logger.error("In Localizer.loadLanguageRelevantItems catch error=" + error);
      });
    };


  private async loadLanguageRelevantItemsFromDb(): Promise<boolean> {
      return new Promise((resolve) =>{
        this.logger.debug("Start of Localizer.loadLanguageRelevantItemsFromDb componentCooordinate=" + this.componentCooordinate 
          + " componentVersion=" + this.componentVersion);
        
        let key = this.generateKeyForLoadingLanguageRelevantItems();
    
        let res = this.dbAgent.get(key);
        this.logger.debug("In Localizer.loadLanguageRelevantItemsFromDb (1) key=" + key + " res=" + res); 
        if(res == null){
          resolve(false);
          return;
        }  
        
        const jsonObject = JSON.parse(res as string);
        if(jsonObject == null){
          resolve(false);
          return; 
        }

        this.notifySwitchingOfCurrentLanguageRelevantItems(jsonObject as T);
        resolve(true);
    
      }
    )
  };
    
  private async loadLanguageRelevantItemsFromServer() {
    let path = this.componentCooordinate + this.currentLanguage.ietfTag + ".json";
    this.logger.debug("Localizer.loadLanguageRelevantItemsFromServer: Fetching from " + path);
   await fetch(path)
    .then(response => {
      if (!response.ok) {
        this.logger.warn("In Localizer.loadLanguageRelevantItemsFromServer HTTP error. Status=", 
          response.status, "by fetching from ", path); 
        this.setDefaultLanguage();
      }
      return response.json(); 
    })
    .then(data => {
      this.logger.debug("Localizer.loadLanguageRelevantItemsFromServer: Data loaded from server=" + JSON.stringify(data));
      this.notifySwitchingOfCurrentLanguageRelevantItems(data as T);
      
      let key = this.generateKeyForLoadingLanguageRelevantItems();

      this.dbAgent.set(key, JSON.stringify(data));
      this.subject.next(this.currentLanguage as LanguageData);
      this.logger.debug("In Localizer.loadLanguageRelevantItemsFromServer after call next")
    })
    .catch(error => {
      this.logger.error(" In Localizer.loadLanguageRelevantItemsFromServer: a problem with the fetch operation: error=" + error);  
      this.setDefaultLanguage(); 
    });
  }
  
  private generateKeyForLoadingLanguageRelevantItems(): string {
    return  this.componentCooordinate.replace("assets/languages/features/", "") 
              + "-v" + this.componentVersion + "-" 
              + this.currentLanguage.ietfTag;
  }

*/
  private notifySwitchingOfCurrentLanguageRelevantItems(items: any) {
    this.logger.debug("In notifySwitchingOfCurrentLanguageRelevantItems items=" + JSON.stringify(items));
    this.subjectLanguageSwitcher.next(items);
  }

}










