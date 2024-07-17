import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommunicatorService } from './service/communicator.service'

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
  constructor(private communicatorService: CommunicatorService){} 

  title = 'CoWeShop';

  onClick() {
    this.communicatorService.buttonClicked()
  }

}
