import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import { ITermExplanationDialogData, TermExplanationDialog } from './term-explanation-dialog/TermExplanationDialog';
import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MatListModule,
    MatButtonModule, 
    MatIconModule, 
    MatDialogModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  ui: ISearchUI = {
    title: 'Search new numbers for your Digital Treasure Chet',
    introduction: 'Please select a criterions for search your favorite positive integer numbers (denoted below as X)',
    errorTextMessage: 'Minimum and maximum values should be both positive integers less or equal 1000. Minimum value must be less than or equal to maximum value.',
    searchItems: [
      { id: 'Boots', criteria: 'Boots' },
      { id: 'Clogs', criteria: 'Clogs' },
      { id: 'Loafers', criteria: 'Loafers' },
      { id: 'Moccasins', criteria: 'Moccasins' },
      { id: 'Sneakers', criteria: 'Sneakers' },
    ],
  };

  errorText = '';
  criteria: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];

  buttonName = "What is it?";

  minValue: number = 0; // Initial minimum value
  maxValue: number = 1000; // Initial maximum value
  isIntervalValid: boolean = false; // Error flag for interval validation

  onOptionClick(criterion: string): void {
    // Your function logic here
    console.log('Option clicked:', criterion);
  }

  readonly dialog = inject(MatDialog);

  openDialog(index: number): void {

    ;

    const dialogRef = this.dialog.open(TermExplanationDialog);

    const dialogData: ITermExplanationDialogData = {lang: "de-DE", term: "AAAAA"}
    dialogRef.componentInstance.setData(dialogData);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  validateInterval(): void {
    this.isIntervalValid  =  this.validateIntervalIntern(this.minValue, this.maxValue);
    if(!this.isIntervalValid){
      this.errorText = this.ui.errorTextMessage;
    }
  }

  /**
   * Returns true if the interval is valid, otherwise false
   * @param minValue Represents the minimum value of the interval
   * @param maxValue Represents the maximum value of the interval
   * @returns true if the interval is valid, otherwise false
   */
  validateIntervalIntern(minValue: number, maxValue: number): boolean{
    return (minValue <= maxValue)
    && (minValue > 0) && (maxValue > 0)
    && (minValue <= 1000) && (maxValue <= 1000)
    &&Number.isInteger(Number(minValue))
    &&Number.isInteger(Number(maxValue));  
  }

}

interface ISearchEntry {
  id: string;
  criteria: string;
  explanation?: string;
}

interface ISearchUI {
  title: string;
  introduction: string;
  errorTextMessage: string;
  searchItems: Array<ISearchEntry>;
}




