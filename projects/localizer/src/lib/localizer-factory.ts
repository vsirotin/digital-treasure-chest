import { ILanguageChangeNotificator, LanguageChangeNotificator } from "./language-change-notificator";
import {ILocalizer, Localizer } from "./localizer";

export class LocalizerFactory {

    static languageChangeNotificator: ILanguageChangeNotificator = new LanguageChangeNotificator();
  
    static createLocalizer<T>(coordinate: string, version: number): ILocalizer<T> {
      return new Localizer(coordinate, version, LocalizerFactory.languageChangeNotificator) as ILocalizer<T>;
    }
  }