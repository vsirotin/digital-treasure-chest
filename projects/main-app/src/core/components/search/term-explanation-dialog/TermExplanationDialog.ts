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

  termExplanations?: ITermExplanation[];
  title: string = '';
  prefixToLink: string = '';

  setData(data: ISearcherUI): void {
    this.termExplanations = data.explanations;
    this.title = data.title;
    this.prefixToLink = data.prefixToLink;
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
