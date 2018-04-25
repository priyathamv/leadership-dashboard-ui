const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: {
    'client': './src/client/index.js',
    'amcharts': ['./amchart_resources/amcharts.js', './amchart_resources/light.js', './amchart_resources/serial.js']
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /.js$/,
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/,
        loader: 'babel-loader?' + JSON.stringify({ presets: ['react', 'es2015', 'stage-1'] })
      },
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: path.join(__dirname, 'src/client/public/'),
        to: path.join(__dirname, 'build/'),
        cache: true
      }
    ]),
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production') // Required to make react faster, as it doesnt execute any dev checks
      },
      'API_URL': JSON.stringify('http://localhost:8585')
      // 'API_URL': JSON.stringify('http://api.stg.forecasting-analytics.prod.walmart.com')
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: true,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true
      }
    }),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    new HtmlWebpackPlugin({
      template:'./src/client/index.html',
      filename: 'index.html',
      inject: 'body',
      chunks: ['amcharts.js', 'client.js'],
      minify: {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true
      }
    })
  ]
};
