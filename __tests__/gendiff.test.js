import fs from 'fs';
import genDiff from '../src';

const path = '__tests__/__fixtures__/';

const beforeJSON = `${path}before.json`;
const afterJSON = `${path}after.json`;

const beforeTreeJSON = `${path}beforeTree.json`;
const afterTreeJSON = `${path}afterTree.json`;

const beforeYAML = `${path}before.yml`;
const afterYAML = `${path}after.yml`;

const beforeTreeYAML = `${path}beforeTree.yml`;
const afterTreeYAML = `${path}afterTree.yml`;

const beforeINI = `${path}before.ini`;
const afterINI = `${path}after.ini`;

const beforeTreeINI = `${path}beforeTree.ini`;
const afterTreeINI = `${path}afterTree.ini`;

const simpleResultPath = `${path}simpleTestResult.txt`;
const treeResultPath = `${path}resultTree.txt`;
const plainResultPath = `${path}plainResult.txt`;

const allTests = () => {
  const simpleResult = fs.readFileSync(simpleResultPath, 'utf-8');
  const treeResult = fs.readFileSync(treeResultPath, 'utf-8');
  const plainResult = fs.readFileSync(plainResultPath, 'utf-8');
  const tests = [
    ['JSON', beforeJSON, afterJSON, simpleResult],
    ['YAML', beforeYAML, afterYAML, simpleResult],
    ['INI', beforeINI, afterINI, simpleResult],
    ['jsonTREE', beforeTreeJSON, afterTreeJSON, treeResult],
    ['yamlTREE', beforeTreeYAML, afterTreeYAML, treeResult],
    ['iniTREE', beforeTreeINI, afterTreeINI, treeResult],
    ['plainJSON', beforeTreeJSON, afterTreeJSON, plainResult, 'plain'],
  ];

  describe.each(tests)('gendiff test',
    (name, before, after, result, format) => {
      test(name, () => {
        expect(genDiff(before, after, format)).toEqual(result);
      });
    });
};

allTests();
