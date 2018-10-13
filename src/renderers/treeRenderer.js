import _ from 'lodash';

const buildTree = (object, sepor) => {
  const keys = Object.keys(object);
  const result = keys.map((key) => {
    if (_.isObject(object[key])) {
      return buildTree(object[key], `    ${sepor}`);
    }
    return `${key}: ${object[key]}`;
  });
  return `{\n${sepor}    ${result}\n${sepor}}`;
};

const stringify = (sign, name, value, separator) => `${separator}  ${sign} ${name}: ${(_.isObject(value) ? buildTree(value, `${separator}    `) : value)}`;

const render = (ast, separator = '') => {
  const firstMap = ast.map((v) => {
    switch (v.type) {
      case 'parentNode':
        return stringify(' ', v.name, render(v.children, `${separator}    `), separator);
      case 'newNode':
        return stringify('+', v.name, v.newValue, separator);
      case 'deletedNode':
        return stringify('-', v.name, v.oldValue, separator);
      case 'changedNode':
        return [stringify('-', v.name, v.oldValue, separator), stringify('+', v.name, v.newValue, separator)];
      default:
        return stringify(' ', v.name, v.oldValue, separator);
    }
  });
  const result = _.flatten(firstMap);
  return `{\n${result.join('\n')}\n${separator}}`;
};

export default render;
