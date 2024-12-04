import { BehaviorSubject, skip, take } from 'rxjs';
import { Chest } from './chest';
import { LoggerFactory } from '@vsirotin/log4ts';

describe('Chest', () => {

  beforeEach(() => {
    Chest.items.clear(); // Clear items before each test
  });

  it('should return items as an array', () => {
    Chest.addItems([1, 2, 3]);
    expect(Chest.getItems()).toEqual([1, 2, 3]);
  });

  it('should return the correct free capacity', () => {
    Chest.addItems([11, 21, 31]);
    expect(Chest.getFreeCapacity()).toBe(7);
  });

  it('should add items if there is enough free capacity', () => {
    Chest.addItems([12, 22, 32]);
    expect(Chest.getItems()).toEqual([12, 22, 32]);
  });

  it('should not add items if there is not enough free capacity (1)', () => {
    Chest.addItems([13, 23, 33, 43, 53, 63, 73, 83, 93, 103]);
    Chest.addItems([11, 12]);
    expect(Chest.getItems()).toEqual([13, 23, 33, 43, 53, 63, 73, 83, 93, 103]);
  });

  it('should not add items if there is not enough free capacity (2)', () => {
    Chest.addItems([14, 24, 34, 44, 54, 64, 74, 84, 94]);
    Chest.addItems([11, 12, 13]);
    expect(Chest.getItems()).toEqual([14, 24, 34, 44, 54, 64, 74, 84, 94]);
  });

  it('should remove multiple items', () => {
    Chest.addItems([15, 25, 35, 45, 55]);
    Chest.removeItems([25, 45]);
    expect(Chest.getItems()).toEqual([15, 35, 55]);
  });

  it('should notify about the new state by inserting new elements', () => {
    Chest.chestChanged$.pipe(take(1)).subscribe((items) => {
     expect(items).toEqual([2, 28, 311]);
    });
    Chest.addItems([2, 28, 311]);
  });

  it('should notify about the new state by removing elements', () => {   
    Chest.addItems([1, 27, 312, 912, 914]);
    Chest.chestChanged$.pipe(take(1)).subscribe((items) => {
      console.log('-----items', items);
      expect(items).toEqual([27, 912]);
    });
    Chest.removeItems([1, 312, 914]);
  });
});
