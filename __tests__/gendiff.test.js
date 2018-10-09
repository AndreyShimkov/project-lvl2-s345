import fs from 'fs';

import genDiff from '../src';

const beforeJSON = '__tests__/__fixtures__/before.json';
const afterJSON = '__tests__/__fixtures__/after.json';

const beforeYAML = '__tests__/__fixtures__/before.yml';
const afterYAML = '__tests__/__fixtures__/after.yml';

const resultPath = '__tests__/__fixtures__/result.txt';
const result = fs.readFileSync(resultPath, 'UTF-8');

const testFormat = (name, before, after) => {
  test(name, () => {
    expect((genDiff([before, after]).replace(/\s+/g, ' '))).toEqual((result).replace(/\s+/g, ' '));
  });
};

testFormat('JSON', beforeJSON, afterJSON);
testFormat('YAML', beforeYAML, afterYAML);
