
import { version } from '../../package.json';

const commander = require('commander');

commander
  .version(version)
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<firstconfig>, <secondconfig>');

export default commander;
