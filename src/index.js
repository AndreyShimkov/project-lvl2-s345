import fs from 'fs';

// import { has } from 'lodash';

const genDiff = ([firstConfigPath, secondConfigPath]) => {
  const parse = (path) => {
    const read = fs.readFileSync(path, 'UTF-8');
    const parseData = JSON.parse(read);
    return parseData;
  };

  const firstData = parse(firstConfigPath);
  const secondData = parse(secondConfigPath);

  return `${firstData} + ${secondData}`;
};

export default genDiff;
