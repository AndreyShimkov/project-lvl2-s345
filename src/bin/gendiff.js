#!/usr/bin/env node

import commander from '../commander/commander';

commander.parse(process.argv);

console.log(commander.args);
