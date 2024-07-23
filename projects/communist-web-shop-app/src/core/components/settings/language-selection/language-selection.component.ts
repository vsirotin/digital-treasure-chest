import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { ILanguageChangeNotificator } from '../../../shared/classes/localization/language-change-notificator'
import { SupportedLanguages } from '../../../shared/classes/localization/language-description';
import { Localizer } from '../../../shared/classes/localization/localizer';

/**
 * @title Accordion with expand/collapse all toggles
 */
@Component({
  selector: 'app-language-selection',
  templateUrl: './language-selection.component.html',
  styleUrl: './language-selection.component.scss',
  standalone: true,
  imports: [
    MatRadioModule, 
    FormsModule
  ],
})

export class LanguageSelectionComponent {

  //Variables used in HTML part of component.
  selectedLangCode: string|null = null;
  supportedLanguages = SupportedLanguages;

  private selectedLanguageService: ILanguageChangeNotificator = Localizer.languageChangeNotificator;

  constructor(){}

  onRadioChange() { 
    let selLang = SupportedLanguages.filter((lang) => lang.ietfTag == this.selectedLangCode)[0];
    this.selectedLanguageService.selectionChanged(selLang);
  }
}


