import { Subscription } from "rxjs";
import { ILanguageDescription } from './language-change-notificator';
import { ILogger, LoggerFactory } from "@vsirotin/log4ts";
import { ILanguageChangeNotificator } from "./language-change-notificator";

import { KeeperMasterDataBrowserLocalStoreHtppDefaultForComponentWithVersion, KeeperMasterDataBrowserLocalStoreHtppForComponentWithVersion } from "@vsirotin/keeper-master-data";

/* 
  ILocalizationClient - Interface. Enables simple way to make your component multi-language-aware.
  @param T - type of the language relevant items
*/
export interface ILocalizationClient<T>{
  /*
    Updates the language relevant items by client
    @param data - an object with language relevant items
  */
  updateLocalization(data: T): void;
}


/*
  Localizer -Interface. Enables simple way to make your component multi-language-aware.
  @param T - type of the language relevant items
*/
export interface ILocalizer {
  /*
    Disposes the Localizer (its subscription to the language change events)
  */
  dispose(): void;
}

/*
  Localizer - Class. Enables simple way to make your component multi-language-aware.
  @param T - type of the language relevant items
*/
export class Localizer<T> implements ILocalizer {

  private keeperMasterData : KeeperMasterDataBrowserLocalStoreHtppForComponentWithVersion<T>;

  private subscription: Subscription;

  private logger: ILogger; 

  /*
    Constructor. Creates an instance of the Localizer
    @param componentCooordinate - a coordinate of the component. It is used to find corresponded ressources and to identify the component in the log messages
    @param componentVersion - a version of the component. It is used to find corresponded ressources and to identify the component in the log messages
    @param languageChangeNotificator - an instance of the languageChangeNotificator. It is used to subscribe to the language change events
    @param startLanguageRelevantItems - a start object with language relevant items.
    @param client - a client, that need to update the language relevant items.
  */
  constructor(private componentCooordinate: string, 
    private componentVersion : number, 
    private languageChangeNotificator: ILanguageChangeNotificator,
    private startLanguageRelevantItems: T,
    private client: ILocalizationClient<T>) {

    this.keeperMasterData = new KeeperMasterDataBrowserLocalStoreHtppDefaultForComponentWithVersion<T>(
      componentCooordinate, componentVersion, startLanguageRelevantItems)
    this.logger = LoggerFactory.getLogger("Localizer for " + componentCooordinate + " v." + componentVersion);

    this.logger.debug("before subscription");
    this.subscription = languageChangeNotificator.selectionChanged$
      .subscribe((selectedLanguage: ILanguageDescription) => {
        this.switchLanguage(selectedLanguage.ietfTag);
      });

      this.logger.log("created for startLanguageRelevantItems=", JSON.stringify(startLanguageRelevantItems));
  }

  /*
    Disposes the Localizer (its subscription to the language change events)
  */
  dispose() {
    this.logger.debug("Start of Localizer.destructor");
    this.subscription.unsubscribe();
  }

  private async switchLanguage(ietfTag: string) {
    this.logger.debug("In switchLanguage ietfTag=" + ietfTag);

    const data = await this.keeperMasterData.findAsync(ietfTag);
    this.logger.debug("In switchLanguage data=", data);
    if(data){
      this.client.updateLocalization(data);
      return;
    }   
    this.logger.error("In switchLanguage for key=", ietfTag, " data not found");
  }
}