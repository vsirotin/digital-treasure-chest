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
import { LocalizerFactory, ILocalizer, ILocalizationClient, ILanguageDescription } from '@vsirotin/localizer';
import { Subscription } from 'rxjs';
import * as uiItems from '../../../assets/languages/features/components/settings/lang/1/en-US.json';
import * as versionInfo from '../../../version.json'

export const SETTINGS_SOURCE_DIR = "assets/languages/features/components/settings/lang";

interface UIItems {
  settings: string;
  language: string;
  logging: string;
  loggingExplanation: string;
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

  ui: UIItems = (uiItems as any).default;
  subscription: Subscription;
  version: string = "v " + versionInfo.version + " - " + versionInfo.buildDate;

  constructor( ) {
    this.logger.debug("Start of SettingsComponent.constructor");  

    this.localizer  =  LocalizerFactory.createLocalizer<UIItems>(SETTINGS_SOURCE_DIR, 1, this.ui, this);
    this.subscription = LocalizerFactory.languageChangeNotificator.selectionChanged$.subscribe(
      (languageDescription: ILanguageDescription) => {
        this.langOrigin = languageDescription.originalName;
        this.langEn = languageDescription.enName;
        this.accordion?.closeAll();
    }); 
  }

  updateLocalization(data: UIItems): void {
    this.ui = data;
  }


  ngOnDestroy() {
    this.logger.debug("Start of SettingsComponent.ngDestroy");
    this.localizer.dispose();
    this.subscription.unsubscribe();
  }
}

