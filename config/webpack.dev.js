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
      outputPath: dir('dist'),
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
          exclude: [/\.(spec|e2e|d)\.ts$/]
        },
        {
          test: /\.css/,
          loader: 'style!css?sourceMap'
        },
        {
          test: /\.scss$/,
          loader: 'style!css!postcss?sourceMap!sass?sourceMap'
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
        template: 'demo/index.html',
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
