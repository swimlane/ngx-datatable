const replace = require("replace");
const fs = require('fs-extra')

/**
 * This replaces all .scss extensions with .css
 */
replace({
  regex: '.scss',
  replacement: '.css',
  paths: ['./build'],
  recursive: true,
  silent: false
});
