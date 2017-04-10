const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const chalk = require('chalk');
const commonConfig = require('./webpack.common');
const { ENV, dir } = require('./helpers');
const combineLoaders = require('webpack-combine-loaders');
const { CheckerPlugin } = require('awesome-typescript-loader');

module.exports = function(env) {
  return webpackMerge(commonConfig({ env: ENV }), {
    devtool: 'inline-source-map',
    plugins: [
      new CheckerPlugin()
    ],
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
          test: /\.ts$/,
          loader: combineLoaders([
            {
              loader: 'awesome-typescript-loader',
              query: {
                sourceMap: false,
                inlineSourceMap: true,
                compilerOptions: {
                  removeComments: true
                }
              }
            },
            {
              loader: 'angular2-template-loader',
              query: {
                sourceMap: false,
                inlineSourceMap: true,
                compilerOptions: {
                  removeComments: true
                }
              }
            }
          ]),
          exclude: [/\.e2e\.ts$/, /(node_modules)/]
        },
        {
          enforce: 'post',
          test: /\.(js|ts)$/,
          loader: 'istanbul-instrumenter-loader',
          include: dir('src'),
          exclude: [
            /\.(e2e|spec)\.ts$/,
            /node_modules/
          ]
        }
      ]
    },
    node: {
      global: true,
      process: false,
      crypto: 'empty',
      module: false,
      clearImmediate: false,
      setImmediate: false
    }
  });
};
