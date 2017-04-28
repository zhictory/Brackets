const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const compiler = webpack({
  entry: {
    main: './app/index.js',
    vendor: ['jquery', 'vue']
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        use: 'css-loader'
      })
    }, {
      test: /\.(png)|(jpg)$/,
      use: 'url-loader?name=img/[name].[ext]&limit=5000'
    }]
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new HtmlWebpackPlugin({
      template: './app/index.html'
    })
  ]
});

const watching = compiler.watch({

}, (err, stats) => {
  if (err || stats.hasErrors()) {
  }
  process.stdout.write(stats.toString({

  } + '/n'))
})
