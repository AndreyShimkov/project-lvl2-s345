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

const render = (ast, separator = '') => {
  const firstMap = ast.map((v) => {
    switch (v.type) {
      case 'parentNode':
        return `${separator}    ${v.name}: ${render(v.children, `${separator}    `)}`;
      case 'newNode':
        return `${separator}  + ${v.name}: ${_.isObject(v.newValue) ? buildTree(v.newValue, `${separator}    `) : v.newValue}`;
      case 'deletedNode':
        return `${separator}  - ${v.name}: ${_.isObject(v.oldValue) ? buildTree(v.oldValue, `${separator}    `) : v.oldValue}`;
      case 'changedNode':
        return [`${separator}  - ${v.name}: ${_.isObject(v.oldValue) ? buildTree(v.oldValue, `${separator}    `) : v.oldValue}`,
          `${separator}  + ${v.name}: ${_.isObject(v.newValue) ? buildTree(v.newValue, `${separator}    `) : v.newValue}`];
      default:
        return `${separator}    ${v.name}: ${v.oldValue}`;
    }
  });
  const result = _.flatten(firstMap);
  return `{\n${result.join('\n')}\n${separator}}`;
};

export default render;
