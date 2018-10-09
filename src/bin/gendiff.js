#!/usr/bin/env node

import commander from '../cli.js';
import genDiff from '..';

commander.parse(process.argv);

console.log(commander.args);

const result = genDiff(commander.args);

console.log(result);
