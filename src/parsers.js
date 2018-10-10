import yaml from 'js-yaml';
import ini from 'ini';

const changeParser = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

const parse = (read, extname) => {
  const parseData = changeParser[extname](read);
  return parseData;
};

export default parse;
