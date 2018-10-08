
const commander = require('commander');

commander
  .version('1.0.0')
  .description('Usage: gendiff [options] <firstConfig> <secondConfig>\n \n Compares two configuration files and shows a difference.')
  .option('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format')
  .parse(process.argv);

export default commander;
