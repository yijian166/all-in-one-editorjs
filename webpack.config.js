const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  entry: './index.ts',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   use: [
      //     {
      //       loader: 'babel-loader',
      //       query: {
      //         presets: [ '@babel/preset-env' ],
      //       },
      //     },
      //   ]
      // },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    path: __dirname + '/lib',
    publicPath: '/',
    filename: 'index.js',
    library: 'CodeMirror',
    libraryTarget: 'umd'
  },
  plugins: [new MiniCssExtractPlugin()],
};