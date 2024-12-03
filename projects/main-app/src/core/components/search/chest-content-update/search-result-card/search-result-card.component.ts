import {ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import { Chest } from '../../../../../shared/classes/chest';

@Component({
  selector: 'app-serach-result-card',
  standalone: true,
  imports: [MatCardModule, MatProgressBarModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search-result-card.component.html',
  styleUrl: './search-result-card.component.css'
})
export class SerachResultCardComponent implements OnChanges {

  @Input() searchResult: number[] = [];

  ui: ISearchResultCardUI = {
    title: 'Search results',
    prefixTooMany: 'The search result for your criteria contains too many numbers. Please define your criteria a little more precisely.',
    firstNumbersText: 'The first numbers are',
    searchOk: 'Congratulations! You can add selected numbers to Chest.',
    yourSearchResult: 'Your search result is',
    emptyResult: 'Your criteria seems to be contradictory. Please try again with other criteria.',
    midSituations: 'The number of items in your chest together with the number of items currently selected exceeds the capacity of the chest. You can remove some items from the Chest or replace old items with new ones.',
    replaceItems: 'Replace old items in chests with new ones.', 
    addItems: 'Add new items to chests.'
  };

  text1 = '';
  text2 = '';

  isButtonAddEnabled = false;
  isButtonReplaceEnabled = false;

  maxSearchLength = Chest.maxCapacity;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchResult']) {
      this.isButtonAddEnabled = false;
      this.isButtonReplaceEnabled = false;
      this.updateLongText();
    }
  }

  private updateLongText(): void {
    console.log('Chest containts', Chest.items);

    if(this.searchResult.length == 0) {
      this.text1 = this.ui.emptyResult;
      this.text2 = '';
      return;
    }

    if(this.searchResult.length > this.maxSearchLength) {
      this.text1 = this.ui.prefixTooMany;
      this.text2 = this.ui.firstNumbersText + `: ${this.searchResult.slice(0, this.maxSearchLength).join(', ')}`;
      return;
    }

    if(this.searchResult.length <= Chest.getFreeCapacity()) {     
      this.text1 = this.ui.yourSearchResult + `: ${this.searchResult.join(', ')}`;
      this.text2 = this.ui.searchOk
      this.isButtonAddEnabled = true;
      this.isButtonReplaceEnabled = true;
      return;
    }

    // If we are here, then the search result is greater than the free capacity of the chest, but less than the maximum search length
    this.text1 = this.ui.midSituations;
    this.text2 = "";
    this.isButtonAddEnabled = false;
    this.isButtonReplaceEnabled = true;

  }

  buttonAdd(): void {
    this.searchResult.forEach(item => Chest.addItem(item));
  }

  buttonReplace(): void {
    console.log('Button 2 clicked');
  }


}

interface ISearchResultCardUI {
  title: string;
  prefixTooMany: string;
  firstNumbersText: string;
  searchOk: string;
  yourSearchResult: string;
  emptyResult: string;
  midSituations: string;
  replaceItems: string;
  addItems: string;
}
