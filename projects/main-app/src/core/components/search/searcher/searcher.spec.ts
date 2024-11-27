import { ISearcher, Searcher } from './searcher';

describe('Searcher', () => {

  let searcher: ISearcher;

  beforeEach(() => {
    searcher = Searcher.getSearcher();
  });
  describe('isPrime', () => {
    it('should return false for numbers less than  1', () => {
      expect(searcher.isPrime(0)).toBeFalse();
    });

    it('should return true for prime numbers', () => {
      expect(searcher.isPrime(1)).toBeTrue();
      expect(searcher.isPrime(2)).toBeTrue();
      expect(searcher.isPrime(3)).toBeTrue();
      expect(searcher.isPrime(5)).toBeTrue();
      expect(searcher.isPrime(7)).toBeTrue();
    });

    it('should return false for non-prime numbers', () => {
      expect(searcher.isPrime(4)).toBeFalse();
      expect(searcher.isPrime(6)).toBeFalse();
      expect(searcher.isPrime(8)).toBeFalse();
      expect(searcher.isPrime(9)).toBeFalse();
    });
  });

  describe('search', () => {
    const emptyArray: number[] = [];
    it('should return empty array by false interval', () => {
      expect(searcher.search(5,4, emptyArray).length).toBe(0);
    });

    it('should return 1 element by interval 5 and odd criteria', () => {
      const criteriaIndexies: number[] = [1]; 
      const res = searcher.search(5, 5, criteriaIndexies);
     
      expect(res.length).toBe(1);
      expect(res[0]).toBe(5);
    });

    it('should return 1 element by interval 5 and odd criteria', () => {
      const criteriaIndexies: number[] = [1]; 
      const res = searcher.search(5, 5, criteriaIndexies);
      expect(res.length).toBe(1);
      expect(res[0]).toBe(5);
    });

    it('should return 1 element by interval 977-989 and criteria: pythagorasPrimeNumbers, fibbonacciNumbers, symmetricalNumbers', () => {
      const criteriaIndexies: number[] = [3, 4, 9]; 
      const res = searcher.search(977, 989, criteriaIndexies);
      console.log("rs=", res);
      expect(res.length).toBe(4);
      expect(res[0]).toBe(977);
      expect(res[1]).toBe(979); 
      expect(res[2]).toBe(987);
      expect(res[3]).toBe(989);
    });

    
  });

  describe('isPythagoreanPrime', () => {
    it('should return true for Pythagorean primes', () => {
      expect(searcher.isPythagoreanPrime(5)).toBeTrue();
      expect(searcher.isPythagoreanPrime(13)).toBeTrue();
      expect(searcher.isPythagoreanPrime(17)).toBeTrue();
      expect(searcher.isPythagoreanPrime(29)).toBeTrue();
    });

    it('should return false for non-Pythagorean primes', () => {
      expect(searcher.isPythagoreanPrime(2)).toBeFalse();
      expect(searcher.isPythagoreanPrime(3)).toBeFalse();
      expect(searcher.isPythagoreanPrime(11)).toBeFalse();
      expect(searcher.isPythagoreanPrime(19)).toBeFalse();
    });

    it('should return false for non-prime numbers', () => {
      expect(searcher.isPythagoreanPrime(4)).toBeFalse();
      expect(searcher.isPythagoreanPrime(6)).toBeFalse();
      expect(searcher.isPythagoreanPrime(8)).toBeFalse();
      expect(searcher.isPythagoreanPrime(9)).toBeFalse();
    });
  });

  describe('isFibbonacci', () => {
    it('should return true for Fibonacci numbers', () => {
      expect(searcher.isFibbonacci(0)).toBeTrue();
      expect(searcher.isFibbonacci(1)).toBeTrue();
      expect(searcher.isFibbonacci(2)).toBeTrue();
      expect(searcher.isFibbonacci(3)).toBeTrue();
      expect(searcher.isFibbonacci(5)).toBeTrue();
      expect(searcher.isFibbonacci(8)).toBeTrue();
      expect(searcher.isFibbonacci(13)).toBeTrue();
    });

    it('should return false for non-Fibonacci numbers', () => {
      expect(searcher.isFibbonacci(4)).toBeFalse();
      expect(searcher.isFibbonacci(6)).toBeFalse();
      expect(searcher.isFibbonacci(7)).toBeFalse();
      expect(searcher.isFibbonacci(9)).toBeFalse();
    });
  });

  describe('isTribonnaci', () => {
    it('should return true for Tribonacci numbers', () => {
      expect(searcher.isTribonnaci(0)).toBeTrue();
      expect(searcher.isTribonnaci(1)).toBeTrue();
      expect(searcher.isTribonnaci(2)).toBeTrue();
      expect(searcher.isTribonnaci(4)).toBeTrue();
      expect(searcher.isTribonnaci(7)).toBeTrue();
      expect(searcher.isTribonnaci(13)).toBeTrue();
    });

    it('should return false for non-Tribonacci numbers', () => {
      expect(searcher.isTribonnaci(3)).toBeFalse();
      expect(searcher.isTribonnaci(5)).toBeFalse();
      expect(searcher.isTribonnaci(6)).toBeFalse();
      expect(searcher.isTribonnaci(8)).toBeFalse();
    });
  });

  describe('isBell', () => {
    it('should return true for Bell numbers', () => {
      expect(searcher.isBell(15)).toBeTrue();
      expect(searcher.isBell(52)).toBeTrue();
      expect(searcher.isBell(203)).toBeTrue();
      expect(searcher.isBell(877)).toBeTrue();
    }); 

    it('should return false for non-Bell numbers', () => {
      expect(searcher.isBell(16)).toBeFalse();
      expect(searcher.isBell(53)).toBeFalse();
      expect(searcher.isBell(204)).toBeFalse();
      expect(searcher.isBell(876)).toBeFalse();
    });
  });

  describe('isCatalan', () => {
    it('should return true for Catalan numbers', () => {
      expect(searcher.isCatalan(14)).toBeTrue();
      expect(searcher.isCatalan(42)).toBeTrue();
      expect(searcher.isCatalan(132)).toBeTrue();
      expect(searcher.isCatalan(429)).toBeTrue();
    }); 

    it('should return false for non-Catalan numbers', () => {
      expect(searcher.isCatalan(15)).toBeFalse();
      expect(searcher.isCatalan(43)).toBeFalse();
      expect(searcher.isCatalan(133)).toBeFalse();
      expect(searcher.isCatalan(430)).toBeFalse();
    });
  });

  describe('isSophieGermain', () => {
    it('should return true for Sophie Germain primes', () => {
      expect(searcher.isSophieGermain(659)).toBeTrue();
      expect(searcher.isSophieGermain(683)).toBeTrue();
      expect(searcher.isSophieGermain(743)).toBeTrue();
      expect(searcher.isSophieGermain(809)).toBeTrue();
    }); 

    it('should return false for non-Sophie Germain primes', () => {
      expect(searcher.isSophieGermain(660)).toBeFalse();
      expect(searcher.isSophieGermain(684)).toBeFalse();
      expect(searcher.isSophieGermain(744)).toBeFalse();
      expect(searcher.isSophieGermain(808)).toBeFalse();
    });
  });

  describe('isSymmetrical', () => {
    it('should return true for symmetrical numbers', () => {
      expect(searcher.isSymmetrical(0)).toBeTrue();
      expect(searcher.isSymmetrical(1)).toBeTrue();
      expect(searcher.isSymmetrical(2)).toBeTrue();
      expect(searcher.isSymmetrical(11)).toBeTrue();
      expect(searcher.isSymmetrical(121)).toBeTrue();
    });

    it('should return false for non-symmetrical numbers', () => {
      expect(searcher.isSymmetrical(32)).toBeFalse();
      expect(searcher.isSymmetrical(14)).toBeFalse();
      expect(searcher.isSymmetrical(123)).toBeFalse();
      expect(searcher.isSymmetrical(523)).toBeFalse();
      expect(searcher.isSymmetrical(1234)).toBeFalse();
    });
  });
});