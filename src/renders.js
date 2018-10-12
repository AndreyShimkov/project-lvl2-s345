import treeRender from './treeRender';
import plainRender from './plainRender';

const renders = {
  tree: treeRender,
  plain: (a, b) => plainRender(a, b),
};

const rendering = (data, format) => renders[format](data);

export default rendering;
