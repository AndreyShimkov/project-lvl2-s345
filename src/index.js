import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parsers';
import render from './renders';

const readData = (pathToFile) => {
  const read = fs.readFileSync(pathToFile, 'utf-8');
  const extname = path.extname(pathToFile);
  return parse(read, extname);
};

const changeNode = [
  {
    check: (data1, data2, key) => (_.has(data1, key) && _.has(data2, key))
      && (_.isObject(data1[key]) && _.isObject(data2[key])),
    nodeBuilder: obj => ({
      type: 'parentNode', name: obj.key, children: [...obj.func(obj.oldValue, obj.newValue)],
    }),
  }, {
    check: (data1, data2, key) => (_.has(data1, key) && _.has(data2, key))
      && (data1[key] === data2[key]),
    nodeBuilder: obj => ({
      type: 'unchangedNode', name: obj.key, oldValue: obj.oldValue, children: [],
    }),
  }, {
    check: (data1, data2, key) => (_.has(data1, key) && _.has(data2, key))
      && (data1[key] !== data2[key]),
    nodeBuilder: obj => ({
      type: 'changedNode', name: obj.key, oldValue: obj.oldValue, newValue: obj.newValue, children: [],
    }),
  }, {
    check: (data1, data2, key) => (_.has(data1, key) && !_.has(data2, key)),
    nodeBuilder: obj => ({
      type: 'deletedNode', name: obj.key, oldValue: obj.oldValue, children: [],
    }),
  }, {
    check: (data1, data2, key) => (!_.has(data1, key) && _.has(data2, key)),
    nodeBuilder: obj => ({
      type: 'newNode', name: obj.key, newValue: obj.newValue, children: [],
    }),
  }];

const buildTree = (firstData, secondData) => {
  const firstKeys = Object.keys(firstData);
  const secondKeys = Object.keys(secondData);
  const allKeys = _.union(firstKeys, secondKeys);

  const tree = allKeys.map((v) => {
    const find = (data1, data2, key) => changeNode.find(({ check }) => check(data1, data2, key));
    const { nodeBuilder } = find(firstData, secondData, v);
    const obj = {
      key: v, oldValue: firstData[v], newValue: secondData[v], func: buildTree,
    };
    return nodeBuilder(obj);
  });
  return tree;
};

const genDiff = (firstConfigPath, secondConfigPath, format = 'tree') => {
  const before = readData(firstConfigPath);
  const after = readData(secondConfigPath);
  return render(buildTree(before, after), format);
};

export default genDiff;
