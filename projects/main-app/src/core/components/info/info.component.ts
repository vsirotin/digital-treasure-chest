import { Component } from '@angular/core';
import * as uiInfo from '../../../assets/languages/core/components/info/lang/1/en-EN.json';
import { ILogger, LoggerFactory } from '@vsirotin/log4ts';

export const INFO_COMPONENT__SOURCE_DIR = "assets/languages/core/components/info/lang";
@Component({
  selector: 'app-info',
  standalone: true,
  imports: [],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent {

  ui: IUIInfoComponent = (uiInfo as any).default;
  logger: ILogger = LoggerFactory.getLogger("InfoComponent");
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

