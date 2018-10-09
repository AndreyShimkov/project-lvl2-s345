import { has } from 'lodash';
import parse from './parsers';

const genDiff = ([firstConfigPath, secondConfigPath]) => {
  const firstData = parse(firstConfigPath);
  const secondData = parse(secondConfigPath);

  const firstKeys = Object.keys(firstData);
  const secondKeys = Object.keys(secondData);

  const change = (obj1, obj2, key) => (obj1[key] === obj2[key] ? `    ${key}: ${obj1[key]}` : `  - ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}`);

  const res1 = firstKeys.map(v => (has(secondData, v) ? change(firstData, secondData, v) : `  - ${v}: ${firstData[v]}`)).join('\n');

  const filtered = secondKeys.filter(v => !has(firstData, v));

  const res2 = filtered.map(v => `  + ${v}: ${secondData[v]}`).join('\n');

  const result = `{\n${[res1, res2].join('\n')}\n}`;
  return result;
};

export default genDiff;
