import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatAccordion, MatExpansionModule, MatExpansionPanel} from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {ChetContentViewComponent} from './chest-content-view/chest-content-view.component';
import {ChetContentUpdateComponent} from './chest-content-update/chest-content-update.component';
import { Chest } from '../../../shared/classes/chest';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    MatAccordion, 
    MatExpansionModule,
    MatCardModule,
    MatIconModule,
    MatProgressBarModule,
    ChetContentViewComponent,
    ChetContentUpdateComponent
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
@ViewChild('viewPanel') viewPanel!: MatExpansionPanel;

ui: ISerachUI = {
  chetNumbers: [],
  viewTemplate: 'Your chet contains X numbers',
  viewTitle: "",
  updateTitle: 'Search new numbers for your Digital Treasure Chet',
};



constructor() { 
  this.updateViewTitle();
  Chest.chestChanged$.subscribe((items: number[]) => {
    this.ui.chetNumbers = items;
    this.updateViewTitle();
    if(items.length > 0) {
      this.viewPanel.open();
    }
  });
}



  private updateViewTitle() {
    this.ui.viewTitle = this.ui.viewTemplate.replace('X', this.ui.chetNumbers.length.toString());
  }
}

interface ISerachUI {
  chetNumbers: number[];
  viewTemplate: string
  viewTitle: string;
  updateTitle: string;
}





