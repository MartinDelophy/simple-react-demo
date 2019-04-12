const path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const MyPlugin = require("./MyPlugin/MyPlugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const HtmlWebpackIncludeAssetsPlugin = require("html-webpack-include-assets-plugin");

// process.env.NODE_ENV === 'development'; // 或简写 dev，意为开发环境
// process.env.NODE_ENV === 'production'; // 或简写 prod，意为生产环境
// 有意思！！[id] chunk id; [hash]唯一hash生成;
module.exports = {
  entry: "./src/index.tsx",
  mode: "production", // mode
  output: {
    filename: "[id].[hash].bundle.js",
    path: path.resolve(__dirname, "dist"),
    chunkFilename: "[name].chunk.js"
    // publicPath: "123"
  },

  // Enable sourcemaps for debugging webpack's output.
  /**
     *
  模式	解释
  eval	每个module会封装到 eval 里包裹起来执行，并且会在末尾追加注释 //@ sourceURL.
  source-map	生成一个SourceMap文件.
  hidden-source-map	和 source-map 一样，但不会在 bundle 末尾追加注释.
  inline-source-map	生成一个 DataUrl 形式的 SourceMap 文件.
  eval-source-map	每个module会通过eval()来执行，并且生成一个DataUrl形式的SourceMap.
  cheap-source-map	生成一个没有列信息（column-mappings）的SourceMaps文件，不包含loader的 sourcemap（譬如 babel 的 sourcemap）
  cheap-module-source-map	生成一个没有列信息（column-mappings）的SourceMaps文件，同时 loader 的 sourcemap 也被简化为只包含对应行的。
     */
  devtool: "source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    alias: {
      "@": path.resolve(__dirname, "src")
    },
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      //比起tsloader编译速度更快
      {
        test: /\.tsx?$/,
        loader: "babel-loader"
      },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      //提取所有的js后缀的文件进入的sourcemap中
      //css-loader: 加载.css文件
      // style - loader: 使用 < style > 将css - loader内部样式注入到我们的HTML页面
      //postcss 预编译，解析
      // { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      {
        test: /\.(css|less)$/,
        use: [
          // MiniCssExtractPlugin.loader,
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              importLoaders: 1
            } // translates CSS into CommonJS
          },
          {
            loader: "less-loader", // compiles Less to CSS
            options: {
              //用于定制antdesign主题
              modifyVars: {
                "primary-color": "#1DA57A",
                "link-color": "#1DA57A",
                "border-radius-base": "2px"
              },
              javascriptEnabled: true,
              sourceMap: true
            }
          }
          // {
          //   test: /\.jpeg$/,
          //   use: [
          //     {
          //       loader: "url-loader",
          //       options: {
          //         limit: "1024"
          //       }
          //     }
          //   ]
          // }
          // {
          //   test: /\.(png|svg|jpe?g|gif)$/i,
          //   use: [
          //     {
          //       loader: "file-loader",
          //       options: {
          //         limit: 500,
          //         outputPath: "public/images/",
          //         name: "[name].[hash:8].[ext]"
          //       }
          //     }
          //   ]
          // }
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProgressPlugin(),
    // new CleanWebpackPlugin({
    //   verbose: true,
    //   cleanOnceBeforeBuildPatterns: ["./dist"],
    //   dangerouslyAllowCleanPatternsOutsideProject: true
    // }),
    new HtmlWebpackPlugin({
      inject: true,
      template: "./index.html"
    }),
    new HtmlWebpackIncludeAssetsPlugin({
      assets: [{ path: "dll", glob: "*.js" }],
      append: true
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new webpack.DllReferencePlugin({
      // context: __dirname,
      manifest: path.resolve(__dirname, "dist/dll/manifest.json")
      // name: "./build/vendor.js",
      // scope: "xyz",
      // sourceType: "commonjs2"
    }),
    new CopyPlugin([{ from: "one", to: "dist" }]),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "process.env.DEBUG": JSON.stringify(process.env.DEBUG)
    })
    // new MyPlugin()
  ],
  optimization: {
    namedModules: false,
    namedChunks: false,
    nodeEnv: "production",
    flagIncludedChunks: true,
    occurrenceOrder: true,
    sideEffects: true,
    usedExports: true,
    concatenateModules: true,
    splitChunks: {
      hidePathInfo: true,
      minSize: 30000,
      maxAsyncRequests: 5,
      maxInitialRequests: 3
    },
    noEmitOnErrors: true,
    checkWasmTypes: true,
    minimize: true,
    minimizer: [
      new TerserJSPlugin({}),
      new OptimizeCSSAssetsPlugin({}),
      new UglifyJsPlugin()
    ],
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: "vendorTest",
          chunks: "all"
        }
      }
    }
  }

  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
};
