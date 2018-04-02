const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    'client': './src/client/index.js',
    'amcharts': ['./amchart_resources/amcharts.js', './amchart_resources/light.js', './amchart_resources/serial.js']
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js'
  },
  module: {
    loaders: [
    {
      test: /.js$/,
      include: path.join(__dirname, 'src'),
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      }
    } ]
  },
  plugins: [
    // new webpack.optimize.UglifyJsPlugin({
    //   minimize: true,
    //   compress: {
    //       warnings: false
    //   }
    // }),
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify('dev'),
      'API_URL': JSON.stringify('http://localhost:8585')
    }),
    new HtmlWebpackPlugin({
      template:'./src/client/public/index.html',
      filename: 'index.html',
      inject: 'body',
      chunks: ['amcharts.js', 'client.js']
    })
  ]
};
