import * as path from "path";
import { Configuration } from "webpack";

const createWebpackConfig = (
  extensionPath: string,
  workspacePath: string,
): Configuration => {
  return {
    mode: "development",
    context: path.resolve(extensionPath, "preview"),
    entry: path.resolve(extensionPath, "preview", "index.js"),
    output: {
      filename: "bundle.js",
      path: path.resolve(extensionPath, "preview"),
    },
    devtool: false,
    resolve: {
      modules: [
        path.resolve(extensionPath, "node_modules"),
        path.resolve(workspacePath, "node_modules"),
      ],
      extensions: [".js", ".jsx"],
    },
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
              presets: [["@babel/preset-env", { targets: "defaults" }], "@babel/preset-react"],
            },
          },
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    // stats: "errors-only",
    devServer: {
      static: {
        directory: path.resolve(extensionPath, "preview"),
        watch: true,
      },
      port: 9132,
      host: "localhost",
      client: {
        overlay: false,
        logging: "info",
      },
    },
  };
};

export default createWebpackConfig;
