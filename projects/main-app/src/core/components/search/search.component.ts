import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {ChetContentViewComponent} from './chest-content-view/chest-content-view.component';
import {ChetContentUpdateComponent} from './chest-content-update/chest-content-update.component';

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

ui: ISerachUI = {
  chetNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  viewTemplate: 'Your chet contains X numbers',
  viewTitle: "",
  updateTitle: 'Search new numbers for your Digital Treasure Chet',
};

constructor() { 
  this.ui.viewTitle = this.ui.viewTemplate.replace('X', this.ui.chetNumbers.length.toString());
}


}

interface ISerachUI {
  chetNumbers: number[];
  viewTemplate: string
  viewTitle: string;
  updateTitle: string;
}





