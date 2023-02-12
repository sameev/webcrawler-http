const { test, expect } = require('@jest/globals');
const { normalizeURL } = require('./crawl.js');

test('normalizeURL strip protocol', () => {
  const input = 'https://subdomain.domain.com/path';
  const actual = normalizeURL(input);
  const expected = 'subdomain.domain.com/path';
  
  expect(actual).toBe(expected)
})

test('normalizeURL strip trailing slash', () => {
  const input = 'https://subdomain.domain.com/path/';
  const actual = normalizeURL(input);
  const expected = 'subdomain.domain.com/path';
  
  expect(actual).toBe(expected)
})

test('normalizeURL update capitals in hostname', () => {
  const input = 'https://Subdomain.Domain.com/Path/';
  const actual = normalizeURL(input);
  const expected = 'subdomain.domain.com/Path';
  
  expect(actual).toBe(expected)
})