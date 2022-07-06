const { DefinePlugin } = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: process.env.MODE,
  entry: {
    index: "./frontend/src/index.tsx", // place where the file to render is
  },
  output: {
    clean: {
      keep: ".gitkeep", // cleans all but this named file
    },
    filename: "[name].[contenthash].js", // forces recaching of css by added hashes to filename
    path: path.resolve(__dirname, "frontend/static/frontend"), // directory where the bundle is placed
  },
  devtool: process.env.DEVTOOL, // for debugging, do NOT use in production
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
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
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
    // all of the following is for chunking to split js into multiple files and prevent reusing code
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
    // automatically adds the hashed js file paths to template
    new HtmlWebpackPlugin({
      filename: "../../templates/frontend/index.html", //need to go back because will attempt to create file at output
      template: "/frontend/src/templates/index.html",
      favicon: "./frontend/src/assets/images/svgs/logos/logo-logomark.svg", //adds favicon to website
    }),
    new DefinePlugin({
      "process.env.MODE": JSON.stringify(process.env.MODE),
    }),
  ],
  resolve: {
    modules: [path.resolve(__dirname, "frontend/src"), "node_modules"],
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  watchOptions: {
    ignored: /node_modules/, // speeds up webpack watch
  },
};
