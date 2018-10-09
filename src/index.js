import fs from 'fs';

import { has } from 'lodash';

const genDiff = ([firstConfigPath, secondConfigPath]) => {
  const parse = (path) => {
    const read = fs.readFileSync(path, 'UTF-8');
    const parseData = JSON.parse(read);
    return parseData;
  };

  const firstData = parse(firstConfigPath);
  const secondData = parse(secondConfigPath);

  const firstKeys = Object.keys(firstData);
  //  const secondKeys = Object.keys(secondData);

  const res1 = firstKeys.map(v => (has(secondData, v) ? 'change' : ` - ${v}: ${firstData[v]}`)).join('\n');

  return res1;
};

export default genDiff;
