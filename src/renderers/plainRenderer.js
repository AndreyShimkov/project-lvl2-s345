import _ from 'lodash';

const changeValue = val => (_.isObject(val) ? '[complex value]' : val);

const render = (ast, path = '') => {
  const result = ast.filter(v => v.type !== 'unchangedNode').map((v) => {
    const changeNode = {
      parentNode: render(v.children, `${path}${v.name}.`),
      newNode: `Property '${path}${v.name}' was added with value: '${changeValue(v.newValue)}'`,
      deletedNode: `Property '${path}${v.name}' was removed`,
      changedNode: `Property '${path}${v.name}' was updated from '${changeValue(v.oldValue)}' to '${changeValue(v.newValue)}'`,
    };
    return changeNode[v.type];
  });
  return result.join('\n');
};

export default render;
