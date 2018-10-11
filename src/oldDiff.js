import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parsers';

const readData = (pathToFile) => {
  const read = fs.readFileSync(pathToFile, 'utf-8');
  const extname = path.extname(pathToFile);
  return parse(read, extname);
};

const genDiff = (firstConfigPath, secondConfigPath) => {
  const firstData1 = readData(firstConfigPath);
  const secondData1 = readData(secondConfigPath);
  /*
  const firstKeys = Object.keys(firstData);
  const secondKeys = Object.keys(secondData);
  const allKeys = _.union(firstKeys, secondKeys);

  const changeCombinedValue = (key) => {
    if (_.has(firstData, key) && _.has(secondData, key) && (firstData[key] === secondData[key])) {
      return `    ${key}: ${firstData[key]}`;
    }
    if (_.has(firstData, key) && !_.has(secondData, key)) {
      return `  - ${key}: ${firstData[key]}`;
    }
    if (!_.has(firstData, key) && _.has(secondData, key)) {
      return `  + ${key}: ${secondData[key]}`;
    }
    if (!_.has(firstData, key) && !_.has(secondData, key)) {
      return '';
    }
    return `  - ${key}: ${firstData[key]}\n  + ${key}: ${secondData[key]}`;
  };

  const result = `{\n${allKeys.map(changeCombinedValue).join('\n')}\n}`;

  const before2JSON = '__tests__/__fixtures__/before2.json';
  const before2YAML = '__tests__/__fixtures__/before2.yml';
  const new1 = readData(before2JSON);
  const new2 = readData(before2YAML);
  console.log(new1);
  console.log(new2);
  */
  // node = {name: 'str', oldValue: 'str' newValue: 'str' constValue: 'str',  children:[] }
  // tree = [ node1, node2 ... ]

  const buildTree = (firstData, secondData) => {
    const firstKeys = Object.keys(firstData);
    const secondKeys = Object.keys(secondData);
    const allKeys = _.union(firstKeys, secondKeys);

    // const result = allKeys.map(key => buildNode(key));

    const tree = allKeys.map((v) => {
      const node = {
        name: v,
      };

      if (_.has(firstData, v) && _.has(secondData, v)) {
        if (typeof firstData[v] === 'object' && typeof secondData[v] === 'object') {
          node.children = buildTree(firstData[v], secondData[v]);
        } else if (firstData[v] === secondData[v]) {
          node.constValue = firstData[v];
        } else {
          node.oldValue = firstData[v];
          node.newValue = secondData[v];
        }
      }
      if (_.has(firstData, v) && !_.has(secondData, v)) {
        node.oldValue = firstData[v];
      }
      if (!_.has(firstData, v) && _.has(secondData, v)) {
        node.newValue = secondData[v];
      }
      return node;
    });
    return tree;
  };
  const result = buildTree(firstData1, secondData1);
  console.log(result.toString());
  return result;
};

export default genDiff;
