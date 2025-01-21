import { ILanguageChangeNotificator, LanguageChangeNotificator } from "./language-change-notificator";
import {ILocalizationClient, ILocalizer, Localizer } from "./localizer";

export class LocalizerFactory {

  static languageChangeNotificator: ILanguageChangeNotificator = 
    new LanguageChangeNotificator();

  static createLocalizer<T>(coordinate: string, 
    version: number, 
    intialItems: T, 
    client: ILocalizationClient<T>): ILocalizer {
    return new Localizer(
      coordinate, 
      version, 
      LocalizerFactory.languageChangeNotificator, 
      intialItems, 
      client);
  }

  static getCurrentLanguageCode(): string {
    return LocalizerFactory.languageChangeNotificator.getCurrentLanguageCode();
  }
}

