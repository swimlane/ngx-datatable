const replace = require("replace");
const fs = require('fs-extra')

/**
 * This replaces all the TypeScript references
 * to other types that for some reason TypeScript
 * keeps generating. This hack is insane ...
 */
replace({
  regex: '/// <reference types="core-js" />',
  replacement: '',
  paths: ['./release'],
  recursive: true,
  silent: false
});

/**
 * ngc output pathing is totally wrong
 */
fs.copySync('./release/build', './release');
fs.removeSync('./release/node_modules')
fs.removeSync('./release/build')
