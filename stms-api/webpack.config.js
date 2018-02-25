const path = require('path');
const fs = require('fs');

let nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = {
  entry: ['babel-polyfill', './index.js'],
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: [
      ".js",
      ".json",
    ],
  },
  externals: nodeModules,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [ '@babel/preset-env' ],
            plugins: [
              'transform-class-properties',
              '@babel/plugin-proposal-object-rest-spread',
              'transform-async-to-generator',
              'transform-es2015-modules-commonjs'
            ]
          }
        }
      }
    ]
  }
};