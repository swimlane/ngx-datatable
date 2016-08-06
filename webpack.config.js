var path = require('path');
var webpack = require('webpack');

var CleanWebpackPlugin = require('clean-webpack-plugin');
var WebpackNotifierPlugin = require('webpack-notifier');
var ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');

var ENV = process.env.NODE_ENV;
var IS_PRODUCTION = ENV === 'production';
var VERSION = JSON.stringify(require('./package.json').version);

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}

module.exports = {
  resolve: {
    extensions: ['', '.ts', '.js', '.json', '.css', '.scss', '.html'],
    root: root('src'),
    descriptionFiles: ['package.json'],
    modules: [
      root('src'),
      'node_modules'
    ]
  },

  // context: root(),
  debug: true,
  devtool: 'cheap-module-source-map',

  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'source-map'
      },
      {
        test: /\.ts$/,
        loader: 'tslint'
      }
    ],
    loaders: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
        exclude: /(node_modules)/
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css?sourceMap', 'sass?sourceMap']
      }
    ]
  },

  entry: {
    'app': './src/app.ts',
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts'
  },

  devServer: {
    outputPath: root('dist'),
    watchOptions: {
      poll: true
    },
    port: 9999,
    stats: {
      modules: false,
      cached: false,
      colors: true,
      chunk: false
    }
  },

  output: {
    path: root('dist'),
    filename: '[name].[hash].js',
    sourceMapFilename: '[name].[hash].map',
    chunkFilename: '[id].[hash].chunk.js'
  },

  plugins: [
    new ForkCheckerPlugin(),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'polyfills'],
      minChunks: Infinity
    }),

    new webpack.DefinePlugin({
      'ENV': JSON.stringify(ENV),
      'IS_PRODUCTION': IS_PRODUCTION,
      'APP_VERSION': VERSION
    }),

    new HtmlWebpackPlugin({
      template: 'index.html',
      chunksSortMode: 'dependency'
    }),

    new WebpackNotifierPlugin({
      excludeWarnings: true
    }),

    new webpack.optimize.OccurrenceOrderPlugin(true),

    new CleanWebpackPlugin(['dist'], {
      root: root(),
      verbose: false,
      dry: false
    })
  ],

  tslint: {
    emitErrors: false,
    failOnHint: false,
    resourcePath: 'src'
  }
};
