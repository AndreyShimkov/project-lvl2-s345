import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const changeParser = {
  '.json': value => JSON.parse(value),
  '.yml': value => yaml.safeLoad(value),
};

const parse = (pathToFile) => {
  const read = fs.readFileSync(pathToFile, 'UTF-8');
  const extname = path.extname(pathToFile);
  const parseData = changeParser[extname](read);
  return parseData;
};

export default parse;
