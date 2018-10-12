import treeRender from './treeRender';
import plainRender from './plainRender';
import jsonRender from './jsonRender';

const renders = {
  tree: treeRender,
  plain: plainRender,
  json: jsonRender,
};

const rendering = (data, format) => renders[format](data);

export default rendering;
