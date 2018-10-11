import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parsers';
import render from './render';

const readData = (pathToFile) => {
  const read = fs.readFileSync(pathToFile, 'utf-8');
  const extname = path.extname(pathToFile);
  return parse(read, extname);
};

const genDiff = (firstConfigPath, secondConfigPath) => {
  const firstData1 = readData(firstConfigPath);
  const secondData1 = readData(secondConfigPath);

  const buildTree = (firstData, secondData) => {
    const firstKeys = Object.keys(firstData);
    const secondKeys = Object.keys(secondData);
    const allKeys = _.union(firstKeys, secondKeys);

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

  const result1 = `{\n${render(result, '  ')}\n}`;
  return result1;
};

export default genDiff;
