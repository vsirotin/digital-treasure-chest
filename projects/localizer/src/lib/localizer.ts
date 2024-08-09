import { Observable, Subject, Subscription } from "rxjs";
import { ILanguageDescription, inSupportedLanguages, DEFAULT_LANG_TAG } from './language-description';
import { ILogger, LoggerFactory } from "@vsirotin/log4ts";
import { DbAgent, IKeyValueDB } from "@vsirotin/browser-local-storage";
import { ILanguageChangeNotificator, LanguageChangeNotificator } from "./language-change-notificator";




export class LanguageData {
  constructor(public ietfTag: string) {}
}


export interface ILocalizer<T> {
  languageSwitched$: Observable<T>;
  destructor(): void;
}
const KEY_SAVING_LANGUAGE = "currentLanguage";
export class Localizer<T> implements ILocalizer<T> {

  private readonly subjectLanguageSwitcher = new Subject<T>();

  languageSwitched$ = this.subjectLanguageSwitcher.asObservable();

   // static languageChangeNotificator: ILanguageChangeNotificator = new LanguageChangeNotificator(); 

   dbAgent: IKeyValueDB = new DbAgent();
   currentLanguage: LanguageData = new LanguageData(DEFAULT_LANG_TAG);
   //currentLanguageRelevantItems: T = {} as T;
 
    private subject = new Subject<LanguageData>();
    languageChanged$ = this.subject.asObservable();
 
   private subscription: Subscription;
   //private languageChange$: Observable<ILanguageDescription> = Localizer.languageChangeNotificator.selectionChanged$;

  logger: ILogger; 
  constructor(private componentCooordinate: string, private componentVersion : number, languageChangeNotificator: ILanguageChangeNotificator) {

    this.logger = LoggerFactory.getLogger("Localizer for " + componentCooordinate);
    this.logger.log("Localizer created for ", componentCooordinate);
        this.subscription = languageChangeNotificator.selectionChanged$
      .subscribe((selectedLanguage: ILanguageDescription) => {
        this.logger.log("In subscription ", this.currentLanguage.ietfTag, " selectedLanguage=", JSON.stringify(selectedLanguage));

        this.switchLanguage(selectedLanguage.ietfTag);
      });
  }


 

  // constructor(private componentCooordinate: string,
  //   private componentVersion : number,
  //   private logger : ILogger = LoggerFactory.getLogger("@vsirtin/localizer")) { 
  //   this.logger.debug("Start of Localizer.constructor"); 

  //   this.subscription = this
  //     .languageChange$
  //     .subscribe((selectedLanguage: ILanguageDescription) => {
  //       this.logger.debug("Start of subscription in Localizer.constructor this.currentLanguage=" 
  //       + this.currentLanguage.ietfTag 
  //       + " selectedLanguage=" + JSON.stringify(selectedLanguage)); 

  //       this.setLanguage(selectedLanguage.ietfTag);
  //     });
  // }

  private notifySwitchingOfCurrentLanguageRelevantItems(items: any) {
    this.logger.debug("In notifySwitchingOfCurrentLanguageRelevantItems items=" + JSON.stringify(items));
    this.subjectLanguageSwitcher.next(items);
  }

  async initializeLanguage() {
    let savedLangEtfTag = this.dbAgent.get(KEY_SAVING_LANGUAGE);
    this.logger.debug("In initializeLanguage  savedLangEtfTag=" + savedLangEtfTag);
    if (savedLangEtfTag == null) {
      savedLangEtfTag = navigator.language;
    }

    if (!inSupportedLanguages(savedLangEtfTag)) {
      savedLangEtfTag = DEFAULT_LANG_TAG;
    }

    await this.switchLanguage(savedLangEtfTag);
    this.currentLanguage = new LanguageData(savedLangEtfTag);
  }

  private async switchLanguage(ietfTag: string) {
    this.logger.debug("In switchLanguage ietfTag=" + ietfTag);

    this.currentLanguage = new LanguageData(ietfTag);
    this.dbAgent.set(KEY_SAVING_LANGUAGE, this.currentLanguage.ietfTag);

    if(this.currentLanguage.ietfTag == DEFAULT_LANG_TAG) {
      this.setDefaultLanguage();
      return;
    }
    await this.loadLanguageRelevantItems();
    this.logger.debug("End of switchLanguage");
  }

  private setDefaultLanguage() {
    this.logger.debug("Start of Localizer.setDefaultLanguage");
    this.currentLanguage = new LanguageData(DEFAULT_LANG_TAG);
    // this.logger.debug("In setDefaultLanguage Language is DEFAULT_LANG_TAG, no need to fetch the language file");
    // this.currentLanguageRelevantItems = new Map<string, string>();

  }

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

 //         const map = new Map<string, string>(Object.entries(jsonObject));
 //         this.logger.debug("In Localizer.loadLanguageRelevantItemsFromDb (2) map=" + JSON.stringify(Object.fromEntries(map))); 

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

  destructor() {
    this.logger.debug("Start of Localizer.destructor");
    this.subscription.unsubscribe();
  }
}










