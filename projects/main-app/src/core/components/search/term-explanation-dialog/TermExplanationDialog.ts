import { Component, ChangeDetectionStrategy} from "@angular/core";
import { MatListModule } from '@angular/material/list';import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";



@Component({
  selector: './term-explanation-dialog',
  templateUrl: './term-explanation-dialog.html',
  standalone: true,
  imports: [MatListModule, MatDialogModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './term-explanation-dialog.css',
})
export class TermExplanationDialog {

  private dialogData: ISearcherUI = {
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

  termExplanations?: ITermExplanation[];
  title: string = '';
  prefixToLink: string = '';

  constructor() {
    //TODO use current language to set the dialog language
    //this.dialogData = dialogData;
    this.termExplanations = this.dialogData.explanations;
    this.title = this.dialogData.title;
    this.prefixToLink = this.dialogData.prefixToLink;
  }
}

export interface ITermExplanation {
  term: string;
  explanation: string;
}

export interface ISearcherUI {
  title: string;
  explanations: ITermExplanation[];
  prefixToLink: string;
}
