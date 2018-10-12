
import commander from 'commander';
import genDiff from '.';

import { version } from '../package.json';

commander
  .version(version)
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'tree')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    const result = genDiff(firstConfig, secondConfig, commander.format);
    console.log(result);
  });

export default commander;
