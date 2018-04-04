const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-source-map',
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
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('dev')
      },
      'API_URL': JSON.stringify('http://localhost:8585')
    }),
    new HtmlWebpackPlugin({
      template:'./src/client/index.html',
      filename: 'index.html',
      inject: 'body',
      chunks: ['amcharts.js', 'client.js']
    })
  ]
};
