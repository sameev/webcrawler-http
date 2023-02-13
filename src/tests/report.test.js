const { test, expect } = require("@jest/globals");
const { sortPages } = require("../report.js");

test("sortPages function: 2 pages", () => {
  const input = {
    "https://wagslane.dev/path": 1,
    "https://wagslane.dev": 3,
  };
  const actual = sortPages(input);
  const expected = [
    ["https://wagslane.dev", 3],
    ["https://wagslane.dev/path", 1],
  ];

  expect(actual).toEqual(expected);
});

test("sortPages function: 5 pages", () => {
  const input = {
    "https://wagslane.dev/path1": 1,
    "https://wagslane.dev": 3,
    "https://wagslane.dev/path2": 2,
    "https://wagslane.dev/path3": 6,
    "https://wagslane.dev/path4": 9,
  };
  const actual = sortPages(input);
  const expected = [
    ["https://wagslane.dev/path4", 9],
    ["https://wagslane.dev/path3", 6],
    ["https://wagslane.dev", 3],
    ["https://wagslane.dev/path2", 2],
    ["https://wagslane.dev/path1", 1],
  ];

  expect(actual).toEqual(expected);
});
