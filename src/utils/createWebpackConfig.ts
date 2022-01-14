import * as path from "path";
import * as Webpack from "webpack";

const createWebpackConfig = (
  extensionPath: string,
  workspacePath: string,
): Webpack.Configuration => {
  const cssLoaderList = ["style-loader", "css-loader"].map((loader) => require.resolve(loader));
  const babelPresetList = ["@babel/preset-env", "@babel/preset-react"].map((preset) =>
    require.resolve(preset),
  );

  return {
    mode: "development",
    context: path.resolve(extensionPath, "preview"),
    entry: path.resolve(extensionPath, "preview", "index.js"),
    output: {
      filename: "bundle.js",
      path: path.resolve(extensionPath, "preview"),
    },
    plugins: [
      new Webpack.ProvidePlugin({
        React: "react",
      }),
    ],
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
              presets: babelPresetList,
            },
          },
        },
        {
          test: /\.css$/,
          use: cssLoaderList,
        },
      ],
    },
    stats: "errors-only",
    devServer: {
      static: {
        directory: path.resolve(extensionPath, "preview"),
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

export default createWebpackConfig;
