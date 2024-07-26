import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MatAccordion, MatExpansionModule} from '@angular/material/expansion';
//import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Subscription } from 'rxjs/internal/Subscription';
import { Localizer } from '@vsirotin/localizer';
import { ILogger, LoggerFactory } from '@vsirotin/log4ts';
import { LanguageSelectionComponent } from '../../../shared/components/language-selection/language-selection.component'
import { ILanguageDescription, SupportedLanguages, ILanguageChangeNotificator } from '@vsirotin/localizer';
import { LogSettingComponent } from "../../../shared/components/log-setting/log-setting.component";

export const SETTINGS_SOURCE_DIR = "assets/languages/features/components/settings/lang/";

const UI_ITEMS_DEFAULT = new Map<string, string> ( [
  ["language", "Language"],
  ["logging", "Logging"]
]);



/**
 * //TODO: Add documentation
 */
@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,

//   MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatProgressBarModule,
    LanguageSelectionComponent,
    LogSettingComponent
],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit, OnDestroy  {
  @ViewChild(MatAccordion) accordion?: MatAccordion;

  logger: ILogger = LoggerFactory.getLogger("SettingsComponent");

  private subscription: Subscription;
  readonly localizer: Localizer;
  private languageChangeNotificator: ILanguageChangeNotificator = Localizer.languageChangeNotificator;

  langOrigin: string = ""
  langEn: string = ""
  langEtfTag: string = "" 



  uiItems = UI_ITEMS_DEFAULT;


  ui = {
    loggingExplanation: "Only for support purposes",
  }


  constructor( ) {
    this.logger.debug("Start of SettingsComponent.constructor");  

    this.localizer =  new Localizer(SETTINGS_SOURCE_DIR, 1, this.logger);

    this.setLanguageRelatedElements(this.localizer.currentLanguage as ILanguageDescription);

    this.subscription = this
      .languageChangeNotificator.selectionChanged$
      .subscribe((selectedLanguage: ILanguageDescription) => {
      this.setLanguageRelatedElements(selectedLanguage);

      if (this.accordion) {
        this.accordion.closeAll();
      }
    });
  }

  private setLanguageRelatedElements(selectedLanguage: ILanguageDescription) {
    this.logger.debug("Start of SettingsComponent.setLanguageRelatedElements selectedLanguage=" + JSON.stringify(selectedLanguage));
    
    const langDescr = SupportedLanguages.filter((lang) => lang.ietfTag == selectedLanguage.ietfTag)[0];
    this.langOrigin = langDescr.originalName;
    this.langEn = langDescr.enName;
    this.langEtfTag = langDescr.ietfTag;
  }

  async ngOnInit() {
    this.logger.debug("Start of SettingsComponent.ngOnInit");
    await this.localizer.initializeLanguage();
    this.setLanguageRelatedElements(this.localizer.currentLanguage as ILanguageDescription);
    this.logger.debug("End of SettingsComponent.ngOnInit");
  }



  ngOnDestroy() {
    this.logger.debug("Start of SettingsComponent.ngDestroy");
    this.subscription.unsubscribe();
    this.localizer.destructor();
  }


  t(key: string, defaultText: string): string {
    return this.localizer.getTranslation(key, defaultText);
  }

}
