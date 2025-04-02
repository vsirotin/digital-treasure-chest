import { BehaviorSubject, Observable } from 'rxjs';
import { KeeperCurrentUserLanguage } from '@vsirotin/keeper-master-data';
import { ILogger, LoggerFactory } from '@vsirotin/log4ts';

/**
 * Interface for a language change notification service.
 * This interface defines the methods for managing and observing changes in the selected language.
 */
export interface ILanguageChangeNotificator {  
  /**
   * Checks if the current language is saved in persistent storage.
   * @returns `true` if the current language is saved, `false` otherwise.
   */
  isCurentLanguageSaved(): boolean;
  /**
   * An observable that emits the language description whenever the selected language changes.
   */
  selectionChanged$: Observable<ILanguageDescription>;

  /**
   * Sets the new language code and notifies subscribers about the change.
   * @param ietfTag The new language code (IETF language tag), e.g., "en-US", "de-DE".
   *                Can be null or undefined, in which case the default language will be used.
   */
  selectionChanged(ietfTag: string|null|undefined): void;

  /**
   * Gets the current language code (IETF language tag).
   * @returns The current language code, e.g., "en-US", "de-DE".
   */
  getCurrentLanguageCode(): string;
}

/**
 * Interface for describing a language.
 */
export interface ILanguageDescription {
  /**
   * The English name of the language.
   */
  enName: string;
  /**
   * The original name of the language (in the language itself).
   */
  originalName: string;
  /**
   * The IETF language tag for the language, e.g., "en-US", "de-DE".
   */
  ietfTag: string;
}

const DEFAULT_LANG_TAG = "en-US";
const DEFAULT_LANG_DESCRIPTION: ILanguageDescription = { "enName": "English", "originalName": "English", "ietfTag": DEFAULT_LANG_TAG };

/**
 * An array of supported languages with their descriptions.
 */
export const SupportedLanguages: Array<ILanguageDescription> = [
  { "enName": "Arabic", "originalName": "العربية", "ietfTag": "ar-SA" },
  { "enName": "Bengali", "originalName": "বাংলা", "ietfTag": "bn-BD" },
  { "enName": "Bulgarian", "originalName": "български", "ietfTag": "bg-BG" },
  { "enName": "Catalan, Valencian", "originalName": "català, valencià", "ietfTag": "ca-ES" },
  { "enName": "Chinese", "originalName": "中文", "ietfTag": "zh-CN" },
  { "enName": "Croatian", "originalName": "hrvatski", "ietfTag": "hr-HR" },
  { "enName": "Czech", "originalName": "český", "ietfTag": "cs-CZ" },
  { "enName": "Danish", "originalName": "dansk", "ietfTag": "da-DK" },
  { "enName": "Dutch, Flemish", "originalName": "Nederlands, Vlaams", "ietfTag": "nl-NL" },
  { "enName": "English", "originalName": "English", "ietfTag": "en-US" },
  { "enName": "Estonian", "originalName": "eesti", "ietfTag": "et-EE" },
  { "enName": "Finnish", "originalName": "suomi", "ietfTag": "fi-FI" },
  { "enName": "French", "originalName": "français", "ietfTag": "fr-FR" },
  { "enName": "German", "originalName": "Deutsch", "ietfTag": "de-DE" },
  { "enName": "Greek", "originalName": "Ελληνικά", "ietfTag": "el-GR" },
  { "enName": "Hebrew", "originalName": "עברית", "ietfTag": "he-IL" },
  { "enName": "Hungarian", "originalName": "magyar", "ietfTag": "hu-HU" },
  { "enName": "Indonesian", "originalName": "Bahasa Indonesia", "ietfTag": "id-ID" },
  { "enName": "Italian", "originalName": "italiano", "ietfTag": "it-IT" },
  { "enName": "Japanese", "originalName": "日本語", "ietfTag": "ja-JP" },
  { "enName": "Korean", "originalName": "한국어", "ietfTag": "ko-KR" },
  { "enName": "Latvian", "originalName": "latviešu", "ietfTag": "lv-LV" },
  { "enName": "Lithuanian", "originalName": "lietuvių", "ietfTag": "lt-LT" },
  { "enName": "Norwegian", "originalName": "Norsk", "ietfTag": "no-NO" },
  { "enName": "Norwegian Bokmål", "originalName": "Norsk bokmål", "ietfTag": "nb-NO" },
  { "enName": "Persian", "originalName": "فارسی", "ietfTag": "fa-IR" },
  { "enName": "Polish", "originalName": "polski", "ietfTag": "pl-PL" },
  { "enName": "Portuguese", "originalName": "Português", "ietfTag": "pt-PT" },
  { "enName": "Punjabi", "originalName": "ਪੰਜਾਬੀ", "ietfTag": "pa-IN" },
  { "enName": "Romanian", "originalName": "română", "ietfTag": "ro-RO" },
  { "enName": "Russian", "originalName": "Русский", "ietfTag": "ru-RU" },
  { "enName": "Serbian", "originalName": "српски", "ietfTag": "sr-RS" },
  { "enName": "Slovak", "originalName": "slovenčina", "ietfTag": "sk-SK" },
  { "enName": "Slovenian", "originalName": "slovenščina", "ietfTag": "sl-SI" },
  { "enName": "Spanish", "originalName": "Español", "ietfTag": "es-ES" },
  { "enName": "Swedish", "originalName": "svenska", "ietfTag": "sv-SE" },
  { "enName": "Thai", "originalName": "ไทย", "ietfTag": "th-TH" },
  { "enName": "Turkish", "originalName": "Türkçe", "ietfTag": "tr-TR" },
  { "enName": "Ukrainian", "originalName": "українська", "ietfTag": "uk-UA" },
  { "enName": "Vietnamese", "originalName": "Tiếng Việt", "ietfTag": "vi-VN" }
];

/**
 * A service that manages language changes and notifies subscribers about them.
 */
export class LanguageChangeNotificator implements ILanguageChangeNotificator{

  private keeperCurrentLanguageTag: KeeperCurrentUserLanguage= new KeeperCurrentUserLanguage("CurrentLanguage", DEFAULT_LANG_DESCRIPTION.ietfTag);
  private subject: BehaviorSubject<ILanguageDescription>;
   /**
   * An observable that emits the language description whenever the selected language changes.
   */
  selectionChanged$ : Observable<ILanguageDescription>;
  private logger: ILogger = LoggerFactory.getLogger("eu.sirotin.localizer.LanguageChangeNotificator");
  private defaultLanguageDescription = DEFAULT_LANG_DESCRIPTION;

   /**
   * Creates an instance of LanguageChangeNotificator.
   * Initializes the current language based on the saved language or the browser's language.
   */
  constructor() {
    const keepedLangTag = this.keeperCurrentLanguageTag.readCurrentLang();
    let currentLanguageDescription = this.getLanguageDescriptionForIetfTag(keepedLangTag);

    this.subject = new BehaviorSubject<ILanguageDescription>(currentLanguageDescription);
    this.selectionChanged$ = this.subject.asObservable();
    this.logger.log("constructor: created. Current language is: ",currentLanguageDescription.enName);
  }

    /**
   * Gets the current language code (IETF language tag).
   * If no language is saved, it tries to get the browser's language.
   * If the browser's language is not supported, it returns the default language.
   * @returns The current language code, e.g., "en-US", "de-DE".
   */
  getCurrentLanguageCode(): string {
    let currentLanguage = this.keeperCurrentLanguageTag.readCurrentLang();
    this.logger.log("In getCurrentLanguageCode 1 current language: ", currentLanguage);
    if(currentLanguage == null) {
      if((navigator != null) && (navigator.language != null)) {
        currentLanguage = navigator.language;
        if(this.isLanguageSupported(currentLanguage)) {

        this.keeperCurrentLanguageTag.writeCurrentLang(currentLanguage);
        this.logger.log("In getCurrentLanguageCode 2 current language is null. Setting current language to navigator language: ", currentLanguage);
        return currentLanguage;
        }
      }
      this.logger.warn("In getCurrentLanguageCode 3 current language is null. Returning default language.");
      currentLanguage = this.getDefaultLanguageTag();
    }
    this.logger.log("In getCurrentLanguageCode 4 returning current language: ", currentLanguage);
    return currentLanguage;
  }

    /**
   * Sets the new language code and notifies subscribers about the change.
   * If the language is supported, it will be saved.
   * If the language is not supported, the default language will be used and notified.
   * @param ietfTag The new language code (IETF language tag), e.g., "en-US", "de-DE".
   *                Can be null or undefined, in which case the default language will be used.
   */
  selectionChanged(ietfTag: string|null|undefined): void {
    this.logger.log("selectionChanged: called with ietfTag: ", ietfTag);
    const selectedLanguage = this.getLanguageDescriptionForIetfTag(ietfTag);
    if(this.isLanguageSupported(ietfTag)) {
      this.logger.log("selectionChanged: 1 selected language is supported and saved: ", selectedLanguage.enName);
      this.keeperCurrentLanguageTag.writeCurrentLang(selectedLanguage.ietfTag);
    }
    //If language not supported, default language will be notificated.
    this.subject.next(selectedLanguage);
  }


   /**
   * Gets the language description for a given IETF language tag.
   * If the tag is null, undefined, or not supported, it returns the default language description.
   * @param ietfTag The IETF language tag to look up.
   * @returns The language description for the given tag, or the default language description if not found.
   */
  private getLanguageDescriptionForIetfTag(ietfTag: string|null|undefined ): ILanguageDescription {
    let res = this.defaultLanguageDescription;
    if (ietfTag == null) {
      this.logger.warn("In getLanguageDescriptionForIetfTag 1 language tag ",
        ietfTag, " is null or undefined. Returning default language description .", res);
      return res;
    }
    let res1 = SupportedLanguages.filter((lang) => lang.ietfTag == ietfTag)[0];
    if (res1 == null)  {
      this.logger.warn("In getLanguageDescriptionForIetfTag 2 result of filtering for ietfTag ", 
          ietfTag, " is null or undefined. Returning default language description.", res);
      return res;
    }
    this.logger.log("In getLanguageDescriptionForIetfTag 3 returning language: ", res1.enName);
    return res1;
  }

  /**
   * Checks if a given language tag is supported.
   * @param ietfTag The IETF language tag to check.
   * @returns `true` if the language is supported, `false` otherwise.
   */
  isLanguageSupported(ietfTag: string|null|undefined): boolean {
    let res = SupportedLanguages.filter((lang) => lang.ietfTag == ietfTag);
    return res.length > 0;
  }

  /**
   * Gets the default language description.
   * @returns The default language description.
   */
  getDefaultLanguageDescription(): ILanguageDescription {
    return this.defaultLanguageDescription;
  }

  /**
   * Gets the default language tag.
   * @returns The default language tag.
   */
  getDefaultLanguageTag(): string {
    return this.defaultLanguageDescription.ietfTag;
  }

  /**
   * Sets a new default language description.
   * @param lang The new default language description.
   */
  setDefaultLanguageDescription(lang: ILanguageDescription): void {
    this.defaultLanguageDescription = lang;
  }

  /**
   * Checks if the current language is saved in persistent storage.
   * @returns true if the current language is saved, false otherwise.
   */
  isCurentLanguageSaved(): boolean {
    let res = this.keeperCurrentLanguageTag.isCurrentLangSaved();
    this.logger.log("In isCurentLanguageSaved res: ", res);
    return res;
  }
}



