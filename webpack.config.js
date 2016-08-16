var path = require('path');
var webpack = require('webpack');

var WebpackNotifierPlugin = require('webpack-notifier');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');
var chalk = require('chalk');

var ENV = process.env.NODE_ENV;
var IS_PRODUCTION = ENV === 'production';
var VERSION = JSON.stringify(require('./package.json').version);

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}

function webpackConfig(options = {}) {

  return {
    context: root(),
    debug: true,
    devtool: 'cheap-module-eval-source-map',

    resolve: {
      extensions: ['', '.ts', '.js', '.json', '.css', '.scss', '.html'],
      root: root('src'),
      descriptionFiles: ['package.json'],
      modules: [
        'node_modules',
        root('src')
      ]
    },

    entry: {
      'app': './src/demos/bootstrap.ts',
      'polyfills': './src/polyfills.ts',
      'vendor': './src/vendor.ts'
    },

    devServer: {
      outputPath: root('dist'),
      watchOptions: {
        poll: true
      },
      port: 9999,
      hot: options.HMR,
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
      preLoaders: [{
        test: /\.js$/,
        loader: 'source-map'
      }, {
        test: /\.ts$/,
        loader: 'tslint'
      }],
      loaders: [{
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
        exclude: /(node_modules)/
      }, {
        test: /\.scss$/,
        loaders: ['style', 'css?sourceMap', 'sass?sourceMap']
      }]
    },

    plugins: [
      new webpack.HotModuleReplacementPlugin(),

      new webpack.optimize.CommonsChunkPlugin({
        name: ['vendor', 'polyfills'],
        minChunks: Infinity
      }),

      new webpack.DefinePlugin({
        'ENV': JSON.stringify(ENV),
        'IS_PRODUCTION': IS_PRODUCTION,
        'APP_VERSION': VERSION
      }),

      new WebpackNotifierPlugin({
        excludeWarnings: true
      }),

      new ProgressBarPlugin({
        format: chalk.yellow.bold('Webpack Building...') + ' [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)'
      })
    ],

    tslint: {
      emitErrors: false,
      failOnHint: false,
      resourcePath: 'src'
    }
  }

};

module.exports = webpackConfig;
