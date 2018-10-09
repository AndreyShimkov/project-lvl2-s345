import yaml from 'js-yaml';

const changeParser = {
  '.json': value => JSON.parse(value),
  '.yml': value => yaml.safeLoad(value),
};

const parse = (read, extname) => {
  const parseData = changeParser[extname](read);
  return parseData;
};

export default parse;
