import { ILogger, LoggerFactory } from "@vsirotin/log4ts";
import { ReaderDefault } from "../specific-readers/reader-default";
import { KeeperMasterDataKeyValueSync } from "../keeper-master-data-key-value-sync";
import { LocalStorageAdapter } from "../specific-adapters/local-storage-adapter/local-storage-adapter";
import { ReaderBrowserLanguage } from "../specific-readers/reader-browser-language";


/*
    Keeper of KeeperMasterData for browser local storage with HTTP reader.
    This keeper holds data in local storage. 
    By finding it looks for the data in local storage and if it is not found it tries to find it in the HTTP repository.
*/
export class KeeperCurrentUserLanguage  {

    private loggger: ILogger = LoggerFactory.getLogger("KeeperCurrentUserLanguage");
    private keeperImpl: KeeperMasterDataKeyValueSync<string>;
    private adapter: LocalStorageAdapter = new LocalStorageAdapter();

    /**
     * Create a keeper master data with key-value based data model.
     * @param key place in local storage, where to store the data.
     * @param defaultData default data
     */
    constructor(private key: string, private defaultData: string) {
        this.keeperImpl = new KeeperMasterDataKeyValueSync(
            this.adapter, 
            [new ReaderBrowserLanguage(),
            new ReaderDefault<string>(defaultData)
        ]);
        this.loggger.log(" created for ", key, " defaultData", defaultData);
    }

    readCurrentLang(): string   {
        return this.keeperImpl.findSync(this.key) as string;
    }

    writreCurrentLang(lang: string): void {
        this.keeperImpl.saveSync(this.key, lang);
    }

    removeCurrentLang(): void {
        this.adapter.removeValueForkeySync(this.key);
    }

}


