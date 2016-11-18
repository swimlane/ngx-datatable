const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const chalk = require('chalk');
const commonConfig = require('./webpack.common');
const { ENV, dir } = require('./helpers');

module.exports = function(env) {
  return webpackMerge(commonConfig({ env: ENV }), {
    devtool: 'inline-source-map',
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
          loader: 'awesome-typescript-loader',
          query: {
            sourceMap: false,
            inlineSourceMap: true,
            compilerOptions: {
              removeComments: true
            }
          },
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
