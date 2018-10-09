import yaml from 'js-yaml';
import ini from 'ini';

const changeParser = {
  '.json': value => JSON.parse(value),
  '.yml': value => yaml.safeLoad(value),
  '.ini': value => ini.parse(value),
};

const parse = (read, extname) => {
  const parseData = changeParser[extname](read);
  return parseData;
};

export default parse;
