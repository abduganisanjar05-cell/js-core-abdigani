import { describe, expect, it } from 'vitest';
import { SortedStore, Store } from '../src/Store.js';

const makeItem = (id, name, price, qty) => ({ id, name, price, qty });

describe('Store', () => {
  it('validates items and accepts zero price and quantity', () => {
    expect(Store.isValidItem(makeItem(1, 'Free item', 0, 0))).toBe(true);
    expect(Store.isValidItem(makeItem(2, 'Invalid price', -1, 1))).toBe(false);
    expect(Store.isValidItem(null)).toBe(false);
  });

  it('adds items and finds them by ID', () => {
    const store = new Store();
    const item = makeItem(1, 'Notebook', 3, 2);
    store.add(item);

    expect(store.find(1)).toEqual(item);
    expect(store.count).toBe(1);
  });

  it('rejects invalid items', () => {
    const store = new Store();
    expect(() => store.add({ id: 1, name: '', price: 2, qty: 1 })).toThrow(TypeError);
    expect(store.count).toBe(0);
  });

  it('removes an existing item and reports a missing item', () => {
    const store = new Store();
    store.add(makeItem(1, 'Pen', 1, 3));

    expect(store.remove(1)).toBe(true);
    expect(store.remove(1)).toBe(false);
    expect(store.find(1)).toBeUndefined();
    expect(store.count).toBe(0);
  });

  it('calculates the total value and returns zero for an empty store', () => {
    const store = new Store();
    expect(store.total()).toBe(0);

    store.add(makeItem(1, 'Pen', 2, 3));
    store.add(makeItem(2, 'Notebook', 4, 2));
    expect(store.total()).toBe(14);
  });

  it('does not expose its private collection through the items getter', () => {
    const store = new Store();
    store.add(makeItem(1, 'Pen', 2, 1));
    const items = store.items;
    items.pop();

    expect(store.count).toBe(1);
  });
});

describe('SortedStore', () => {
  it('extends Store and adds items in ascending price order', () => {
    const store = new SortedStore();
    store.add(makeItem(1, 'Expensive', 10, 1));
    store.add(makeItem(2, 'Cheap', 2, 1));
    store.add(makeItem(3, 'Middle', 5, 1));

    expect(store.items.map((item) => item.name)).toEqual(['Cheap', 'Middle', 'Expensive']);
    expect(store).toBeInstanceOf(Store);
    expect(store.total()).toBe(17);
  });

  it('inherits the static item validator', () => {
    expect(SortedStore.isValidItem(makeItem(1, 'Tea', 0, 1))).toBe(true);
  });
});
