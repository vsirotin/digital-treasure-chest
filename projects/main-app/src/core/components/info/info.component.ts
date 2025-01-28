import { Component } from '@angular/core';
import * as uiInfo from '../../../assets/languages/core/components/info/lang/1/en-US.json';
import { ILogger, LoggerFactory } from '@vsirotin/log4ts';
import { ILocalizationClient, ILocalizer, LocalizerFactory } from '@vsirotin/localizer';

export const INFO_COMPONENT__SOURCE_DIR = "assets/languages/core/components/info/lang";
@Component({
  selector: 'app-info',
  standalone: true,
  imports: [],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent implements ILocalizationClient<IUIInfoComponent> {


  ui: IUIInfoComponent = (uiInfo as any).default;
  logger: ILogger = LoggerFactory.getLogger("eu.sirotin.demo-app.InfoComponent");

  localizer: ILocalizer;

  constructor() {
    this.logger.debug("Start of InfoComponent.constructor");
    this.localizer = LocalizerFactory.createLocalizer<IUIInfoComponent>(INFO_COMPONENT__SOURCE_DIR, 1, this.ui, this);
  }

  updateLocalization(data: IUIInfoComponent): void {
    this.ui = data;
    this.logger.log("updateLocalization: Localization data updated", data);
  }
}

export interface IUIInfoComponent {
  greeting: string;
  overview: string;
  explanation: string;
  howToUse: string;
  whereExplanation: string;
  certificate: string;
  settings: string;
  wisch: string;
}

