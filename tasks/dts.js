var generator = require('dts-generator');

generator.default({
  name: 'angular2-data-table',
  files: ['./src/index.ts'],
  out: './release/index.d.ts',
  project: './'
});
