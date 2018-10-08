
import { version } from '../../package.json';

const commander = require('commander');

commander
  .version(version, '-V, --version')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<firstconfig>, <secondconfig>')
  .parse(process.argv);

console.log(commander.args);

export default commander;
