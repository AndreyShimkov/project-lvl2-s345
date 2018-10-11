import _ from 'lodash';

const renderTree = (item, separatorIn) => {
  const itemKeys = Object.keys(item);
  const tree = itemKeys.map((element) => {
    if (typeof item[element] === 'object') {
      console.log('1!');
      return `${separatorIn}    ${element}: {\n${renderTree(item[element], `${separatorIn}  `)}\n    }`;
    }
    return `{\n${separatorIn}    ${element}: ${item[element]}\n${separatorIn}}`;
  });
  return tree;
};

const render = (ast, separator) => {
  const mapped = ast.map((v) => {
    if (_.has(v, 'children')) {
      return `${separator}  ${v.name}: {\n${render(v.children, `${separator}    `)}\n${separator}  }`;
    }
    if (_.has(v, 'constValue')) {
      return `${separator}  ${v.name}: ${v.constValue}`;
    }
    if (_.has(v, 'oldValue') && _.has(v, 'newValue')) {
      return `${separator}- ${v.name}: ${(typeof v.oldValue === 'object' ? renderTree(v.oldValue, `  ${separator}`) : v.oldValue)}\n${separator}+ ${v.name}: ${(typeof v.newValue === 'object' ? renderTree(v.newValue, `  ${separator}`) : v.newValue)}`;
    }
    if (_.has(v, 'oldValue')) {
      return `${separator}- ${v.name}: ${(typeof v.oldValue === 'object' ? renderTree(v.oldValue, `  ${separator}`) : v.oldValue)}`;
    }
    return `${separator}+ ${v.name}: ${(typeof v.newValue === 'object' ? renderTree(v.newValue, `  ${separator}`) : v.newValue)}`;
  });
  return mapped.join('\n');
};

export default render;
