const path = require("path");

const createWebpackConfig = (devServerPort = 9132, extensionPath: string, workspacePath: string) => {
  const config = {
    mode: "development",
    entry: path.join(extensionPath, "preview", "index.js"),
    output: {
      path: path.resolve(extensionPath, "preview"),
    },
    devtool: false,
    resolve: {
      modules: [path.join(extensionPath, "node_modules"), path.join(workspacePath, "node_modules"), "node_modules"],
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
            },
          },
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    devServer: {
      static: {
        directory: path.join(extensionPath, "preview"),
        watch: true,
      },
      port: devServerPort,
      host: "localhost",
      client: {
        overlay: true,
        logging: "info",
      },
    },
  };

  return config;
};

module.exports = createWebpackConfig;
