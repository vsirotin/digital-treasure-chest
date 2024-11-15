import { Searcher } from './searcher';

describe('Searcher', () => {
  describe('isPrime', () => {
    it('should return false for numbers less than or equal to 1', () => {
      expect(Searcher.isPrime(0)).toBeFalse();
      expect(Searcher.isPrime(1)).toBeFalse();
    });

    it('should return true for prime numbers', () => {
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
});