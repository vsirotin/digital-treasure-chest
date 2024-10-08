import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommunicatorService } from './service/communicator.service'
import { ILanguageDescription, LocalizerFactory } from '@vsirotin/localizer';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule, 
    MatButtonModule, 
    MatIconModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent{

  title = 'My digital jewelry box';
  originalName = "";
  ietfTag = "";

  constructor(private communicatorService: CommunicatorService){
    LocalizerFactory.languageChangeNotificator.selectionChanged$.subscribe(
      (languageDescription: ILanguageDescription) => {
        this.originalName = languageDescription.originalName;
        const len = languageDescription.ietfTag.length;
        this.ietfTag = languageDescription.ietfTag.substring(len-2, len);
    }); 
}

  onClick() {
    this.communicatorService.buttonClicked()
  }

}
