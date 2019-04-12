const webpack = require("webpack");
const path = require("path");

const vendors = ["react", "react-dom"];

module.exports = {
  output: {
    path: path.resolve(__dirname, "dist/dll"),
    filename: "[name].js",
    library: "[name]_library"
  },
  entry: {
    ven: vendors
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(__dirname, "dist/dll", "manifest.json"),
      name: "[name]_library"
    })
  ]
};
