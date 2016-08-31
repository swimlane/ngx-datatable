var replace = require("replace");

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
