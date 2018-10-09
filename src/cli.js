
import commander from 'commander';
import genDiff from '.';

import { version } from '../package.json';

commander
  .version(version)
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => console.log(genDiff([firstConfig, secondConfig])));

export default commander;
