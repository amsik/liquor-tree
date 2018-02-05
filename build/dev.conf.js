'use strict'

const path = require('path')
const pkg = require('../package.json')
const webpack = require('webpack')

const CopyWebpackPlugin = require('copy-webpack-plugin')

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

  devtool: 'eval-source-map',

  devServer: {
    contentBase: path.resolve(__dirname, "..", "demo"),
    compress: true,
    port: 9000,
    publicPath: '/',
    open: true,
    hot: true,
    watchOptions: {
      poll: false
    },
    lazy: false
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': '"development"'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    new CopyWebpackPlugin([
    {
        from: path.resolve(__dirname, '../dist'),
        to: 'dist',
        ignore: ['.*']
    }])
  ]
}
