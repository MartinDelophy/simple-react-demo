module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: __dirname + "/dist"
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
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          },
          {
            loader: "postcss-loader"
          },
          {
            loader: "less-loader"
          }
        ]
      }
    ]
  }

  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
};
