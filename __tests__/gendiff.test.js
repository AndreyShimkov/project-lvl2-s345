import fs from 'fs';
import genDiff from '../src';

const beforeJSON = '__tests__/__fixtures__/before.json';
const afterJSON = '__tests__/__fixtures__/after.json';

const beforeYAML = '__tests__/__fixtures__/before.yml';
const afterYAML = '__tests__/__fixtures__/after.yml';

const resultPath = '__tests__/__fixtures__/result1.txt';

const allTests = () => {
  const result = fs.readFileSync(resultPath, 'utf-8');

  const singleTest = (name, before, after) => {
    test(name, () => {
      expect(genDiff([before, after])).toEqual(result);
    });
  };
  singleTest('JSON', beforeJSON, afterJSON);
  singleTest('YAML', beforeYAML, afterYAML);
};

allTests();
