import { Component } from '@angular/core';
import { Chest } from '../../../../shared/classes/chest';
import { MatCardModule } from '@angular/material/card';
import { NumberExpert } from '../../../classes/number-expert/number-expert';
import { NumberPropertiesNameHolder } from '../../../classes/number-expert/number-properties-name-holder';
import * as uiDefault from '../../../../assets/languages/core/components/search/chest-content-view/lang/1/en-US.json';
import { ILocalizationClient, ILocalizer, LocalizerFactory } from '@vsirotin/localizer';

@Component({
  selector: 'app-chet-content-view',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './chest-content-view.component.html',
  styleUrl: './chest-content-view.component.css'
})
export class ChetContentViewComponent implements ILocalizationClient<IChetViewUI> {

  ui: IChetViewUI = (uiDefault as any).default;

  listNumbersInTreasure: number[] = [];

  isClearButtonEnabled: boolean = false;
  prefix: string = NumberPropertiesNameHolder.criteriaPrefix;

  private localizer: ILocalizer;

  constructor() { 

    this.localizer = LocalizerFactory.createLocalizer<IChetViewUI>("assets/languages/core/components/search/chest-content-view/lang", 1, this.ui, this);

    Chest.chestChanged$.subscribe((items: number[]) => {
      this.listNumbersInTreasure = items;
      this.isClearButtonEnabled = items.length > 0;
    });
  }
  updateLocalization(data: IChetViewUI): void {
    this.ui = data;
  }

  getItemDetails(item: number): string[] {
    const result : string[] = [];
    NumberPropertiesNameHolder.criteriaIndexedList.forEach((pair) => {

      const id = pair.id;
      if ((id == 1) && (NumberExpert.isEven(item))) {
        result.push(this.generatePropertyString(pair.criteria));
      }

      if ((id == 2) && (NumberExpert.isOdd(item))) {
        result.push(this.generatePropertyString(pair.criteria));
      }

      if ((id == 3) && (NumberExpert.isPrime(item))) {
        result.push(this.generatePropertyString(pair.criteria));
      }

      if ((id == 4) && (NumberExpert.isPythagoreanPrime(item))) {
        result.push(this.generatePropertyString(pair.criteria));
      }

      if ((id == 5) && (NumberExpert.isFibbonacci(item))) {
        result.push(this.generatePropertyString(pair.criteria));
      }

      if ((id == 6) && (NumberExpert.isTribonnaci(item))) {
        result.push(this.generatePropertyString(pair.criteria));
      }

      if ((id == 7) && (NumberExpert.isBell(item))) {
        result.push(this.generatePropertyString(pair.criteria));
      }

      if ((id == 8) && (NumberExpert.isCatalan(item))) {
        result.push(this.generatePropertyString(pair.criteria));
      }

      if ((id == 9) && (NumberExpert.isSophieGermain(item))) {
        result.push(this.generatePropertyString(pair.criteria));
      }

      if ((id == 10) && (NumberExpert.isSymmetrical(item))) {
        result.push(this.generatePropertyString(pair.criteria));
      }

    }); //end of forEach

    return result;
  }

  private tryAddPropertyInArray(index: number, item: number, pair: { id: number; criteria: string; }, result: string[]) {
    if ((pair.id == index) && (NumberExpert.isEven(item))) {
      result.push(this.generatePropertyString(pair.criteria));
    }
  }

  clearChest() {
    Chest.replaceCurrentItemsWithNew([]);
  }

  generatePropertyString(criteria: string): string {
    //return NumberPropertiesNameHolder.criteriaPrefix + " " + criteria;
    return criteria;
  }

}
export interface IChetViewUI {
  resultTitle: string;
  noResultsTitle: string;
  clearButtonTitle: string;
}