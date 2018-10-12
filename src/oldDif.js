/*
const node = {
  type: '', // newNode, deletedNode, changedNode, unchangedNode
  name: v,
  children: [], // mb not ?
  oldValue: '',
  newValue: '',
};


if (_.has(firstData, v) && _.has(secondData, v)) {
  if (_.isObject(firstData[v]) && _.isObject(secondData[v])) {
    node.children = buildTree(firstData[v], secondData[v]);
  } else if (firstData[v] === secondData[v]) {
    node.oldValue = firstData[v];
    node.type = 'unchangedNode';
  } else {
    node.oldValue = firstData[v];
    node.newValue = secondData[v];
    node.type = 'changedNode';
  }
}
if (_.has(firstData, v) && !_.has(secondData, v)) {
  node.oldValue = firstData[v];
  node.type = 'deletedNode';
}
if (!_.has(firstData, v) && _.has(secondData, v)) {
  node.newValue = secondData[v];
  node.type = 'newNode';
}
*/
