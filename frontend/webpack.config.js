const { DefinePlugin } = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: process.env.MODE,
  entry: {
    index: "./src/index.tsx",
  },
  output: {
    clean: {
      keep: ".gitkeep",
    },
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "../backend/frontend/static/frontend"),
  },
  devtool: process.env.DEVTOOL,
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.svg$/i,
        oneOf: [
          {
            type: "asset",
            resourceQuery: /url/, // *.svg?url
          },
          {
            issuer: /\.[jt]sx?$/,
            resourceQuery: { not: [/url/] }, // exclude react component if *.svg?url
            use: [
              {
                loader: "@svgr/webpack",
                options: {
                  titleProp: true,
                  descProp: true,
                  svgoConfig: { removeTitle: false, removeDesc: false },
                },
              },
            ],
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  optimization: {
    usedExports: true,
    moduleIds: "deterministic",
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename:
        process.env.MODE == "production"
          ? "../templates/index.html"
          : "../../templates/frontend/index.html", // need to go back because will attempt to create file from output path
      template: "./src/templates/index.html",
      favicon: "./src/assets/images/svgs/logos/logo-logomark.svg",
      inject: false,
    }),
    new DefinePlugin({
      "process.env.MODE": JSON.stringify(process.env.MODE),
    }),
  ],
  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"],
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  watchOptions: {
    ignored: /node_modules/,
  },
};
