import { ILogger, LoggerFactory } from "@vsirotin/log4ts";
import { ReaderDefault } from "../specific-readers/reader-default";
import { KeeperMasterDataKeyValueSync } from "../keeper-master-data-key-value-sync";
import { LocalStorageAdapterSync } from "../specific-adapters/local-storage-adapter/local-storage-adapter";
import { ReaderBrowserLanguage } from "../specific-readers/reader-browser-language";


/*
    Keeper of information about the current user language.
*/
export class KeeperCurrentUserLanguage  {

    private loggger: ILogger = LoggerFactory.getLogger("eu.sirotin.kmd.KeeperCurrentUserLanguage");
    private keeperImpl: KeeperMasterDataKeyValueSync<string>;
    private adapter: LocalStorageAdapterSync<string> = new LocalStorageAdapterSync<string>();

    /**
     * Create a keeper master data with key-value based data model.
     * @param key place in local storage, where to store the data.
     * @param defaultLanguageTag default data
     */
    constructor(private key: string, private defaultLanguageTag: string) {
        this.keeperImpl = new KeeperMasterDataKeyValueSync(
            this.adapter, 
            [new ReaderBrowserLanguage(),
            new ReaderDefault<string>(defaultLanguageTag)
        ]);
        this.loggger.log("constructor: created for ", key, " defaultData", defaultLanguageTag);
    }

    /**
     * Read the current language of the user from local storage.
     * @returns the current language of the user
     */
    readCurrentLang(): string   {
        const res = this.keeperImpl.findSync(this.key) as string;
        this.loggger.log("readCurrentLang: read ", res, " for key ", this.key);
        return res;
    }

    /**
     * Write the current language of the user in local storage.
     * @param lang the language to be saved
     */
    writeCurrentLang(lang: string): void {
        this.keeperImpl.saveSync(this.key, lang);
        this.loggger.log("writeCurrentLang: saved ", lang, " for key ", this.key);
    }

    /**
     * Remove the current language of the user from local storage.
     */
    removeCurrentLang(): void {
        this.adapter.removeValueForkeySync(this.key);
        this.loggger.log("removeCurrentLang: removed for key ", this.key);
    }

    /**
     * Checks if the current language of the user is saved in local storage.
     * @returns true if the current language is saved, false otherwise
     */
    isCurrentLangSaved(): boolean {
        const res = this.adapter.readSync(this.key) != null;
        this.loggger.log("isCurrentLangSaved: ", res, " for key ", this.key);
        return res
    }

}


