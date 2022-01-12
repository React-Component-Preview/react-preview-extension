const path = require("path");

module.exports = {
  context: path.resolve(__dirname, "app"),
  entry: path.resolve(__dirname, "app", "index.tsx"),
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "out", "app"),
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".css"],
  },
  devtool: false,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: "/node_modules/",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
