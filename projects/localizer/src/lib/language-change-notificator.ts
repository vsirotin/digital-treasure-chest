import { BehaviorSubject, Observable } from 'rxjs';
import { DEFAULT_LANG_DESCRIPTION, ILanguageDescription, getLanguageDescriptionForIetfTag } from './language-description';
import { KeeperCurrentUserLanguage } from '@vsirotin/keeper-master-data';


export class LanguageChangeNotificator implements ILanguageChangeNotificator{

  private subject: BehaviorSubject<ILanguageDescription>;
  selectionChanged$ : Observable<ILanguageDescription>;

  constructor(private keeperCurrentLanguageTag: KeeperCurrentUserLanguage) {
    const keepedLangTag = this.keeperCurrentLanguageTag.readCurrentLang();
    let currentLanguageDescription = getLanguageDescriptionForIetfTag(keepedLangTag);
    if(currentLanguageDescription == null) {
      currentLanguageDescription = DEFAULT_LANG_DESCRIPTION;
    }
    this.subject = new BehaviorSubject<ILanguageDescription>(currentLanguageDescription);
    this.selectionChanged$ = this.subject.asObservable();
  }

  selectionChanged(selectedLanguage: ILanguageDescription) {
    this.keeperCurrentLanguageTag.writeCurrentLang(selectedLanguage.ietfTag);
    this.subject.next(selectedLanguage);
  }

}

export interface ILanguageChangeNotificator {
  selectionChanged$: Observable<ILanguageDescription>;
  selectionChanged(selectedLanguage: ILanguageDescription): void;
}

