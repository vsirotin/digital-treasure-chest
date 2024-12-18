import { NumberExpert } from "../number-expert/number-expert";


export class Searcher  {
  
  /**
   * Search for numbers that match the criteria accordin AND logic.
   * @param minValue 
   * @param maxValue 
   * @param criteriaIndexies 
   * @returns 
   */
  static search(minValue: number, maxValue: number, criteriaIndexies: number[]): number[] {
    if(criteriaIndexies.length == 0) {
      return  [];
    };
    let result = new Set<number>();
    for (let i = minValue; i <= maxValue; i++) {
      let isMatch = true;
      for (let j = 0; j < criteriaIndexies.length; j++) {
        switch (criteriaIndexies[j]) {
          // this and other checks below using NOT logic.
          case 1:
            if (!NumberExpert.isEven(i)) { //even number
              isMatch = false;
            }
            break;
          case 2:
            if (!NumberExpert.isOdd(i)) { //odd number
              isMatch = false;
            }
            break;
          case 3:
            if (!NumberExpert.isPrime(i)) {
              isMatch = false;
            }
            break;
          case 4:
            if (!NumberExpert.isPythagoreanPrime(i)) {
              isMatch = false;
            }
            break;
          case 5:
            if (!NumberExpert.isFibbonacci(i)) {
              isMatch = false;
            }
            break;
          case 6:
            if (!NumberExpert.isTribonnaci(i)) {
              isMatch = false;
            }
            break;
          case 7:
            if (!NumberExpert.isBell(i)) {
              isMatch = false;
            }
            break;
          case 8:
            if (!NumberExpert.isCatalan(i)) {
              isMatch = false;
            }
            break;
          case 9:
            if (!NumberExpert.isSophieGermain(i)) {
              isMatch = false;
            }
            break;
          case 10:
            if (!NumberExpert.isSymmetrical(i)) {
              isMatch = false;
            }
            break;
          default:
            break;
        } //end of switch
        if (!isMatch) {
          break;
        }
      }//end of for j
      if (isMatch) {
        result.add(i);
      }
    }
    return Array.from(result).sort((a, b) => a - b);
  }; //end of search
}
