import { Component, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatListModule, MatSelectionListChange, MatSelectionList } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { TermExplanationDialog } from '../term-explanation-dialog/TermExplanationDialog';
import { Searcher } from '../searcher/searcher';

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
    MatDialogModule],
  templateUrl: './chet-content-update.component.html',
  styleUrl: './chet-content-update.component.css'
})
export class ChetContentUpdateComponent {

  ui: ISearchUI = {
    searchTitle: 'Search new numbers for your Digital Treasure Chet',
    introduction: 'Please select a criterions for search your favorite positive integer numbers (denoted below as X)',
    prefix: "It is ",
    errorTextMessage: 'Minimum and maximum values must integers between 0 and 1000, inclusive. Minimum value must be less than or equal to maximum value.',
    termExplanation: 'What do these terms mean?',
    criteria: [
      { id: 1, criteria: "an even number"},
      { id: 2, criteria: "an  odd number" },
      { id: 3, criteria: "a prime number" },
      { id: 4, criteria: "a Pythagoras prime number" },
      { id: 5, criteria: "a Fibbonacci number" },
      { id: 6, criteria: "a Tribonnaci number" },
      { id: 7, criteria: "a Bell's number" },
      { id: 8, criteria: "a Catalan number" },
      { id: 9, criteria: "a Sophie Germain's number" },
      { id: 10, criteria: "a symmetrical number" }
    ],
  };

  openDialog(): void {
    const dialogRef = this.dialog.open(TermExplanationDialog)
  }

  errorText = '';

  minValue: number = 0; // Initial minimum value
  maxValue: number = 1000; // Initial maximum value
  isIntervalValid: boolean = false; // Error flag for interval validation
  criterionIds: number[] = []; // Selected criteria
  searchResult: number[] = []; // Search result

  onOptionClick(criterion: string): void {
    // Your function logic here
    console.log('Option clicked:', criterion);
  }

  readonly dialog = inject(MatDialog);
  @ViewChild('criteria') criteriaList!: MatSelectionList;



  onSelectionChange(event: MatSelectionListChange): void {
    this.criterionIds = this.criteriaList.selectedOptions.selected
      .map(option => option.value.id).sort((a, b) => a - b);
    console.log('Selected option:', this.criterionIds);
    this.processSearch();
    console.log('Search result:', this.searchResult);
  }

  validateInterval(): void {
    this.isIntervalValid  =  this.validateIntervalIntern(this.minValue, this.maxValue);
    if(!this.isIntervalValid){
      this.errorText = this.ui.errorTextMessage;
      return
    }
    if(this.criterionIds.length >0 ){
      this.processSearch();
    }
  }

  private processSearch(): void {
    this.searchResult = Searcher.search(this.minValue, this.maxValue, this.criterionIds);
    console.log('Search result:', this.searchResult);
  }

  /**
   * Returns true if the interval is valid, otherwise false
   * @param minValue Represents the minimum value of the interval
   * @param maxValue Represents the maximum value of the interval
   * @returns true if the interval is valid, otherwise false
   */
  validateIntervalIntern(minValue: number, maxValue: number): boolean{
    return (minValue <= maxValue)
    && (minValue >= 0) && (maxValue >= 0)
    && (minValue <= 1000) && (maxValue <= 1000)
    &&Number.isInteger(Number(minValue))
    &&Number.isInteger(Number(maxValue));  
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
  prefix: string;
  errorTextMessage: string;
  termExplanation: string;
  criteria: Array<ISearchEntry>;
}

