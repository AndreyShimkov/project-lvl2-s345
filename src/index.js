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
  const firstData = readData(firstConfigPath);
  const secondData = readData(secondConfigPath);

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

  return result;
};

export default genDiff;
