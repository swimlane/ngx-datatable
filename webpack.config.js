var path = require('path');
var webpack = require('webpack');

var WebpackNotifierPlugin = require('webpack-notifier');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');
var chalk = require('chalk');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var ENV = process.env.NODE_ENV;
var IS_PRODUCTION = ENV === 'production';
var IS_PACKAGE = ENV === 'package';
var VERSION = JSON.stringify(require('./package.json').version);

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}

var banner =
`/**
 * angular2-data-table v${VERSION} (https://github.com/swimlane/angular2-data-table)
 * Copyright 2016
 * Licensed under MIT
 */`;

function webpackConfig(options = {}) {

  var IS_HMR = options.HMR;

  var config = {
    context: root(),
    devtool: 'source-map',

    resolve: {
      extensions: ['.ts', '.js', '.json', '.css', '.scss', '.html'],
      modules: [
        'node_modules',
        root('src'),
        root('demo')
      ]
    },

    entry: {
      'default': './src/components/datatable.scss',
      'app': './demo/bootstrap.ts',
      'polyfills': './demo/polyfills.ts',
      'vendor': './demo/vendor.ts'
    },

    devServer: {
      outputPath: root('dist'),
      watchOptions: {
        poll: true
      },
      port: 9999,
      hot: IS_HMR,
      stats: {
        modules: false,
        cached: false,
        chunk: false
      }
    },

    output: {
      path: root('dist'),
      filename: '[name].js',
      sourceMapFilename: '[name].map',
      chunkFilename: '[id].chunk.js'
    },

    module: {
      exprContextCritical: false,
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          loader: 'source-map',
          exclude: /(node_modules)/
        },
        {
          enforce: 'pre',
          test: /\.ts$/,
          loader: 'tslint',
          exclude: /(node_modules|release|dist)/
        },
        {
          test: /\.ts$/,
          loaders: [
            'awesome-typescript-loader',
            '@angularclass/hmr-loader'
          ],
          exclude: /(node_modules)/
        },
        {
          test: /\.css/,
          loader:
            IS_HMR ?
              'style!css?sourceMap' :
              ExtractTextPlugin.extract({
                fallbackLoader: 'style',
                loader: !IS_PACKAGE ?
                  'css?sourceMap' :
                  // 'css?sourceMap&minimize'
                  'css?sourceMap'
              })
        },
        {
          test: /\.scss$/,
          loader:
            IS_HMR ?
              'style!css!postcss?sourceMap!sass?sourceMap' :
              ExtractTextPlugin.extract({
                fallbackLoader: 'style',
                loader: !IS_PACKAGE ?
                  'css?sourceMap!postcss?sourceMap!sass?sourceMap' :
                  // 'css?sourceMap&minimize!postcss?sourceMap!sass?sourceMap'
                  'css?sourceMap!postcss?sourceMap!sass?sourceMap'
              })
        }
      ]
    },

    plugins: [
      new webpack.NamedModulesPlugin(),

      // https://github.com/angular/angular/issues/11580#issuecomment-246880731
      new webpack.ContextReplacementPlugin(
        // The (\\|\/) piece accounts for path separators in *nix and Windows
        /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
        root('src') // location of your src
      ),

      new webpack.DefinePlugin({
        'ENV': JSON.stringify(ENV),
        'HMR': options.HMR,
        'IS_PRODUCTION': IS_PRODUCTION,
        'APP_VERSION': VERSION
      }),

      new webpack.LoaderOptionsPlugin({
        options: {
          context: root(),
          tslint: {
            emitErrors: false,
            failOnHint: false,
            resourcePath: 'src'
          },
          postcss: function() {
            return [ autoprefixer ];
          }
        }
      })
    ]
  };

  if(IS_HMR) {
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
  } else {
    config.plugins.push(new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true
    }));
  }

  if(IS_PACKAGE) {
    config.output.path = root('release');

    config.output.libraryTarget = 'umd';
    config.output.library = 'angular2-data-table';
    config.output.umdNamedDefine = true;

    config.entry = {
      'index': './src/index.ts'
    };

    config.externals = {
      '@angular/platform-browser-dynamic': '@angular/platform-browser-dynamic',
      '@angular/platform-browser': '@angular/platform-browser',
      '@angular/core': '@angular/core',
      '@angular/common': '@angular/common',
      '@angular/forms': '@angular/forms',
      'core-js': 'core-js',
      'core-js/es6': 'core-js/es6',
      'core-js/es7/reflect': 'core-js/es7/reflect',
      'rxjs': 'rxjs',
      'rxjs/Rx': 'rxjs/Rx',
      'rxjs/Subscription': 'rxjs/Subscription',
      'zone.js/dist/zone': 'zone.js/dist/zone'
    };

    config.plugins.push(new webpack.BannerPlugin({
      banner: banner,
      raw: true,
      entryOnly: true
    }));

    /*
    config.plugins.push(new CleanWebpackPlugin(['release'], {
      root: root(),
      verbose: false,
      dry: false
    }));
    */

  } else {

    config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'polyfills'],
      minChunks: Infinity
    }));

    config.plugins.push(new HtmlWebpackPlugin({
      template: 'demo/index.html',
      chunksSortMode: 'dependency',
      title: 'angular2-data-table'
    }));

    if(IS_PRODUCTION) {

      /*
      config.plugins.push(new CleanWebpackPlugin(['dist'], {
        root: root(),
        verbose: false,
        dry: false
      }));
      */

    } else {
      config.plugins.push(new WebpackNotifierPlugin({
        excludeWarnings: true
      }));

      config.plugins.push(new ProgressBarPlugin({
        format: chalk.yellow.bold('Webpack Building...') + 
          ' [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)'
      }));
    }
  }

  return config;

};

module.exports = webpackConfig;
