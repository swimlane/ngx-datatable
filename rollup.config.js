'use strict';

var typescript = require('rollup-plugin-typescript');
var sourcemaps = require('rollup-plugin-sourcemaps');
var sass = require('rollup-plugin-sass');
var pkg = require('./package.json');

var banner =
`/**
 * angular2-data-table v${pkg.version} (https://github.com/swimlane/angular2-data-table)
 * Copyright 2016
 * Licensed under MIT
 */`;

module.exports = {
  entry: './src/angular2-data-table.ts',
  sourceMap: true,
  moduleId: 'angular2-data-table',
  moduleName: 'angular2DataTable',

  banner: banner,

  external: [
		'typescript',
    'core-js',
    '@angular/core',
    '@angular/common',
    '@angular/core',
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic',
    'rxjs/Rx'
  ],

  globals: {
    '@angular/core': 'ng.core',
    '@angular/common': 'ng.common',
    '@angular/compiler': 'ng.compiler',
    '@angular/platform-browser': 'ng.platformBrowser',
    '@angular/platform-browser-dynamic': 'ng.platformBrowserDynamic',

    'rxjs/Subject': 'Rx',
    'rxjs/observable/PromiseObservable': 'Rx',
    'rxjs/operator/toPromise': 'Rx.Observable.prototype',
    'rxjs/Observable': 'Rx',
    'rxjs/Rx': 'Rx'
  },

  plugins: [
    typescript({
      typescript: require('typescript')
    }),
    sourcemaps(),
    sass()
  ]
}
