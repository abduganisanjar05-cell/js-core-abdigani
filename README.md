# Lab 4 — JavaScript Core

Student:  
Abdigani Sanzhar

Repository:  
js-core-abdigani

## About the project

This laboratory demonstrates core JavaScript features: functions, higher-order functions, closures, classes, private fields, inheritance, and unit testing. The project uses plain JavaScript and has no frontend or DOM code.

## Project structure

```text
src/
  functions.js
  Store.js
tests/
  functions.test.js
  Store.test.js
screenshots/
  tests-passed.png
package.json
README.md
```

## How to run

Install the project dependencies and run the tests from the project root:

```bash
npm i
npm test
```

## Functions

- `unique(arr)` returns a new array with duplicate values removed.
- `groupBy(arr, keyFn)` uses a callback and `reduce` to group values by a computed key.
- `chunk(arr, size)` splits an array into smaller arrays without changing the original.
- `deepClone(obj)` uses JavaScript's `structuredClone` to copy supported values, including nested objects and arrays.
- `memoize(fn)` remembers results for argument combinations so the original function is not called again for cached arguments.
- `counter()` creates a counter with increment, decrement, and value methods.

## Store class

`Store` keeps its item collection in the private `#items` field. Its `add` method validates and stores an item, `remove` deletes an item by ID, and `find` looks one up. The `total` method uses `reduce` to calculate price times quantity for every item. The `count` getter reports how many items are stored, while the `items` getter returns copies rather than the private collection. The static `isValidItem` method checks item data. `SortedStore` extends `Store` and overrides `add` to keep items sorted by price; it calls `super.add` to reuse the base-class validation and storage behavior.

## Closures in my code

A closure is when a function remembers a variable from the place where it was created. In `memoize()`, the returned function remembers a `Map` that stores results from earlier calls. In `counter()`, the returned methods remember the `count` variable. That count stays private because it is inside `counter()` and is not returned directly. The inner methods can still use it because they were created inside the same function. Closures are useful here because they let my code keep state without exposing it. This makes the cache and counter easier to use safely.

## Unit tests

Vitest is used to test the functions and classes. The tests check normal behavior and edge cases such as empty arrays, invalid inputs, zero values, missing items, and cached results.

## Test Results

![Passing tests](screenshots/tests-passed.png)

## AI Usage

AI assistance was used to help create, review, and debug the JavaScript code and tests. The final implementation was checked and tested.

## Demo preparation

The main concepts to demonstrate are higher-order functions, closures, classes, private fields, a getter, a static method, inheritance, `super`, and unit tests.

Lab 4 implementation notes
The project demonstrates JavaScript functions, closures, classes, inheritance, and unit testing.