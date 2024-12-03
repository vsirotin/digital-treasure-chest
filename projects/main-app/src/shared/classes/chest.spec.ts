import { Chest } from './chest';

describe('Chest', () => {
  let chest: Chest;

  beforeEach(() => {
    chest = Chest.instance;
    chest.items.clear(); // Clear items before each test
  });

  it('should create an instance of Chest', () => {
    expect(chest).toBeTruthy();
  });

  it('should return items as an array', () => {
    chest.addItems([1, 2, 3]);
    expect(chest.getItems()).toEqual([1, 2, 3]);
  });

  it('should return the correct free capacity', () => {
    chest.addItems([1, 2, 3]);
    expect(chest.getFreeCapacity()).toBe(7);
  });

  it('should add items if there is enough free capacity', () => {
    chest.addItems([1, 2, 3]);
    expect(chest.getItems()).toEqual([1, 2, 3]);
  });

  it('should not add items if there is not enough free capacity (1)', () => {
    chest.addItems([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    chest.addItems([11, 12]);
    expect(chest.getItems()).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it('should not add items if there is not enough free capacity (2)', () => {
    chest.addItems([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    chest.addItems([11, 12, 13]);
    expect(chest.getItems()).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it('should remove an item', () => {
    chest.addItems([1, 2, 3]);
    chest.removeItem(2);
    expect(chest.getItems()).toEqual([1, 3]);
  });

  it('should remove multiple items', () => {
    chest.addItems([1, 2, 3, 4, 5]);
    chest.removeItems([2, 4]);
    expect(chest.getItems()).toEqual([1, 3, 5]);
  });
});
