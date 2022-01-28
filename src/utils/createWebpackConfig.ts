import * as path from "path";
import * as Webpack from "webpack";

const createWebpackConfig = (
  extensionPath: string,
  workspacePath: string,
): Webpack.Configuration => {
  const babelLoader = require.resolve("babel-loader");
  const babelPresetList = ["@babel/preset-env", "@babel/preset-react"].map(
    (preset) => require.resolve(preset),
  );
  const cssLoaderList = ["style-loader", "css-loader"].map((loader) =>
    require.resolve(loader),
  );

  return {
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
          use: ["htmlLoader"],
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: babelLoader,
            options: {
              presets: babelPresetList,
            },
          },
        },
        {
          test: /\.css$/,
          use: cssLoaderList,
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          use: [
            {
              loader: require.resolve("file-loader"),
            },
          ],
        },
        {
          test: /\.(ttf|eot|woff|woff2)$/,
          use: [
            {
              loader: require.resolve("file-loader"),
            },
          ],
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
