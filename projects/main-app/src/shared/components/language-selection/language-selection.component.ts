import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { ILanguageChangeNotificator, LocalizerFactory, SupportedLanguages } from '@vsirotin/localizer';

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
    MatDividerModule,
    FormsModule
  ],
})

export class LanguageSelectionComponent {

  //Variables used in HTML part of component.
  selectedLangCode: string|null = null;
  supportedLanguages = SupportedLanguages;

  private selectedLanguageService: ILanguageChangeNotificator = LocalizerFactory.languageChangeNotificator;

  constructor(){}

  onRadioChange() { 
    this.selectedLanguageService.selectionChanged(this.selectedLangCode);
  }
}


