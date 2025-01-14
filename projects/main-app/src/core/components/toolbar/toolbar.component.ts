import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommunicatorService } from './service/communicator.service'
import { ILocalizationClient, ILocalizer, LocalizerFactory } from '@vsirotin/localizer';
import * as uiDefault from '../../../assets/languages/core/components/toolbar/lang/1/en-US.json';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule, 
    MatButtonModule, 
    MatIconModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent implements ILocalizationClient<IUIToolbar>{

  ui: IUIToolbar = (uiDefault as any).default;
  
  private localizer: ILocalizer;

  constructor(private communicatorService: CommunicatorService){
    this.localizer = LocalizerFactory.createLocalizer<IUIToolbar>("assets/languages/core/components/toolbar/lang", 1, this.ui, this);
  }
  updateLocalization(data: IUIToolbar): void {
    this.ui  = data;
  }

  onClick() {
    this.communicatorService.buttonClicked()
  }

}

interface IUIToolbar {
  title: string;
  ietfTag: string;
}
