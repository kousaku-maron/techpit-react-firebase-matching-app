const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack')

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  devServer: {
    port: 3000,
    hot: true,
    open: true,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.js(x?)$/,
        loader:'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.ts(x?)$/,
        loader:'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new Dotenv({
      path: path.join(__dirname, process.env.ENV_PATH || '.env'),
      systemvars: true
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
  ],
  resolve: {
    extensions: ['.js','.ts','.tsx']
  }
}
