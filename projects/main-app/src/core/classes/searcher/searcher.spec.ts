import { Searcher } from './searcher';

describe('Searcher', () => {

  describe('search', () => {
    const emptyArray: number[] = [];
    it('should return empty array by false interval', () => {
      expect(Searcher.search(5,4, emptyArray).length).toBe(0);
    });

    it('should return 1 element by interval 5 and odd criteria', () => {
      const criteriaIndexies: number[] = [2]; 
      const res = Searcher.search(5, 5, criteriaIndexies);
     
      expect(res.length).toBe(1);
      expect(res[0]).toBe(5);
    });

    it('should return 1 element by interval 5 and odd criteria', () => {
      const criteriaIndexies: number[] = [2]; 
      const res = Searcher.search(5, 5, criteriaIndexies);
      expect(res.length).toBe(1);
      expect(res[0]).toBe(5);
    });

    it('should return 2 elements by interval 977-989 and criteria: odd numbers, symmetricalNumbers', () => {
      const criteriaIndexies: number[] = [2, 10]; 
      const res = Searcher.search(977, 989, criteriaIndexies);
      expect(res.length).toBe(2);
      expect(res[0]).toBe(979); 
      expect(res[1]).toBe(989);
    });

    it('should return 3 elements by interval 0-10 and criteria: primeNumbers, pythagorasPrimeNumbers, bellNumbers, catalanNumbers', () => {
      const criteriaIndexies: number[] = [3, 5, 7, 8]; 
      const res = Searcher.search(0, 10, criteriaIndexies);
      expect(res.length).toBe(3);
      expect(res[0]).toBe(1); 
      expect(res[1]).toBe(2);
      expect(res[2]).toBe(5);
    });
  });
});