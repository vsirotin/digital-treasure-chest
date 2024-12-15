import { Component } from '@angular/core';
import { Chest } from '../../../../shared/classes/chest';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-chet-content-view',
  standalone: true,
  imports: [MatCardModule],
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

  getItemDetails(item: number): string[] {
    // Example function that returns an array of strings for each item
    return [`Detail 1 for item ${item}`, `Detail 2 for item ${item}`, `Detail 3 for item ${item}`];
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

