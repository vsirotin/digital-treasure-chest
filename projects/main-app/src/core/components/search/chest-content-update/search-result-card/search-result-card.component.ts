import {ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, ChangeDetectorRef} from '@angular/core';
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


  export class SerachResultCardComponent implements OnChanges, ILocalizationClient<ISearchResultCard> {

  @Input() searchResult: number[] = [];
   
  ui: ISearchResultCard = (uiDefault as any).default;

  recomendation: string = '';

  title: string;  
  addItems: string; 
  replaceItems: string; 
  btnAdd: string = "AAA";

  isButtonAddEnabled = false;
  isButtonReplaceEnabled = false;

  maxSearchLength = Chest.maxCapacity;
  intersection: number[] = [];
  unicElemntsInSearchResult: number[] = [];
  commonElemntsInSearchResult: number[] = [];

  private localizer: ILocalizer;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    this.title = this.ui.workpieces.title;  
    this.addItems = this.ui.workpieces.addItems;
    this.replaceItems = this.ui.workpieces.replaceItems;
    this.localizer = LocalizerFactory.createLocalizer<ISearchResultCard>("assets/languages/core/components/search/chest-content-update/search-result-card/lang", 1, this.ui, this);
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchResult']) {
      this.isButtonAddEnabled = false;
      this.isButtonReplaceEnabled = false;
      this.updateContent();
      this.changeDetectorRef.markForCheck(); // Mark for check
    }
  }

  updateLocalization(data: ISearchResultCard): void {
    this.ui = data;
    this.updateContent();
    this.changeDetectorRef.markForCheck(); // Mark for check
  }

  private updateContent(): void {

    this.btnAdd = this.ui.workpieces.addItems;
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
