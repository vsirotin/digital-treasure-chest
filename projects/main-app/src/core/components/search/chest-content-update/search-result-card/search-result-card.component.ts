import {ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import { Chest } from '../../../../../shared/classes/chest';
import * as uiDefault from '../../../../../assets/languages/core/components/search/chest-content-update/search-result-card/lang/1/en-US.json';
import { ILocalizationClient, ILocalizer, LocalizerFactory } from '@vsirotin/localizer';

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
   
  ui: ISearchResultCard = {
  allItems:  {
    overview: 'All items',
    list: 'All items in the search result are unique.'
  },
  commonItems: {
    overview: 'Common items',
    list: 'The search result contains items that are already in the chest.'
  },
  uniqueItems: {    
    overview: 'Unique items',
    list: 'The search result contains items that are not in the chest.'
  },
  
  workpieces:   {
    title : 'Search results',
    tooManyItems: 'The search result for your criteria contains too many numbers. Please define your criteria a little more precisely.',
    firstNumbersText: 'The first numbers are',
    searchResultOkLength: 'Your search result is:',

    recomendationNewSearch: 'Please define your criteria in other way.',
    recomendationAdd: 'Congratulations! You can add selected numbers to Chest.',
    recomendationReplace: 'You can replace the old items in the chest with the new ones.',
    recomendationAddUnic: 'You can add unic numbers to Chest.',

    intersectionIsEmpty: 'The search result contains no numbers that are already in the chest.',
    intersectionIsNotEmpty: 'The search result contains following numbers that are already in the chest:',
    emptyResult: 'Your criteria seems to be contradictory. No items found. Please try again with other criteria.',
    unicItemsExist: 'Items in search result that are not in the chest:',
    unicItemsNotExist: 'All items in the search result are already in the chest.',
    
    replaceItems :'Replace old items in chests with new ones.',
    addItems : 'Add new items to chests.'
  }
};

  recomendation: string = '';

  title = this.ui.workpieces.title;  
  addItems = this.ui.workpieces.addItems;
  replaceItems = this.ui.workpieces.replaceItems;

  isButtonAddEnabled = false;
  isButtonReplaceEnabled = false;

  maxSearchLength = Chest.maxCapacity;
  intersection: number[] = [];
  unicElemntsInSearchResult: number[] = [];
  commonElemntsInSearchResult: number[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchResult']) {
      this.isButtonAddEnabled = false;
      this.isButtonReplaceEnabled = false;
      this.updateContent();
    }
  }

  private updateContent(): void {

    this.ui.allItems.overview = '';
    this.ui.allItems.list = '';
    this.ui.commonItems.overview = '';
    this.ui.commonItems.list = '';
    this.ui.uniqueItems.overview = '';
    this.ui.uniqueItems.list = '';
    this.recomendation = '';
    this.isButtonAddEnabled = false;
    this.isButtonReplaceEnabled = false;

    // this.findUnicElementsInSearchResult();

    if(this.searchResult.length == 0) {
    this.ui.allItems.overview = this.ui.workpieces.emptyResult;
    this.recomendation = this.ui.workpieces.recomendationNewSearch;
    return;
    }

    //Below search result is not empty

    if(this.searchResult.length > this.maxSearchLength) {
      this.ui.allItems.overview = this.ui.workpieces.tooManyItems;
      this.ui.allItems.list = this.ui.workpieces.firstNumbersText + `: ${this.searchResult.slice(0, this.maxSearchLength).join(', ')}...`;
      return;
    }

    //Below a search result is not too big
    this.ui.allItems.overview = this.ui.allItems.list = this.ui.workpieces.searchResultOkLength;
    this.ui.allItems.list = this.searchResult.join(', ');
    
    if(Chest.getItems().length == 0) {
      this.recomendation = this.ui.workpieces.recomendationAdd;
      this.isButtonAddEnabled = true;
      return;
    }

    //below chest is not empty
    this.findUnicElementsInSearchResult();

    if(this.intersection.length == 0) {
      this.ui.commonItems.overview = this.ui.workpieces.intersectionIsEmpty;
    }else {
      this.ui.commonItems.overview = this.ui.workpieces.intersectionIsNotEmpty;
      this.ui.commonItems.list = this.commonElemntsInSearchResult.join(', ') 
    }

    if(this.unicElemntsInSearchResult.length == 0) {
      this.ui.uniqueItems.overview = this.ui.workpieces.unicItemsNotExist;
      this.recomendation = this.ui.workpieces.recomendationNewSearch;
    return;
    }

    this.ui.uniqueItems.overview = this.ui.workpieces.unicItemsExist;
    this.ui.uniqueItems.list = this.unicElemntsInSearchResult.join(', ');

    this.isButtonReplaceEnabled = true;
      
    if(this.unicElemntsInSearchResult.length <= Chest.getFreeCapacity()) {
      this.recomendation = this.ui.workpieces.recomendationAddUnic;
      this.isButtonAddEnabled = true;
      return;
    }

    this.recomendation = this.ui.workpieces.recomendationReplace;   
  }

  buttonAdd(): void {
    Chest.addItems(this.searchResult);
  }

  buttonReplace(): void {
    Chest.replaceCurrentItemsWithNew(this.searchResult);
  }

  private findUnicElementsInSearchResult():void {
    const s1 = new Set(Chest.getItems());
    const s2 = new Set(this.searchResult);
    const is = new Set([...s1].filter(x => s2.has(x)));
    this.intersection =  Array.from(s2).sort((a, b) => a - b);
    const unics = this.searchResult.filter(x => !is.has(x))
    this.unicElemntsInSearchResult = unics.sort((a, b) => a - b);
    this.commonElemntsInSearchResult = Array.from(is).sort((a, b) => a - b);
  }

}

interface IOverviewedList{
  overview: string;
  list: string;
}

interface ISearchResultCardWorkpieces {
  title: string;
  tooManyItems: string;
  emptyResult: string;
  firstNumbersText: string;
  searchResultOkLength: string

  recomendationNewSearch: string;
  recomendationAdd: string;
  recomendationAddUnic: string;
  recomendationReplace: string;

  intersectionIsEmpty: string;
  intersectionIsNotEmpty: string;

  unicItemsExist: string;
  unicItemsNotExist: string;

  replaceItems: string;
  addItems: string;
}

interface ISearchResultCard {
  workpieces: ISearchResultCardWorkpieces;
  allItems: IOverviewedList;
  commonItems: IOverviewedList;
  uniqueItems: IOverviewedList;
}
