import { Component } from '@angular/core';
import { Chest } from '../../../shared/classes/chest';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import * as uiDefault from '../../../assets/languages/core/components/report/lang/1/en-US.json';
import { ILocalizationClient, ILocalizer, LocalizerFactory } from '@vsirotin/localizer';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent implements ILocalizationClient<IReportUI> {
  numbers: string = "";
  numbersIsEmpty: boolean = true;

  ui: IReportUI = (uiDefault as any).default;

  baseHref: string = environment.baseHref;
  private localizer: ILocalizer;
  private chest: Chest = Chest.instance;

  constructor() { 
    this.localizer = LocalizerFactory.createLocalizer<IReportUI>("assets/languages/core/components/report/lang", 1, this.ui, this);
    this.updateNumbers(this.chest.getItems());
    this.chest.chestChanged$.subscribe((items: number[]) => {
      this.updateNumbers(items);
    });
  }
  updateLocalization(data: IReportUI): void {
    this.ui = data;
  }

  private updateNumbers(items: number[]) {
    this.numbersIsEmpty = items.length == 0;
    this.numbers = items.join(", ");
  }
}

interface IReportUI {
  sertificate: string;
  line1: string;
  line2: string;
  line3: string;
  signature: string;
  textForEmptyChest: string;
}
