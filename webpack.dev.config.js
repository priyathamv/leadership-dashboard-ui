const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      },
      'API_URL': JSON.stringify('http://10.37.115.116:8080')
    }),
    new webpack.optimize.DedupePlugin(), //dedupe similar code
    new webpack.optimize.UglifyJsPlugin({ //minify everything
      compress:{ warnings: true }
    }),
    // new webpack.optimize.AggressiveMergingPlugin(), //Merge chunks
    new HtmlWebpackPlugin({
      template:'./src/client/index.html',
      filename: 'index.html',
      inject: 'body',
      chunks: ['amcharts.js', 'client.js']
    })
  ]
};
