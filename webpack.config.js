const path = require("path");

module.exports = {
  mode: "development",
  entry: path.join(__dirname, "app", "index.tsx"),
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "out", "app"),
  },
  resolve: {
    extensions: [".ts", ".tsx", ".css"],
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: ["babel-plugin-styled-components"],
          },
        },
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: "/node_modules/",
      },
    ],
  },
};
