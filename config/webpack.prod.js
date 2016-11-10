const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const commonConfig = require('./webpack.common');
const { ENV, dir } = require('./helpers');

module.exports = function(env) {
  return webpackMerge(commonConfig({ env: ENV }), {
    devtool: 'source-map',
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
          test: /\.ts$/,
          loaders: [
            'awesome-typescript-loader'
          ],
          exclude: [/\.(spec|e2e|d)\.ts$/]
        },
        {
          test: /\.css/,
          loader:
            ExtractTextPlugin.extract({
              fallbackLoader: 'style',
              loader:'css?sourceMap'
            })
        },
        {
          test: /\.scss$/,
          loader:
            ExtractTextPlugin.extract({
              fallbackLoader: 'style',
              loader: 'css?sourceMap!postcss?sourceMap!sass?sourceMap'
            })
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin({
        filename: '[name].css',
        allChunks: true
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: ['polyfills'],
        minChunks: Infinity
      }),
      new HtmlWebpackPlugin({
        template: 'demo/index.html',
        chunksSortMode: 'dependency',
        title: 'angular2-data-table'
      }),
      new CleanWebpackPlugin(['dist'], {
        root: dir(),
        verbose: false,
        dry: false
      }),
      new webpack.optimize.UglifyJsPlugin()
    ]
  });

};
