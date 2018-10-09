import fs from 'fs';

import genDiff from '../src';

const before = '__tests__/__fixtures__/before.json';

const after = '__tests__/__fixtures__/after.json';

const resultPath = '__tests__/__fixtures__/result.txt';

const result = fs.readFileSync(resultPath, 'UTF-8');

test('genDiff', () => {
  expect((genDiff([before, after]).replace(/\s+/g, ' '))).toEqual((result).replace(/\s+/g, ' '));
});
