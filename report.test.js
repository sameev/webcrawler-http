const { test, expect } = require('@jest/globals');
const { sortPages, printReport } = require('./report.js');


test('sortPages function: 2 pages', () => {
  const input = {
    'https://wagslane.dev/path': 1,
    'https://wagslane.dev': 3
  };
  const actual = sortPages(input);
  const expected = [
    ['https://wagslane.dev', 3],
    ['https://wagslane.dev/path', 1]
  ]

  expect(actual).toEqual(expected);
});

test('sortPages function: 5 pages', () => {
  const input = {
    'https://wagslane.dev/path1': 1,
    'https://wagslane.dev': 3,
    'https://wagslane.dev/path2': 2,
    'https://wagslane.dev/path3': 6,
    'https://wagslane.dev/path4': 9
  };
  const actual = sortPages(input);
  const expected = [
    ['https://wagslane.dev/path4', 9],
    ['https://wagslane.dev/path3', 6],
    ['https://wagslane.dev', 3],
    ['https://wagslane.dev/path2', 2],
    ['https://wagslane.dev/path1', 1]
  ]

  expect(actual).toEqual(expected);
})

test('printReport', () => {
  const input = [
    ['https://wagslane.dev', 3],
    ['https://wagslane.dev/path', 1]
  ];

  const actual = printReport(input);

  const expected = `
    Found 3 internal links to wagslane.dev.
    Found 1 internal links to wagslane.dev/path.
  `

  expect(actual).toBe(expected);
})
