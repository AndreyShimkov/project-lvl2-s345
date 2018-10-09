
import commander from 'commander';

import { version } from '../package.json';

commander
  .version(version)
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<firstConfig>, <secondConfig>');

export default commander;
