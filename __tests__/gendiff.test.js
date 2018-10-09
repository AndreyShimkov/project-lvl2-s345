import genDiff from '../src';

const after = './__tests__/__fixtures__/before.JSON';

const before = './__tests__/__fixtures__/after.JSON';

const result = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
}`;

test('genDiff', () => {
  expect((genDiff([after, before]))).toBe(result);
});
