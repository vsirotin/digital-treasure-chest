import { KeeperCurrentUserLanguage } from "@vsirotin/keeper-master-data";
import { ILanguageChangeNotificator, LanguageChangeNotificator } from "./language-change-notificator";
import {ILocalizer, Localizer } from "./localizer";
import { DEFAULT_LANG_TAG } from "./language-description";

export class LocalizerFactory {

  private static keeperCurrentLanguage = new KeeperCurrentUserLanguage("CurrentLanguage", DEFAULT_LANG_TAG);
  static languageChangeNotificator: ILanguageChangeNotificator = 
    new LanguageChangeNotificator(LocalizerFactory.keeperCurrentLanguage);

  static createLocalizer<T>(coordinate: string, version: number, intialItems: T): ILocalizer<T> {
    return new Localizer(
      coordinate, 
      version, 
      LocalizerFactory.languageChangeNotificator, 
      LocalizerFactory.keeperCurrentLanguage.readCurrentLang(), intialItems);
  }
}

