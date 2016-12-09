const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const WebpackNotifierPlugin = require('webpack-notifier');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;

const commonConfig = require('./webpack.common');
const { ENV, dir } = require('./helpers');

module.exports = function(options) {
  return webpackMerge(commonConfig({ env: ENV }), {
    devtool: 'cheap-module-source-map',
    devServer: {
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
    entry: {
      'app': './demo/bootstrap.ts',
      'polyfills': './demo/polyfills.ts'
    },
    module: {
      exprContextCritical: false,
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          loader: 'source-map-loader',
          exclude: /(node_modules)/
        },
        {
          enforce: 'pre',
          test: /\.ts$/,
          loader: 'tslint-loader',
          exclude: /(node_modules|release|dist)/
        },
        {
          test: /\.ts$/,
          loaders: [
            'awesome-typescript-loader',
            '@angularclass/hmr-loader'
          ],
          exclude: [/\.(spec|e2e|d)\.ts$/]
        },
        {
          test: /\.css/,
          loader: 'style-loader!css-loader?sourceMap'
        },
        {
          test: /\.scss$/,
          loader: 'style-loader!css-loader!postcss-loader?sourceMap!sass-loader?sourceMap'
        }
      ]
    },
    plugins: [
      // new ForkCheckerPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        name: ['polyfills'],
        minChunks: Infinity
      }),
      new HtmlWebpackPlugin({
        template: 'demo/index.ejs',
        chunksSortMode: 'dependency',
        title: 'angular2-data-table'
      }),
      new WebpackNotifierPlugin({
        excludeWarnings: true
      }),
      new ProgressBarPlugin({
        format: chalk.yellow.bold('Webpack Building...') + 
          ' [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)'
      }),
      new webpack.HotModuleReplacementPlugin()
    ]
  });

};
