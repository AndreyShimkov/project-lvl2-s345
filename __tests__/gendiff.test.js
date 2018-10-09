import fs from 'fs';

import genDiff from '../src';

const before = '__tests__/__fixtures__/before.JSON';

const after = '__tests__/__fixtures__/after.JSON';

const resultPath = '__tests__/__fixtures__/result.txt';

const result = fs.readFileSync(resultPath, 'UTF-8');

test('genDiff', () => {
  expect((genDiff([before, after]))).toMatchSnapshot(result);
});
