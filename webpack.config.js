const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
  entry: path.join(__dirname, '/src/index.tsx'),
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: '/'
  },
  devServer: {
    port: 8080,
    static: path.join(__dirname, "public"),
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ "style-loader", "css-loader" ],
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ ".tsx", ".ts", ".js" ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public/index.html"),
    }),
    new CopyWebpackPlugin([{ from: 'public' }])
  ],
};
