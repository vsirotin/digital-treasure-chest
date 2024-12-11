import { Component } from '@angular/core';
import { Chest } from '../../../../shared/classes/chest';

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
    noResultsTitle: 'No items in your chest yet.',
    listNumbersInTreasure: [],
    clearButtonTitle: 'Clear the chest'
  };

  isClearButtonEnabled: boolean = false;

  constructor() { 
    Chest.chestChanged$.subscribe((items: number[]) => {
      this.ui.listNumbersInTreasure = items;
      this.isClearButtonEnabled = items.length > 0;
    });
  }

  clearChest() {
    Chest.replaceCurrentItemsWithNew([]);
  }

}
export interface IChetViewUI {
  resultTitle: string;
  noResultsTitle: string;
  listNumbersInTreasure: number[];
  clearButtonTitle: string;
}

