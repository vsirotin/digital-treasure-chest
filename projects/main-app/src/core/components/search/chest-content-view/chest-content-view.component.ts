import { Component } from '@angular/core';
import { Chest } from '../../../../shared/classes/chest';
import { MatCardModule } from '@angular/material/card';
import { NumberExpert } from '../../../classes/number-expert/number-expert';
import { NumberPropertiesNameHolder } from '../../../classes/number-expert/number-properties-name-holder';

@Component({
  selector: 'app-chet-content-view',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './chest-content-view.component.html',
  styleUrl: './chest-content-view.component.css'
})
export class ChetContentViewComponent {

  ui: IChetViewUI = {
    resultTitle: 'Your Digital Treasure Chest contain now the following numbers:',
    noResultsTitle: 'No items in your chest yet.',
    listNumbersInTreasure: [],
    clearButtonTitle: 'Clear the chest'
  };

  isClearButtonEnabled: boolean = false;
  prefix: string = NumberPropertiesNameHolder.criteriaPrefix;

  constructor() { 
    Chest.chestChanged$.subscribe((items: number[]) => {
      this.ui.listNumbersInTreasure = items;
      this.isClearButtonEnabled = items.length > 0;
    });
    //TODO add subscription to the event of the language change for prefix
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
  listNumbersInTreasure: number[];
  clearButtonTitle: string;
}