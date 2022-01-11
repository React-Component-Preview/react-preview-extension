const path = require("path");

const createWebpackConfig = (extensionPath: string, workspacePath: string) => {
  return {
    mode: "development",
    context: extensionPath,
    entry: path.join(extensionPath, "preview", "index.js"),
    output: {
      filename: "bundle.js",
      path: path.resolve(extensionPath, "preview"),
    },
    devtool: false,
    resolve: {
      modules: [
        path.join(workspacePath, "node_modules"),
        path.join(extensionPath, "node_modules"),
      ],
      extensions: [".js", ".json", ".jsx"],
    },
    module: {
      rules: [
        {
          test: /\.(html)$/,
          use: ["html-loader"],
        },
        {
          test: /\.m?(js|jsx)$/,
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
    stats: "errors-only",
    devServer: {
      static: {
        directory: path.join(extensionPath, "preview"),
        watch: true,
      },
      port: 9132,
      host: "localhost",
      client: {
        overlay: false,
        logging: "none",
      },
    },
  };
};

module.exports = createWebpackConfig;
