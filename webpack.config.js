const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const env = process.env.MIX_ENV || 'dev';
const isProduction = (env === 'prod');

const plugins = [
  new ExtractTextPlugin('css/app.css'),
  new CopyWebpackPlugin([
    { from: './web/static/assets' },
  ]),
];

// This is necessary to get the sass @import's working
const stylePathResolves = (
  `includePaths[]=${path.resolve('./')}&includePaths[]=${path.resolve('./node_modules')}`
);

if (isProduction) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({ minimize: true }));
}

module.exports = {
  entry: [
    './web/static/js/index.jsx',
    './web/static/css/app.sass',
  ],
  output: {
    path: './priv/static',
    filename: 'js/app.js',
  },

  resolve: {
    extensions: ['.jsx', '.js', '.sass'],
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        },
      },
      {
        test: /\.s[a|c]ss$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: `css-loader!sass-loader?indentedSyntax&${stylePathResolves}`,
        }),
      },
    ],
  },
  plugins: plugins,
};
