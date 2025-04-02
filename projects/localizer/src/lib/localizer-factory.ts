import { ILanguageChangeNotificator, LanguageChangeNotificator } from "./language-change-notificator";
import {ILocalizationClient, ILocalizer, Localizer } from "./localizer";

/**
 * `LocalizerFactory` is a factory class responsible for creating and managing `Localizer` instances.
 * It provides a centralized way to access the `LanguageChangeNotificator` and create `Localizer` objects.
 * It also provides static methods to interact with the current language settings.
 */export class LocalizerFactory {

  /**
   * The singleton instance of the `LanguageChangeNotificator`.
   * This instance is used by all `Localizer` instances created by this factory to listen for language change events.
   */
  static languageChangeNotificator: ILanguageChangeNotificator = 
    new LanguageChangeNotificator();

  /**
   * Creates a new `Localizer` instance.
   * @param coordinate The coordinate of the component for which the localizer is created. This is used for data retrieval and logging.
   * @param version The version of the component. This is used for data retrieval and logging.
   * @param initialItems The initial language-specific items for the component. This is used as a fallback if no language-specific data is found.
   * @param client The client that will receive updates about language changes. This client must implement the `ILocalizationClient` interface.
   * @returns A new `Localizer` instance.
   */  
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

/**
   * Retrieves the current language code.
   * The language code is retrieved from persistent storage (e.g., local storage) if it was previously saved.
   * If not saved, it falls back to the browser's language.
   * If the browser's language is not supported, it returns the default language.
   * @returns The current language code in IETF format (e.g., "en-US", "de-DE").
   */
  static getCurrentLanguageCode(): string {
    return LocalizerFactory.languageChangeNotificator.getCurrentLanguageCode();
  }

  /**
   * Checks if the current language is saved in persistent storage (e.g., local storage).
   * @returns `true` if the current language is saved, `false` otherwise.
   */
  static isCurentLanguageSaved(): boolean {
    return LocalizerFactory.languageChangeNotificator.isCurentLanguageSaved();
  }
}

