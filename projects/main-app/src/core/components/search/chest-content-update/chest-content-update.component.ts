import { Component, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatListModule, MatSelectionListChange, MatSelectionList } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TermExplanationDialog } from '../term-explanation-dialog/TermExplanationDialog';
import { Searcher } from '../../../classes/searcher/searcher';
import { SerachResultCardComponent } from './search-result-card/search-result-card.component';
import { Chest } from '../../../../shared/classes/chest';
import { NumberPropertiesNameHolder } from '../../../classes/number-expert/number-properties-name-holder';
import * as uiDefault from '../../../../assets/languages/core/components/search/chest-content-view/lang/1/en-US.json';
import { ILocalizationClient, ILocalizer, LocalizerFactory } from '@vsirotin/localizer';

@Component({
  selector: 'app-chet-content-update',
  standalone: true,
  imports: [    
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatListModule,
    MatButtonModule, 
    MatDialogModule,
    SerachResultCardComponent],
  templateUrl: './chest-content-update.component.html',
  styleUrl: './chest-content-update.component.css'
})
export class ChetContentUpdateComponent implements ILocalizationClient<ISearchUI> {

  ui: ISearchUI = (uiDefault as any).default;

  criteriaPrefix = NumberPropertiesNameHolder.criteriaPrefix;
  criteriaMap = NumberPropertiesNameHolder.criteriaIndexedList;

  private localizer: ILocalizer;

  constructor() {
    this.localizer = LocalizerFactory.createLocalizer<ISearchUI>("assets/languages/core/components/search/chest-content-update/lang", 1, this.ui, this);

    Chest.chestChanged$.subscribe((items: number[]) => {
      this.searchResultCardIsVisible = false;
    });
  }
  updateLocalization(data: ISearchUI): void {
    this.ui = data;
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(TermExplanationDialog)
  }

  errorText = '';

  minValue: number = 0; // Initial minimum value
  maxValue: number = 1000; // Initial maximum value
  isIntervalValid: boolean = false; // Error flag for interval validation
  criterionIds: number[] = []; // Selected criteria
  searchResult: number[] = []; // Search result
  searchResultCardIsVisible: boolean = false; 

  readonly dialog = inject(MatDialog);
  @ViewChild('criteria') criteriaList!: MatSelectionList;


  onSelectionChange(event: MatSelectionListChange): void {
    this.criterionIds = this.criteriaList.selectedOptions.selected
      .map(option => option.value.id).sort((a, b) => a - b);
    if(this.vaidateInput()){  
      this.processSearch();
    }
  }

  intervalChanged(): void {
    this.validateIntervalIntern(this.minValue, this.maxValue);
    if(!this.isIntervalValid){
      this.errorText = this.ui.errorTextMessage;
      return
    }
    if(this.criterionIds.length >0 ){
      this.processSearch();
    }
  }

  vaidateInput(): boolean {
    this.validateIntervalIntern(this.minValue, this.maxValue);
    if(!this.isIntervalValid){
      return false
    }
    return this.criterionIds.length >0 
  }

  private processSearch(): void {
    this.searchResult = Searcher.search(this.minValue, this.maxValue, this.criterionIds);
    this.searchResultCardIsVisible = true;
  }

  /**
   * Returns true if the interval is valid, otherwise false
   * @param minValue Represents the minimum value of the interval
   * @param maxValue Represents the maximum value of the interval
   * @returns true if the interval is valid, otherwise false
   */
  validateIntervalIntern(minValue: number, maxValue: number): void{
    const res=  (minValue <= maxValue)
    && (minValue >= 0) && (maxValue >= 0)
    && (minValue <= 1000) && (maxValue <= 1000)
    &&Number.isInteger(minValue)
    &&Number.isInteger(maxValue);  

    if(res){
      this.errorText = '';
      this.isIntervalValid = true;
      return;
    }

    this.errorText = this.ui.errorTextMessage;
    this.isIntervalValid = false;
    
  }

}


interface ISearchEntry {
  id: number;
  criteria: string;
  explanation?: string;
}

interface ISearchUI {
  searchTitle: string;
  introduction: string;
  errorTextMessage: string;
  termExplanation: string;
}

