const path = require("path");

const createWebpackConfig = (
  extensionPath: string,
  workspacePath: string,
) => {
  return {
    mode: "development",
    entry: path.join(extensionPath, "preview", "index.js"),
    output: {
      path: path.resolve(extensionPath, "preview"),
    },
    devtool: false,
    resolve: {
      modules: [
        path.join(extensionPath, "node_modules"),
        path.join(workspacePath, "node_modules"),
        "node_modules",
      ],
      extensions: [".js", ".json", ".jsx"],
    },
    context: extensionPath,
    module: {
      rules: [
        {
          test: /\.(html)$/,
          use: ["html-loader"],
        },
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
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    stats: "errors-only",
  };
};

module.exports = createWebpackConfig;
