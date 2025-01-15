import { Component, ChangeDetectionStrategy} from "@angular/core";
import { MatListModule } from '@angular/material/list';import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import * as uiDefault from '../../../../assets/languages/core/components/search/term-explanation-dialog/lang/1/en-US.json';
import { ILocalizationClient, ILocalizer, LocalizerFactory } from '@vsirotin/localizer';



@Component({
  selector: './term-explanation-dialog',
  templateUrl: './term-explanation-dialog.html',
  standalone: true,
  imports: [MatListModule, MatDialogModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './term-explanation-dialog.css',
})
export class TermExplanationDialog implements ILocalizationClient<ITermExplanationUI> {

  ui: ITermExplanationUI = (uiDefault as any).default;

  private localizer: ILocalizer;

  constructor() {
    this.localizer = LocalizerFactory.createLocalizer<ITermExplanationUI>("assets/languages/core/components/search/term-explanation-dialog/lang", 1, this.ui, this);
  }
  updateLocalization(data: ITermExplanationUI): void {
   this.ui = data;
  }
}

export interface ITermExplanation {
  term: string;
  explanation: string;
}

export interface ITermExplanationUI {
  title: string;
  explanations: ITermExplanation[];
  prefixToLink: string;
}
