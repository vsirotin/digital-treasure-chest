
export class NumberExpert {

  private static primeNumbers: Set<number> = new Set<number>([1, 2, 3, 5, 7, 11, 13, 17, 19,
    23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97,
    101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199,
    211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293,
    307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397,
    401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499,
    503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599,
    601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691,
    701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797,
    809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887,
    907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997]);

  private static pythagorasPrimeNumbers: Set<number> = new Set<number>([1, 5, 13, 17,
    29, 37, 41, 53, 61, 73, 89, 97,
    101, 109, 113, 137, 149, 157, 173, 181, 193, 197,
    229, 233, 241, 257, 269, 277, 281, 293,
    313, 317, 337, 349, 353, 373, 389, 397,
    401, 409, 421, 433, 449, 457, 461,
    509, 521, 541, 557, 569, 577, 593,
    601, 613, 617, 641, 653, 661, 673, 677,
    701, 709, 733, 757, 761, 769, 773, 797,
    809, 821, 829, 853, 857, 877, 881,
    929, 937, 941, 953, 977, 997]);

  private static fibbonacciNumbers: Set<number> = new Set<number>([0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987]);

  private static tribonnaciNumbers: Set<number> = new Set<number>([0, 1, 2, 4, 7, 13, 24, 44, 81, 149, 274, 504, 927]);

  private static bellNumbers: Set<number> = new Set<number>([1, 2, 5, 15, 52, 203, 877]);

  private static catalanNumbers: Set<number> = new Set<number>([1, 2, 5, 14, 42, 132, 429]);
  private static sophieGermainNumbers: Set<number> = new Set<number>([2, 3, 5, 11, 23, 29, 41, 53, 83, 89, 113, 131, 173, 179, 191,
    233, 239, 251, 281, 293, 359, 419, 431, 443, 491,
    509, 593, 641, 653, 659, 683, 719, 743, 761, 809, 911, 953]);

  private static symmetricalNumbers: Set<number> = new Set<number>(
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
      11, 22, 33, 44, 55, 66, 77, 88, 99,
      101, 111, 121, 131, 141, 151, 161, 171, 181, 191,
      202, 212, 222, 232, 242, 252, 262, 272, 282, 292,
      303, 313, 323, 333, 343, 353, 363, 373, 383, 393,
      404, 414, 424, 434, 444, 454, 464, 474, 484, 494,
      505, 515, 525, 535, 545, 555, 565, 575, 585, 595,
      606, 616, 626, 636, 646, 656, 666, 676, 686, 696,
      707, 717, 727, 737, 747, 757, 767, 777, 787, 797,
      808, 818, 828, 838, 848, 858, 868, 878, 888, 898,
      909, 919, 929, 939, 949, 959, 969, 979, 989, 999]);

  static isEven(i: number): boolean {
    return i % 2 == 0;
  }

  static isOdd(i: number): boolean {
    return !NumberExpert.isEven(i);
  }

  static isPythagoreanPrime(i: number): boolean {
    return NumberExpert.pythagorasPrimeNumbers.has(i);
  }
  static isPrime(i: number): boolean {
    return NumberExpert.primeNumbers.has(i);
  }
  static isFibbonacci(i: number): boolean {
    return NumberExpert.fibbonacciNumbers.has(i);
  }
  static isTribonnaci(i: number): boolean {
    return NumberExpert.tribonnaciNumbers.has(i);
  }
  static isBell(i: number): boolean {
    return NumberExpert.bellNumbers.has(i);
  }
  static isCatalan(i: number): boolean {
    return NumberExpert.catalanNumbers.has(i);
  }
  static isSophieGermain(i: number): boolean {
    return NumberExpert.sophieGermainNumbers.has(i);
  }
  static isSymmetrical(i: number): boolean {
    return NumberExpert.symmetricalNumbers.has(i);
  }
}
