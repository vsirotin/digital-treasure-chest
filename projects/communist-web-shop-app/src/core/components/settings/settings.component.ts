import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Subscription } from 'rxjs/internal/Subscription';
import { ILogger, LoggerFactory } from '@vsirotin/log4ts';
import { LanguageSelectionComponent } from '../../../shared/components/language-selection/language-selection.component'
import { LogSettingComponent } from "../../../shared/components/log-setting/log-setting.component";
import { LocalizerFactory, ILocalizer } from '@vsirotin/localizer';

export const SETTINGS_SOURCE_DIR = "assets/languages/features/components/settings/lang/";

class UIItems {
  settings: string = "Settings";
  language: string= "Language";
  logging: string = "Logging";
  loggingExplanation: string = "Only for support purposes";
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
export class SettingsComponent implements  OnDestroy  {
  @ViewChild(MatAccordion) accordion?: MatAccordion;

  logger: ILogger = LoggerFactory.getLogger("SettingsComponent");

  private subscription: Subscription;
  readonly localizer: ILocalizer<UIItems>;

  langOrigin: string = ""
  langEn: string = ""
  langEtfTag: string = "" 

  ui: UIItems = {
    settings: "Settings",
    language:  "Language",
    logging: "Logging",
    loggingExplanation: "Only for support purposes",
  }


  constructor( ) {
    this.logger.debug("Start of SettingsComponent.constructor");  

    this.localizer  =  LocalizerFactory.createLocalizer(SETTINGS_SOURCE_DIR, 1);

    this.subscription = this
      .localizer.languageSwitched$
      .subscribe((currentUiItems: UIItems) => {
      this.logger.debug("In subscription currentUiItems=" + JSON.stringify(currentUiItems));

      //This check is needed because of specific brhavenior of TypeScript
      if(currentUiItems instanceof UIItems){
        this.ui = currentUiItems;
      }else{
        this.logger.error("In subscription currentUiItems is not of type UIItems. UIItems=", 
          JSON.stringify(this.ui), " currentUiItems=", JSON.stringify(currentUiItems));
      }
      this.accordion?.closeAll();
       
    });
  }

  ngOnDestroy() {
    this.logger.debug("Start of SettingsComponent.ngDestroy");
    this.subscription.unsubscribe();
    this.localizer.destructor();
  }
}
