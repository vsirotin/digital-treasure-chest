import { Component, ChangeDetectionStrategy} from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";



@Component({
  selector: './term-explanation-dialog',
  templateUrl: './term-explanation-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TermExplanationDialog {
  term: string = "";


  setData(data: ITermExplanationDialogData): void {
    this.term = data.term;
  }
}

export interface ITermExplanationDialogData {
  lang: string;
  term: string;
}
