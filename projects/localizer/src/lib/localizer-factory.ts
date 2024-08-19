import { IKeeperMasterDataKeyValue } from "@vsirotin/keeper-master-data";
import { ILanguageChangeNotificator, LanguageChangeNotificator } from "./language-change-notificator";
import {ILocalizer, LanguageData, Localizer } from "./localizer";
import { DEFAULT_LANG_TAG } from "./language-description";
import { CurrentLanguageKeeper } from "./current-language-keeper";

export class LocalizerFactory {

    static languageChangeNotificator: ILanguageChangeNotificator = new LanguageChangeNotificator();

    private static currentLanguageKeeper = new CurrentLanguageKeeper(DEFAULT_LANG_TAG);

    private static async  getCurrentLanguage(): Promise<string> {
      const res = await LocalizerFactory.currentLanguageKeeper.getCurrentLanguageTag();
      return res as string;
    }
  
    static async createLocalizer<T>(coordinate: string, version: number, intialItems: T): Promise<ILocalizer<T>> {
      return new Localizer(coordinate, version, LocalizerFactory.languageChangeNotificator, await LocalizerFactory.getCurrentLanguage(), intialItems) as ILocalizer<T>;
    }
  }

