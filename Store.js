export class Store {
  #items = [];

  static isValidItem(item) {
    return (
      item !== null &&
      typeof item === 'object' &&
      (typeof item.id === 'string' || typeof item.id === 'number') &&
      item.id !== '' &&
      Number.isFinite(item.price) &&
      item.price >= 0 &&
      Number.isFinite(item.qty) &&
      item.qty >= 0 &&
      typeof item.name === 'string' &&
      item.name.trim().length > 0
    );
  }

  get count() {
    return this.#items.length;
  }

  get items() {
    return this.#items.map((item) => ({ ...item }));
  }

  add(item) {
    if (!Store.isValidItem(item)) {
      throw new TypeError('Cannot add an invalid item to the store.');
    }

    const storedItem = { ...item };
    this.#items.push(storedItem);
    return storedItem;
  }

  remove(id) {
    const itemIndex = this.#items.findIndex((item) => item.id === id);
    if (itemIndex === -1) {
      return false;
    }

    this.#items.splice(itemIndex, 1);
    return true;
  }

  find(id) {
    return this.#items.find((item) => item.id === id);
  }

  total() {
    return this.#items.reduce((sum, { price, qty }) => sum + price * qty, 0);
  }

  _sortItems(compareFn) {
    this.#items.sort(compareFn);
  }
}

export class SortedStore extends Store {
  add(item) {
    const addedItem = super.add(item);
    this._sortItems((first, second) => first.price - second.price);
    return addedItem;
  }
}
