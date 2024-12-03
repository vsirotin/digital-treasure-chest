import { Searcher } from './searcher';

describe('Searcher', () => {

  describe('isEven', () => {
    it('0, 2, 12, 248, 998 are even and not odd ', () => {
      expect(Searcher.isEven(2)).toBeTrue;
      expect(Searcher.isOdd(2)).toBeFalse();

      expect(Searcher.isEven(12)).toBeTrue;
      expect(Searcher.isOdd(12)).toBeFalse();

      expect(Searcher.isEven(248)).toBeTrue;
      expect(Searcher.isOdd(248)).toBeFalse();

      expect(Searcher.isEven(998)).toBeTrue;
      expect(Searcher.isOdd(998)).toBeFalse();
    });
  });

  describe('isOdd', () => {
    it('1, 3, 14, 249, 999 are even and not odd ', () => {
      expect(Searcher.isOdd(3)).toBeTrue;
      expect(Searcher.isEven(3)).toBeFalse();

      expect(Searcher.isOdd(13)).toBeTrue;
      expect(Searcher.isEven(13)).toBeFalse();

      expect(Searcher.isOdd(249)).toBeTrue;
      expect(Searcher.isEven(249)).toBeFalse();

      expect(Searcher.isOdd(999)).toBeTrue;
      expect(Searcher.isEven(999)).toBeFalse();
    });
  });

  describe('isPrime', () => {
    it('should return false for numbers less than  1', () => {
      expect(Searcher.isPrime(0)).toBeFalse();
    });

    it('should return true for prime numbers', () => {
      expect(Searcher.isPrime(1)).toBeTrue();
      expect(Searcher.isPrime(2)).toBeTrue();
      expect(Searcher.isPrime(3)).toBeTrue();
      expect(Searcher.isPrime(5)).toBeTrue();
      expect(Searcher.isPrime(7)).toBeTrue();
    });

    it('should return false for non-prime numbers', () => {
      expect(Searcher.isPrime(4)).toBeFalse();
      expect(Searcher.isPrime(6)).toBeFalse();
      expect(Searcher.isPrime(8)).toBeFalse();
      expect(Searcher.isPrime(9)).toBeFalse();
    });
  });

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

  describe('isPythagoreanPrime', () => {
    it('should return true for Pythagorean primes', () => {
      expect(Searcher.isPythagoreanPrime(5)).toBeTrue();
      expect(Searcher.isPythagoreanPrime(13)).toBeTrue();
      expect(Searcher.isPythagoreanPrime(17)).toBeTrue();
      expect(Searcher.isPythagoreanPrime(29)).toBeTrue();
    });

    it('should return false for non-Pythagorean primes', () => {
      expect(Searcher.isPythagoreanPrime(2)).toBeFalse();
      expect(Searcher.isPythagoreanPrime(3)).toBeFalse();
      expect(Searcher.isPythagoreanPrime(11)).toBeFalse();
      expect(Searcher.isPythagoreanPrime(19)).toBeFalse();
    });

    it('should return false for non-prime numbers', () => {
      expect(Searcher.isPythagoreanPrime(4)).toBeFalse();
      expect(Searcher.isPythagoreanPrime(6)).toBeFalse();
      expect(Searcher.isPythagoreanPrime(8)).toBeFalse();
      expect(Searcher.isPythagoreanPrime(9)).toBeFalse();
    });
  });

  describe('isFibbonacci', () => {
    it('should return true for Fibonacci numbers', () => {
      expect(Searcher.isFibbonacci(0)).toBeTrue();
      expect(Searcher.isFibbonacci(1)).toBeTrue();
      expect(Searcher.isFibbonacci(2)).toBeTrue();
      expect(Searcher.isFibbonacci(3)).toBeTrue();
      expect(Searcher.isFibbonacci(5)).toBeTrue();
      expect(Searcher.isFibbonacci(8)).toBeTrue();
      expect(Searcher.isFibbonacci(13)).toBeTrue();
    });

    it('should return false for non-Fibonacci numbers', () => {
      expect(Searcher.isFibbonacci(4)).toBeFalse();
      expect(Searcher.isFibbonacci(6)).toBeFalse();
      expect(Searcher.isFibbonacci(7)).toBeFalse();
      expect(Searcher.isFibbonacci(9)).toBeFalse();
    });
  });

  describe('isTribonnaci', () => {
    it('should return true for Tribonacci numbers', () => {
      expect(Searcher.isTribonnaci(0)).toBeTrue();
      expect(Searcher.isTribonnaci(1)).toBeTrue();
      expect(Searcher.isTribonnaci(2)).toBeTrue();
      expect(Searcher.isTribonnaci(4)).toBeTrue();
      expect(Searcher.isTribonnaci(7)).toBeTrue();
      expect(Searcher.isTribonnaci(13)).toBeTrue();
    });

    it('should return false for non-Tribonacci numbers', () => {
      expect(Searcher.isTribonnaci(3)).toBeFalse();
      expect(Searcher.isTribonnaci(5)).toBeFalse();
      expect(Searcher.isTribonnaci(6)).toBeFalse();
      expect(Searcher.isTribonnaci(8)).toBeFalse();
    });
  });

  describe('isBell', () => {
    it('should return true for Bell numbers', () => {
      expect(Searcher.isBell(15)).toBeTrue();
      expect(Searcher.isBell(52)).toBeTrue();
      expect(Searcher.isBell(203)).toBeTrue();
      expect(Searcher.isBell(877)).toBeTrue();
    }); 

    it('should return false for non-Bell numbers', () => {
      expect(Searcher.isBell(16)).toBeFalse();
      expect(Searcher.isBell(53)).toBeFalse();
      expect(Searcher.isBell(204)).toBeFalse();
      expect(Searcher.isBell(876)).toBeFalse();
    });
  });

  describe('isCatalan', () => {
    it('should return true for Catalan numbers', () => {
      expect(Searcher.isCatalan(14)).toBeTrue();
      expect(Searcher.isCatalan(42)).toBeTrue();
      expect(Searcher.isCatalan(132)).toBeTrue();
      expect(Searcher.isCatalan(429)).toBeTrue();
    }); 

    it('should return false for non-Catalan numbers', () => {
      expect(Searcher.isCatalan(15)).toBeFalse();
      expect(Searcher.isCatalan(43)).toBeFalse();
      expect(Searcher.isCatalan(133)).toBeFalse();
      expect(Searcher.isCatalan(430)).toBeFalse();
    });
  });

  describe('isSophieGermain', () => {
    it('should return true for Sophie Germain primes', () => {
      expect(Searcher.isSophieGermain(659)).toBeTrue();
      expect(Searcher.isSophieGermain(683)).toBeTrue();
      expect(Searcher.isSophieGermain(743)).toBeTrue();
      expect(Searcher.isSophieGermain(809)).toBeTrue();
    }); 

    it('should return false for non-Sophie Germain primes', () => {
      expect(Searcher.isSophieGermain(660)).toBeFalse();
      expect(Searcher.isSophieGermain(684)).toBeFalse();
      expect(Searcher.isSophieGermain(744)).toBeFalse();
      expect(Searcher.isSophieGermain(808)).toBeFalse();
    });
  });

  describe('isSymmetrical', () => {
    it('should return true for symmetrical numbers', () => {
      expect(Searcher.isSymmetrical(0)).toBeTrue();
      expect(Searcher.isSymmetrical(1)).toBeTrue();
      expect(Searcher.isSymmetrical(2)).toBeTrue();
      expect(Searcher.isSymmetrical(11)).toBeTrue();
      expect(Searcher.isSymmetrical(121)).toBeTrue();
    });

    it('should return false for non-symmetrical numbers', () => {
      expect(Searcher.isSymmetrical(32)).toBeFalse();
      expect(Searcher.isSymmetrical(14)).toBeFalse();
      expect(Searcher.isSymmetrical(123)).toBeFalse();
      expect(Searcher.isSymmetrical(523)).toBeFalse();
      expect(Searcher.isSymmetrical(1234)).toBeFalse();
    });
  });
});