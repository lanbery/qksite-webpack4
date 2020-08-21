const { CleanWebpackPlugin } = require("clean-webpack-plugin"),
  CopyWebpackPlugin = require("copy-webpack-plugin"),
  HtmlWebpackPlugin = require("html-webpack-plugin"),
  MiniCssExtractPlugin = require('mini-css-extract-plugin'),
  path = require('path');

const paths = require("./paths"),
  {title} = require('../config');

module.exports = {
  context: paths.context,
  /**
   * Entry
   */
  entry: {
    main: paths.join(paths.src, "index.js"),
  },
  /**
   * Output See:
   * https://webpack.docschina.org/configuration/output/#outputpublicpath
   */
  output: {
    path: paths.build,
    filename: "[name].bundle.js",
    publicPath: "",
  },
  module: {
    rules: [
      /**
       * JavaScript Use Babel to transpile
       */
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader", "eslint-loader"],
      },
      /**
       * Styles Inject CSS into the head with source maps
       */
      {
        test: /\.(scss|css)$/,
        use: [
          // "style-loader",
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { sourceMap: true, importLoaders: 1 },
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      /**
       * Images
       */
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp|svg)$/i,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]",
          context: "src", //
        },
      },
      /**
       * Fonts Inline font files
       */
      {
        test: /\.(woff(2)?|eot|ttf|otf|)$/,
        loader: "url-loader",
        options: {
          limit: 8192,
          name: "[path][name].[ext]",
          context: "src",
        },
      },
    ],
  },
  plugins: [
    /**
     * Removes/cleans build folders and unused assets when rebuilding.
     */
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.posix.join(paths.static.replace(/\\/g, "/"), "**/*"),
          to: "assets",
          globOptions: {
            ignore: ["**/*.DS_Store"],
          },
        },
      ],
    }),

    //   [
    //   {
    //     from: paths.static,
    //     to: "assets",

    //     ignore: ["*.DS_Store"],
    //   },
    // ]),
    new HtmlWebpackPlugin({
      title: title,
      favicon: paths.favicon,
      template: paths.join(paths.src, "temp.html"),
      filename: "index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "css/lbulma.css",
    }),
  ],
};
