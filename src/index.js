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

const buildTree = (firstData, secondData) => {
  const firstKeys = Object.keys(firstData);
  const secondKeys = Object.keys(secondData);
  const allKeys = _.union(firstKeys, secondKeys);

  const tree = allKeys.map((v) => {
    const changeNode = [
      {
        check: (data1, data2, key) => (_.has(data1, key) && _.has(data2, key))
          && (_.isObject(data1) && _.isObject(data2)),
        node: {
          type: 'unchangedNode', name: v, children: [],
        },
      }, {
        check: (data1, data2, key) => (_.has(data1, key) && _.has(data2, key))
          && (data1[key] === data2[key]),
        node: {
          type: 'unchangedNode', name: v, oldValue: firstData[v], children: [],
        },
      }, {
        check: (data1, data2, key) => (_.has(data1, key) && _.has(data2, key))
          && (data1[key] !== data2[key]),
        node: {
          type: 'changedNode', name: v, oldValue: firstData[v], newValue: secondData[v], children: [],
        },
      }, {
        check: (data1, data2, key) => (_.has(data1, key) && !_.has(data2, key)),
        node: {
          type: 'deletedNode', name: v, oldValue: firstData[v], children: [],
        },
      }, {
        check: (data1, data2, key) => (!_.has(data1, key) && _.has(data2, key)),
        node: {
          type: 'newNode', name: v, newValue: secondData[v], children: [],
        },
      }];
    const find = (data1, data2, key) => changeNode.find(({ check }) => check(data1, data2, key));
    const { node } = find(firstData, secondData, v);
    console.log(node);
    return node;
  });
  return tree;
};

const genDiff = (firstConfigPath, secondConfigPath) => {
  const before = readData(firstConfigPath);
  const after = readData(secondConfigPath);
  return render(buildTree(before, after));
};

export default genDiff;
