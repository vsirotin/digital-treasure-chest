import { NumberExpert } from './number-expert';

describe('NumberExpert', () => {

  describe('isEven', () => {
    it('0, 2, 12, 248, 998 are even and not odd ', () => {
      expect(NumberExpert.isEven(2)).toBeTrue;
      expect(NumberExpert.isOdd(2)).toBeFalse();

      expect(NumberExpert.isEven(12)).toBeTrue;
      expect(NumberExpert.isOdd(12)).toBeFalse();

      expect(NumberExpert.isEven(248)).toBeTrue;
      expect(NumberExpert.isOdd(248)).toBeFalse();

      expect(NumberExpert.isEven(998)).toBeTrue;
      expect(NumberExpert.isOdd(998)).toBeFalse();
    });
  });

  describe('isOdd', () => {
    it('1, 3, 14, 249, 999 are even and not odd ', () => {
      expect(NumberExpert.isOdd(3)).toBeTrue;
      expect(NumberExpert.isEven(3)).toBeFalse();

      expect(NumberExpert.isOdd(13)).toBeTrue;
      expect(NumberExpert.isEven(13)).toBeFalse();

      expect(NumberExpert.isOdd(249)).toBeTrue;
      expect(NumberExpert.isEven(249)).toBeFalse();

      expect(NumberExpert.isOdd(999)).toBeTrue;
      expect(NumberExpert.isEven(999)).toBeFalse();
    });
  });

  describe('isPrime', () => {
    it('should return false for numbers less than  1', () => {
      expect(NumberExpert.isPrime(0)).toBeFalse();
    });

    it('should return true for prime numbers', () => {
      expect(NumberExpert.isPrime(1)).toBeTrue();
      expect(NumberExpert.isPrime(2)).toBeTrue();
      expect(NumberExpert.isPrime(3)).toBeTrue();
      expect(NumberExpert.isPrime(5)).toBeTrue();
      expect(NumberExpert.isPrime(7)).toBeTrue();
    });

    it('should return false for non-prime numbers', () => {
      expect(NumberExpert.isPrime(4)).toBeFalse();
      expect(NumberExpert.isPrime(6)).toBeFalse();
      expect(NumberExpert.isPrime(8)).toBeFalse();
      expect(NumberExpert.isPrime(9)).toBeFalse();
    });
  });

  describe('isPythagoreanPrime', () => {
    it('should return true for Pythagorean primes', () => {
      expect(NumberExpert.isPythagoreanPrime(5)).toBeTrue();
      expect(NumberExpert.isPythagoreanPrime(13)).toBeTrue();
      expect(NumberExpert.isPythagoreanPrime(17)).toBeTrue();
      expect(NumberExpert.isPythagoreanPrime(29)).toBeTrue();
    });

    it('should return false for non-Pythagorean primes', () => {
      expect(NumberExpert.isPythagoreanPrime(2)).toBeFalse();
      expect(NumberExpert.isPythagoreanPrime(3)).toBeFalse();
      expect(NumberExpert.isPythagoreanPrime(11)).toBeFalse();
      expect(NumberExpert.isPythagoreanPrime(19)).toBeFalse();
    });

    it('should return false for non-prime numbers', () => {
      expect(NumberExpert.isPythagoreanPrime(4)).toBeFalse();
      expect(NumberExpert.isPythagoreanPrime(6)).toBeFalse();
      expect(NumberExpert.isPythagoreanPrime(8)).toBeFalse();
      expect(NumberExpert.isPythagoreanPrime(9)).toBeFalse();
    });
  });

  describe('isFibbonacci', () => {
    it('should return true for Fibonacci numbers', () => {
      expect(NumberExpert.isFibbonacci(0)).toBeTrue();
      expect(NumberExpert.isFibbonacci(1)).toBeTrue();
      expect(NumberExpert.isFibbonacci(2)).toBeTrue();
      expect(NumberExpert.isFibbonacci(3)).toBeTrue();
      expect(NumberExpert.isFibbonacci(5)).toBeTrue();
      expect(NumberExpert.isFibbonacci(8)).toBeTrue();
      expect(NumberExpert.isFibbonacci(13)).toBeTrue();
    });

    it('should return false for non-Fibonacci numbers', () => {
      expect(NumberExpert.isFibbonacci(4)).toBeFalse();
      expect(NumberExpert.isFibbonacci(6)).toBeFalse();
      expect(NumberExpert.isFibbonacci(7)).toBeFalse();
      expect(NumberExpert.isFibbonacci(9)).toBeFalse();
    });
  });

  describe('isTribonnaci', () => {
    it('should return true for Tribonacci numbers', () => {
      expect(NumberExpert.isTribonnaci(0)).toBeTrue();
      expect(NumberExpert.isTribonnaci(1)).toBeTrue();
      expect(NumberExpert.isTribonnaci(2)).toBeTrue();
      expect(NumberExpert.isTribonnaci(4)).toBeTrue();
      expect(NumberExpert.isTribonnaci(7)).toBeTrue();
      expect(NumberExpert.isTribonnaci(13)).toBeTrue();
    });

    it('should return false for non-Tribonacci numbers', () => {
      expect(NumberExpert.isTribonnaci(3)).toBeFalse();
      expect(NumberExpert.isTribonnaci(5)).toBeFalse();
      expect(NumberExpert.isTribonnaci(6)).toBeFalse();
      expect(NumberExpert.isTribonnaci(8)).toBeFalse();
    });
  });

  describe('isBell', () => {
    it('should return true for Bell numbers', () => {
      expect(NumberExpert.isBell(15)).toBeTrue();
      expect(NumberExpert.isBell(52)).toBeTrue();
      expect(NumberExpert.isBell(203)).toBeTrue();
      expect(NumberExpert.isBell(877)).toBeTrue();
    }); 

    it('should return false for non-Bell numbers', () => {
      expect(NumberExpert.isBell(16)).toBeFalse();
      expect(NumberExpert.isBell(53)).toBeFalse();
      expect(NumberExpert.isBell(204)).toBeFalse();
      expect(NumberExpert.isBell(876)).toBeFalse();
    });
  });

  describe('isCatalan', () => {
    it('should return true for Catalan numbers', () => {
      expect(NumberExpert.isCatalan(14)).toBeTrue();
      expect(NumberExpert.isCatalan(42)).toBeTrue();
      expect(NumberExpert.isCatalan(132)).toBeTrue();
      expect(NumberExpert.isCatalan(429)).toBeTrue();
    }); 

    it('should return false for non-Catalan numbers', () => {
      expect(NumberExpert.isCatalan(15)).toBeFalse();
      expect(NumberExpert.isCatalan(43)).toBeFalse();
      expect(NumberExpert.isCatalan(133)).toBeFalse();
      expect(NumberExpert.isCatalan(430)).toBeFalse();
    });
  });

  describe('isSophieGermain', () => {
    it('should return true for Sophie Germain primes', () => {
      expect(NumberExpert.isSophieGermain(659)).toBeTrue();
      expect(NumberExpert.isSophieGermain(683)).toBeTrue();
      expect(NumberExpert.isSophieGermain(743)).toBeTrue();
      expect(NumberExpert.isSophieGermain(809)).toBeTrue();
    }); 

    it('should return false for non-Sophie Germain primes', () => {
      expect(NumberExpert.isSophieGermain(660)).toBeFalse();
      expect(NumberExpert.isSophieGermain(684)).toBeFalse();
      expect(NumberExpert.isSophieGermain(744)).toBeFalse();
      expect(NumberExpert.isSophieGermain(808)).toBeFalse();
    });
  });

  describe('isSymmetrical', () => {
    it('should return true for symmetrical numbers', () => {
      expect(NumberExpert.isSymmetrical(0)).toBeTrue();
      expect(NumberExpert.isSymmetrical(1)).toBeTrue();
      expect(NumberExpert.isSymmetrical(2)).toBeTrue();
      expect(NumberExpert.isSymmetrical(11)).toBeTrue();
      expect(NumberExpert.isSymmetrical(121)).toBeTrue();
    });

    it('should return false for non-symmetrical numbers', () => {
      expect(NumberExpert.isSymmetrical(32)).toBeFalse();
      expect(NumberExpert.isSymmetrical(14)).toBeFalse();
      expect(NumberExpert.isSymmetrical(123)).toBeFalse();
      expect(NumberExpert.isSymmetrical(523)).toBeFalse();
      expect(NumberExpert.isSymmetrical(1234)).toBeFalse();
    });
  });
});