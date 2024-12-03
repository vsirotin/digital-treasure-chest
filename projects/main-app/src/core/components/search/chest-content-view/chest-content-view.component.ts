import { Component } from '@angular/core';

@Component({
  selector: 'app-chet-content-view',
  standalone: true,
  imports: [],
  templateUrl: './chest-content-view.component.html',
  styleUrl: './chest-content-view.component.css'
})
export class ChetContentViewComponent {

  ui: IChetViewUI = {
    resultTitle: 'Your Digital Treasure Chest contain now the following numbers:',
    noResults: 'No numbers selected',
    listNumbersInTreasure: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  };

}
export interface IChetViewUI {
  resultTitle: string;
  noResults: string;
  listNumbersInTreasure: number[];
}

