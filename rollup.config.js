var typescript = require('rollup-plugin-typescript');
var sourcemaps = require('rollup-plugin-sourcemaps');
var sass = require('rollup-plugin-sass');

module.exports = {
  entry: './src/angular2-data-table.ts',
  sourceMap: true,
  moduleId: 'angular2-data-table',
  moduleName: 'angular2DataTable',

  external: [
		'typescript'
	],

  plugins: [
    typescript({
      typescript: require('typescript')
    }),
    sourcemaps(),
    sass()
  ]
}
