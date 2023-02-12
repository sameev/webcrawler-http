const { test, expect } = require('@jest/globals');
const { normalizeURL, getURLsFromHTML } = require('./crawl.js');

//normalizeURL tests

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

//getURLsFromHTML tests

test('getURLsFromHTML absolute single', () => {
  const htmlInput = `
    <html>
      <body>
          <a href="https://blog.boot.dev/"><span>Go to Boot.dev</span></a>
      </body>
    </html>
  `;
  const baseURLInput = 'https://blog.boot.dev';
  const actual = getURLsFromHTML(htmlInput, baseURLInput);
  const expected = ['https://blog.boot.dev/'];

  expect(actual).toStrictEqual(expected)
})

test('getURLsFromHTML absolute multiple', () => {
  const htmlInput = `
    <html>
      <body>
          <a href="https://blog.boot.dev/path/"><span>Go to Boot.dev</span></a>
          <a href="https://blog.boot.com/path/"><span>Go to Boot.dev</span></a>
      </body>
    </html>
  `;
  const baseURLInput = 'https://blog.boot.dev';
  const actual = getURLsFromHTML(htmlInput, baseURLInput);
  const expected = ['https://blog.boot.dev/path/', 'https://blog.boot.com/path/'];

  expect(actual).toStrictEqual(expected)
})

test('getURLsFromHTML relative single', () => {
  const htmlInput = `
    <html>
      <body>
          <a href="/path/"><span>Go to Boot.dev</span></a>
      </body>
    </html>
  `;
  const baseURLInput = 'https://blog.boot.dev';
  const actual = getURLsFromHTML(htmlInput, baseURLInput);
  const expected = ['https://blog.boot.dev/path/'];

  expect(actual).toStrictEqual(expected)
})

test('getURLsFromHTML relative multiple', () => {
  const htmlInput = `
    <html>
      <body>
          <a href="/path/"><span>Go to Boot.dev</span></a>
          <a href="/path2/"><span>Go to Boot.dev</span></a>
      </body>
    </html>
  `;
  const baseURLInput = 'https://blog.boot.dev';
  const actual = getURLsFromHTML(htmlInput, baseURLInput);
  const expected = ['https://blog.boot.dev/path/', 'https://blog.boot.dev/path2/'];

  expect(actual).toStrictEqual(expected)
})

test('getURLsFromHTML relative and absolute multiple', () => {
  const htmlInput = `
    <html>
      <body>
          <a href="https://blog.boot.dev/path/"><span>Go to Boot.dev</span></a>
          <a href="/path2/"><span>Go to Boot.dev</span></a>
      </body>
    </html>
  `;
  const baseURLInput = 'https://blog.boot.dev';
  const actual = getURLsFromHTML(htmlInput, baseURLInput);
  const expected = ['https://blog.boot.dev/path/', 'https://blog.boot.dev/path2/'];

  expect(actual).toStrictEqual(expected)
})

test('getURLsFromHTML invalid', () => {
  const htmlInput = `
    <html>
      <body>
          <a href="invalid"><span>Go to Boot.dev</span></a>
          <a href="/path2/"><span>Go to Boot.dev</span></a>
      </body>
    </html>
  `;
  const baseURLInput = 'https://blog.boot.dev';
  const actual = getURLsFromHTML(htmlInput, baseURLInput);
  const expected = ['https://blog.boot.dev/path2/'];

  expect(actual).toEqual(expected)
})