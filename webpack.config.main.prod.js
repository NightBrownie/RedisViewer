/**
 * Webpack config for production electron main process
 */

import webpack from 'webpack'
import merge from 'webpack-merge'
import BabiliPlugin from 'babili-webpack-plugin'
import baseConfig from './webpack.config.base'

export default merge(baseConfig, {
  devtool: 'source-map',

  entry: ['babel-polyfill', './app/main.development'],

  // 'main.development.js' in root
  output: {
    path: __dirname,
    filename: './app/main.js'
  },

  plugins: [
    new BabiliPlugin(),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],

  target: 'electron-main',

  node: {
    __dirname: false,
    __filename: false
  }
})
