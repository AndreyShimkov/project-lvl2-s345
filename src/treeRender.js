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
  const result = ast.map((v) => {
    if (v.type === 'parentNode') {
      return `${separator}    ${v.name}: ${render(v.children, `${separator}    `)}`;
    }
    if (v.type === 'newNode') {
      return `${separator}  + ${v.name}: ${_.isObject(v.newValue) ? buildTree(v.newValue, `${separator}    `) : v.newValue}`;
    }
    if (v.type === 'deletedNode') {
      return `${separator}  - ${v.name}: ${_.isObject(v.oldValue) ? buildTree(v.oldValue, `${separator}    `) : v.oldValue}`;
    }
    if (v.type === 'changedNode') {
      return `${separator}  - ${v.name}: ${_.isObject(v.oldValue) ? buildTree(v.oldValue, `${separator}    `) : v.oldValue}\n${separator}  + ${v.name}: ${_.isObject(v.newValue) ? buildTree(v.newValue, `${separator}    `) : v.newValue}`;
    }
    return `${separator}    ${v.name}: ${v.oldValue}`;
  });
  return `{\n${result.join('\n')}\n${separator}}`;
};

export default render;
