import genDiff from '../src';

const before = './__tests__/__fixtures__/before.JSON';

const after = './__tests__/__fixtures__/after.JSON';

const result = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
  - follow: false
}`;

test('genDiff', () => {
  expect((genDiff([before, after]))).toBe(result);
});
