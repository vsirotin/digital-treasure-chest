import { ChangeDetectionStrategy, Component, inject, ViewChild } from '@angular/core';
import { MatListModule, MatSelectionListChange, MatSelectionList } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ISearcherUI, ITermExplanation, TermExplanationDialog } from './term-explanation-dialog/TermExplanationDialog';
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
    MatAccordion, 
    MatExpansionModule,
    MatCardModule,
    MatProgressBarModule,
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
    resultTitle: 'Your Digital Treasure Chet contain now the following numbers:',
    noResults: 'No numbers selected',
    listNumbersInTreasure: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    searchTitle: 'Search new numbers for your Digital Treasure Chet',
    introduction: 'Please select a criterions for search your favorite positive integer numbers (denoted below as X)',
    prefix: "It is ",
    errorTextMessage: 'Minimum and maximum values should be both positive integers less or equal 1000. Minimum value must be less than or equal to maximum value.',
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

  errorText = '';


 

  minValue: number = 0; // Initial minimum value
  maxValue: number = 1000; // Initial maximum value
  isIntervalValid: boolean = false; // Error flag for interval validation

  onOptionClick(criterion: string): void {
    // Your function logic here
    console.log('Option clicked:', criterion);
  }

  readonly dialog = inject(MatDialog);
  @ViewChild('criteria') criteriaList!: MatSelectionList;

  openDialog(): void {
    const dialogRef = this.dialog.open(TermExplanationDialog)

    const dialogData: ISearcherUI = {
      title: 'Terms explanation',
      explanations: [
        { term: 'Prime number', explanation: 'A prime number is a natural number greater than 1 that is not a product of two smaller natural numbers. A natural number greater than 1 that is not prime is called a composite number.' },
        { term: 'Pythagorean prime number', explanation: 'A Pythagorean prime is a prime number of the form 4n + 1. Pythagorean primes are exactly the odd prime numbers p for which 2 is a primitive root modulo p.' },
        { term: 'Fibbonacci numbers', explanation: 'A sequence in which each number is the sum of the two preceding ones' },
        { term: 'Tribonnaci numbers', explanation: 'A sequence of natural numbers that originally starts with the number 0 once and the number 1 twice. Subsequently, the sum of the three preceding numbers results in the number immediately following: T0=0, T1=T2=1, Tn=Tn-1 + Tn-2 + Tn-3' },
        { term: 'Bell numbers', explanation: 'Bell number is the number of all unordered partitions of an n-element set, denoted by Bn, with B0=1 assumed by definition. Named after Eric Bell, who studied them in the 1930s.' },
        { term: 'Catalan Numbers', explanation: 'Catalan numbers is a numerical sequence found in many combinatorial problems. They are named in honor of the Belgian mathematician Eugène Charles Catalan, although they were known to Leonard Euler.The nth Catalan number Cn can be defined in several equivalent ways, such as: 1) The number of partitions of a convex (n+2)-gon into triangles by non-intersecting diagonals. 2) The number of ways to connect 2n points on a circle of n by non-intersecting chords, etc.' },
        { term: 'Sophie Germain numbers', explanation: 'A prime number Sophie Germain is such a prime number p that the number 2p+1 is also prime. The number 2p+1 associated with the prime number Sophie Germain is called a safe prime number. For example, 11 is Sophie Germain prime number, and 2 × 11 + 1 = 23 is the associated safe prime number.' },
        { term: 'Symmetrical numbers', explanation: 'Symmetric numbers are 1) all one-digit numbers, 2) two-digit numbers of the form xx, and 3) three-digit numbers of the form xyx, where x, y are digits, and x cannot be 0.' }
      ],
      prefixToLink: 'More intersting information about magic numbers sequences see in Wikipedia and on site  '
    }
    dialogRef.componentInstance.setData(dialogData);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onSelectionChange(event: MatSelectionListChange): void {
    const criterionIds = this.criteriaList.selectedOptions.selected
      .map(option => option.value.id).sort((a, b) => a - b);
    console.log('Selected option:', criterionIds);
    // Perform any additional actions based on the selected option
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
  id: number;
  criteria: string;
  explanation?: string;
}

interface ISearchUI {
  resultTitle: string;
  listNumbersInTreasure: Array<number>;
  noResults: string;
  searchTitle: string;
  introduction: string;
  prefix: string;
  errorTextMessage: string;
  termExplanation: string;
  criteria: Array<ISearchEntry>;
}




