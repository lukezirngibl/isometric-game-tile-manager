
var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/algorithm.js',
  output: {
    libraryTarget: 'umd',
    path: path.resolve(__dirname, ''),
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: {
            plugins: ['transform-object-rest-spread'],
            presets: ['env']
          },
        }]
      },
    ]
  },
  plugins: []
};
