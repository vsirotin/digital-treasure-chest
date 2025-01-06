import { Component } from '@angular/core';
import * as uiInfo from '../../../assets/languages/core/components/info/lang/1/en-EN.json';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent {

  ui: IUIInfoComponent = (uiInfo as any).default;

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

