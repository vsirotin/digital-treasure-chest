import { Chest } from './chest';

describe('Chest', () => {

  beforeEach(() => {
    Chest.items.clear(); // Clear items before each test
  });


  it('should return items as an array', () => {
    Chest.addItems([1, 2, 3]);
    expect(Chest.getItems()).toEqual([1, 2, 3]);
  });

  it('should return the correct free capacity', () => {
    Chest.addItems([1, 2, 3]);
    expect(Chest.getFreeCapacity()).toBe(7);
  });

  it('should add items if there is enough free capacity', () => {
    Chest.addItems([1, 2, 3]);
    expect(Chest.getItems()).toEqual([1, 2, 3]);
  });

  it('should not add items if there is not enough free capacity (1)', () => {
    Chest.addItems([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    Chest.addItems([11, 12]);
    expect(Chest.getItems()).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it('should not add items if there is not enough free capacity (2)', () => {
    Chest.addItems([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    Chest.addItems([11, 12, 13]);
    expect(Chest.getItems()).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it('should remove an item', () => {
    Chest.addItems([1, 2, 3]);
    Chest.removeItem(2);
    expect(Chest.getItems()).toEqual([1, 3]);
  });

  it('should remove multiple items', () => {
    Chest.addItems([1, 2, 3, 4, 5]);
    Chest.removeItems([2, 4]);
    expect(Chest.getItems()).toEqual([1, 3, 5]);
  });
});
