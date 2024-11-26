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
});