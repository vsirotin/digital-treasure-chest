import { Component, ViewChild, OnDestroy } from '@angular/core';
import { MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ILogger, LoggerFactory } from '@vsirotin/log4ts';
import { LanguageSelectionComponent } from '../../../shared/components/language-selection/language-selection.component'
import { LogSettingComponent } from "../../../shared/components/log-setting/log-setting.component";
import { LocalizerFactory, ILocalizer, DEFAULT_LANG_TAG, ILocalizationClient, ILanguageDescription } from '@vsirotin/localizer';

export const SETTINGS_SOURCE_DIR = "assets/languages/features/components/settings/lang";

class UIItems {
  settings: string = "Settings";
  language: string= "Language";
  logging: string = "Logging";
  loggingExplanation: string = "Only for support purposes";
}

export const DEFAUIL_UI_ITEMS: UIItems = {
  settings: "Settings",
  language:  "Language",
  logging: "Logging",
  loggingExplanation: "Only for support purposes",
}

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatNativeDateModule,
    MatCardModule,
    MatProgressBarModule,
    LanguageSelectionComponent,
    LogSettingComponent
],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements  OnDestroy, ILocalizationClient<UIItems>  {
  @ViewChild(MatAccordion) accordion?: MatAccordion;

  logger: ILogger = LoggerFactory.getLogger("SettingsComponent");

  private localizer: ILocalizer

  langOrigin: string = ""
  langEn: string = ""

  ui: UIItems = DEFAUIL_UI_ITEMS;

  constructor( ) {
    this.logger.debug("Start of SettingsComponent.constructor");  

    this.localizer  =  LocalizerFactory.createLocalizer<UIItems>(SETTINGS_SOURCE_DIR, 1, DEFAUIL_UI_ITEMS, this);
    LocalizerFactory.languageChangeNotificator.selectionChanged$.subscribe(
      (languageDescription: ILanguageDescription) => {
        this.langOrigin = languageDescription.originalName;
        this.langEn = languageDescription.enName;
    }); 
  }

  updateLocalization(data: UIItems): void {
    this.ui = data;
  }


  ngOnDestroy() {
    this.logger.debug("Start of SettingsComponent.ngDestroy");
    this.localizer.dispose();
  }
}

