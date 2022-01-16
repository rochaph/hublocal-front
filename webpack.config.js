const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin").default;
const webpack = require("webpack");

const prod = process.env.NODE_ENV === "production";

module.exports = {
  mode: prod ? "production" : "development",
  entry: "./src/index.tsx",
  output: {
    path: `${__dirname}/dist/`,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        resolve: {
          extensions: [".ts", ".tsx", ".js", ".json"],
        },
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|woff2?|ttf|eot|svg)$/,
        oneOf: [
          {
            resourceQuery: /inline/,
            type: "asset/inline",
          },
          {
            resourceQuery: /raw/,
            type: "asset/source",
          },
          {
            type: "asset/resource",
          },
        ],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
  },
  devtool: prod ? undefined : "source-map",
  plugins: [
    new HtmlWebpackPlugin({
      template: `${__dirname}/public/index.html`,
    }),
    new MiniCssExtractPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
