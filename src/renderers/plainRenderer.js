import _ from 'lodash';

const changeValue = val => (_.isObject(val) ? '[complex value]' : val);

const changeNode = {
  parentNode: (path, node, fn) => fn(node.children, `${path}${node.name}.`),
  newNode: (path, node) => `Property '${path}${node.name}' was added with value: '${changeValue(node.newValue)}'`,
  deletedNode: (path, node) => `Property '${path}${node.name}' was removed`,
  changedNode: (path, node) => `Property '${path}${node.name}' was updated from '${changeValue(node.oldValue)}' to '${changeValue(node.newValue)}'`,
};

const render = (ast, path = '') => {
  const result = ast.filter(v => v.type !== 'unchangedNode').map(v => changeNode[v.type](path, v, render));
  return result.join('\n');
};

export default render;
