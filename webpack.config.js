const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
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
  ],
};
