'use strict'

const path = require('path')
const pkg = require('../package.json')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  context: path.resolve(__dirname, '../'),

  entry: {
    app: './src/main.js'
  },

  output: {
    path: path.resolve(__dirname, ".."),
    filename: pkg.module
  },

  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve('src'),
    }
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [path.resolve('src')]
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': '"production"'
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: false,
      parallel: true
    })
  ]
}
