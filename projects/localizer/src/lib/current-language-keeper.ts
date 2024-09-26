import { IKeeperMasterDataKeyValue, IReadOnlyRepositoryAdapter, KeeperMasterDataKeyValue, LocalStorageKeyValueAdapter } from "@vsirotin/keeper-master-data";
import { LanguageData } from "./localizer";

/*
* Keeps information about current language in application.
* For this it uses browser local storage, default browser language and at least default language setting
*/

export class CurrentLanguageKeeper {

    keeperMasterDataKeyValue: IKeeperMasterDataKeyValue<string>;
    constructor(ietfTag: string){
        this.keeperMasterDataKeyValue = new KeeperMasterDataKeyValue<string>([
          new LocalStorageKeyValueAdapter(),
          new BrowserLanguageInvestigator(),
          new DefaultValueAdapter(ietfTag)
        ])
    }

  async getCurrentLanguageTag(): Promise<string | undefined> {
    return this.keeperMasterDataKeyValue. find("currentLanguage");
  }
}

export class DefaultValueAdapter implements IReadOnlyRepositoryAdapter {
    constructor(private defaultData: any){}    
    
    fetch(key: string): Promise<any | undefined> {
        return Promise.resolve(this.defaultData);
    }
    
}

export class BrowserLanguageInvestigator implements IReadOnlyRepositoryAdapter { 
  
  fetch(key: string): Promise<string | undefined> {
      return Promise.resolve(navigator.language);
  }
  
}
