// import _ from 'lodash';

const renderTree = (subast) => {
  if (!(Object.prototype.toString.call(subast) === 'object Array')) {
    return subast;
  }
  const result = subast.map(item => ((Object.prototype.toString.call(subast) === 'object Array') ? renderTree(item) : `    ${item.name}: ${item.oldValue}`));
  return result.join('\n');
};

const render = (ast) => {
  const result = ast.map((v) => {
    if (v.type === 'parentNode') {
      return render(v.children);
    }
    if (v.type === 'newNode') {
      return `  + ${v.name}: ${(v.newValue)}`;
    }
    if (v.type === 'deletedNode') {
      return `  - ${v.name}: ${(v.oldValue)}`;
    }
    if (v.type === 'unchangedNode') {
      return `    ${v.name}: ${v.oldValue}`;
    }
    return `  - ${v.name}: ${v.oldValue}\n  + ${v.name}: ${v.newValue}`;
  });
  return `{\n${result.join('\n')}\n}`;
};

export default render;
