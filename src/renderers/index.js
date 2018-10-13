import treeRender from './treeRenderer';
import plainRender from './plainRenderer';
import jsonRender from './jsonRenderer';

const renders = {
  tree: treeRender,
  plain: plainRender,
  json: jsonRender,
};

const rendering = (data, format) => renders[format](data);

export default rendering;
