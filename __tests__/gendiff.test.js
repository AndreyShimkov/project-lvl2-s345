import fs from 'fs';
import genDiff from '../src';

const beforeJSON = '__tests__/__fixtures__/before.json';
const afterJSON = '__tests__/__fixtures__/after.json';

const beforeTreeJSON = '__tests__/__fixtures__/beforeTree.json';
const afterTreeJSON = '__tests__/__fixtures__/afterTree.json';

const beforeYAML = '__tests__/__fixtures__/before.yml';
const afterYAML = '__tests__/__fixtures__/after.yml';

const beforeTreeYAML = '__tests__/__fixtures__/beforeTree.yml';
const afterTreeYAML = '__tests__/__fixtures__/afterTree.yml';

const beforeINI = '__tests__/__fixtures__/before.ini';
const afterINI = '__tests__/__fixtures__/after.ini';

const beforeTreeINI = '__tests__/__fixtures__/beforeTree.ini';
const afterTreeINI = '__tests__/__fixtures__/afterTree.ini';

const simpleResultPath = '__tests__/__fixtures__/simpleTestResult.txt';
const treeResultPath = '__tests__/__fixtures__/resultTree.txt';

const allTests = () => {
  const simpleResult = fs.readFileSync(simpleResultPath, 'utf-8');
  const treeResult = fs.readFileSync(treeResultPath, 'utf-8');

  const singleTest = (name, before, after, result) => {
    test(name, () => {
      expect(genDiff(before, after)).toEqual(result);
    });
  };
  singleTest('JSON', beforeJSON, afterJSON, simpleResult);
  singleTest('YAML', beforeYAML, afterYAML, simpleResult);
  singleTest('INI', beforeINI, afterINI, simpleResult);
  singleTest('jsonTREE', beforeTreeJSON, afterTreeJSON, treeResult);
  singleTest('yamlTREE', beforeTreeYAML, afterTreeYAML, treeResult);
  singleTest('iniTREE', beforeTreeINI, afterTreeINI, treeResult);
};

allTests();
