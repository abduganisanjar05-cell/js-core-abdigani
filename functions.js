export function unique(arr) {
  if (!Array.isArray(arr)) {
    throw new TypeError('unique expects an array.');
  }

  return [...new Set(arr)];
}

export function groupBy(arr, keyFn) {
  if (!Array.isArray(arr)) {
    throw new TypeError('groupBy expects an array.');
  }
  if (typeof keyFn !== 'function') {
    throw new TypeError('groupBy expects keyFn to be a function.');
  }

  return arr.reduce((groups, item) => {
    const key = keyFn(item);
    if (!Object.hasOwn(groups, key)) {
      groups[key] = [];
    }
    groups[key].push(item);
    return groups;
  }, Object.create(null));
}

export function chunk(arr, size) {
  if (!Array.isArray(arr)) {
    throw new TypeError('chunk expects an array.');
  }
  if (!Number.isInteger(size) || size <= 0) {
    throw new RangeError('chunk size must be a positive integer.');
  }

  return Array.from({ length: Math.ceil(arr.length / size) }, (_, index) =>
    arr.slice(index * size, (index + 1) * size)
  );
}

export function deepClone(obj) {
  return structuredClone(obj);
}

export function memoize(fn) {
  if (typeof fn !== 'function') {
    throw new TypeError('memoize expects a function.');
  }

  const cache = new Map();
  const resultKey = Symbol('cached result');

  return function (...args) {
    let currentCache = cache;

    for (const arg of args) {
      if (!currentCache.has(arg)) {
        currentCache.set(arg, new Map());
      }
      currentCache = currentCache.get(arg);
    }

    if (currentCache.has(resultKey)) {
      return currentCache.get(resultKey);
    }

    const result = fn.apply(this, args);
    currentCache.set(resultKey, result);
    return result;
  };
}

export function counter() {
  let count = 0;

  return {
    inc() {
      count += 1;
      return count;
    },
    dec() {
      count -= 1;
      return count;
    },
    value() {
      return count;
    }
  };
}
