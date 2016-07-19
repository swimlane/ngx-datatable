var typescript = require('rollup-plugin-typescript');
var sourcemaps = require('rollup-plugin-sourcemaps');
var sass = require('rollup-plugin-sass');

module.exports = {
  entry: './src/angular2-data-table.ts',
  sourceMap: true,
  moduleName: 'angular2-data-table',

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
