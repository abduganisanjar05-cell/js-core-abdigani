import { describe, expect, it, vi } from 'vitest';
import { chunk, counter, deepClone, groupBy, memoize, unique } from '../src/functions.js';

describe('unique', () => {
  it('removes duplicate values', () => {
    expect(unique([1, 2, 1, 3, 2])).toEqual([1, 2, 3]);
  });

  it('returns an empty array for empty input', () => {
    expect(unique([])).toEqual([]);
  });

  it('rejects non-array input', () => {
    expect(() => unique('hello')).toThrow(TypeError);
  });
});

describe('groupBy', () => {
  const products = [
    { name: 'Tea', category: 'drinks' },
    { name: 'Bread', category: 'food' },
    { name: 'Coffee', category: 'drinks' }
  ];

  it('groups values using a callback key', () => {
    expect(groupBy(products, (product) => product.category)).toEqual({
      drinks: [products[0], products[2]],
      food: [products[1]]
    });
  });

  it('returns no groups for an empty array', () => {
    expect(Object.keys(groupBy([], (item) => item))).toEqual([]);
  });

  it('rejects invalid input and a non-function callback', () => {
    expect(() => groupBy({}, (item) => item)).toThrow(TypeError);
    expect(() => groupBy([], 'category')).toThrow(TypeError);
  });
});

describe('chunk', () => {
  it('splits an array into chunks and keeps the final short chunk', () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });

  it('returns an empty array when the input is empty', () => {
    expect(chunk([], 3)).toEqual([]);
  });

  it('rejects zero and invalid sizes', () => {
    expect(() => chunk([1], 0)).toThrow(RangeError);
    expect(() => chunk([1], 1.5)).toThrow(RangeError);
  });

  it('does not mutate the input array', () => {
    const values = [1, 2, 3];
    chunk(values, 2);
    expect(values).toEqual([1, 2, 3]);
  });
});

describe('deepClone', () => {
  it('creates an independent copy of nested objects and arrays', () => {
    const original = { user: { name: 'Abdigani' }, scores: [4, 5] };
    const copy = deepClone(original);
    copy.user.name = 'Changed';
    copy.scores.push(6);

    expect(original).toEqual({ user: { name: 'Abdigani' }, scores: [4, 5] });
    expect(copy).not.toBe(original);
    expect(copy.user).not.toBe(original.user);
  });

  it('clones supported built-in values and circular references', () => {
    const original = { created: new Date('2025-01-01T00:00:00Z') };
    original.self = original;
    const copy = deepClone(original);

    expect(copy.created).toEqual(original.created);
    expect(copy).not.toBe(original);
    expect(copy.self).toBe(copy);
  });

  it('returns primitive values unchanged', () => {
    expect(deepClone(null)).toBeNull();
    expect(deepClone(0)).toBe(0);
  });
});

describe('memoize', () => {
  it('reuses a cached result for the same arguments', () => {
    const calculate = vi.fn((first, second) => first + second);
    const memoizedCalculate = memoize(calculate);

    expect(memoizedCalculate(2, 3)).toBe(5);
    expect(memoizedCalculate(2, 3)).toBe(5);
    expect(calculate).toHaveBeenCalledTimes(1);
  });

  it('caches separate argument combinations and undefined results', () => {
    const calculate = vi.fn((value) => value === 0 ? undefined : value * 2);
    const memoizedCalculate = memoize(calculate);

    memoizedCalculate(0);
    memoizedCalculate(0);
    expect(memoizedCalculate(2)).toBe(4);
    expect(calculate).toHaveBeenCalledTimes(2);
  });

  it('rejects a non-function argument', () => {
    expect(() => memoize(null)).toThrow(TypeError);
  });
});

describe('counter', () => {
  it('increments, decrements, and returns its private value', () => {
    const current = counter();
    current.inc();
    current.inc();
    current.dec();

    expect(current.value()).toBe(1);
    expect(Object.keys(current)).toEqual(['inc', 'dec', 'value']);
  });

  it('keeps separate counter instances independent', () => {
    const first = counter();
    const second = counter();
    first.inc();

    expect(first.value()).toBe(1);
    expect(second.value()).toBe(0);
  });
});
