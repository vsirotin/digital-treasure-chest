import { Observable, Subject } from 'rxjs';
import { ILanguageDescription } from './language-description';


export class LanguageChangeNotificator implements ILanguageChangeNotificator{

  private subject = new Subject<ILanguageDescription>();
  selectionChanged$ = this.subject.asObservable();

  selectionChanged(selectedLanguage: ILanguageDescription) {
    this.subject.next(selectedLanguage);
  }

}

export interface ILanguageChangeNotificator {
  selectionChanged$: Observable<ILanguageDescription>;
  selectionChanged(selectedLanguage: ILanguageDescription): void;
}

