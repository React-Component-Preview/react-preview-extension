import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

const Webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const createWebpackConfig = require("./createWebpackConfig");

import createJSTemplate from "./createJSTemplate";
import WebviewPanel from "../webviewPanel/WebviewPanel";
import { createAndShowPreviewConfig } from "../utils/propsRecord";

class PreviewProvider {
  public static preview: PreviewProvider | undefined;

  private _extensionPath: string;
  private _workspacePath: string;
  private _server: typeof WebpackDevServer | undefined;

  public static startPreview(extensionPath: string, workspacePath: string) {
    PreviewProvider.preview = new PreviewProvider(extensionPath, workspacePath);
  }

  private constructor(extensionPath: string, workspacePath: string) {
    this._extensionPath = extensionPath;
    this._workspacePath = workspacePath;

    this.update();

    vscode.window.onDidChangeActiveTextEditor(() => {
      this.update();
    });

    vscode.workspace.onDidSaveTextDocument(() => {
      this.update();
    });

    this.startWebpackDevServer();
  }

  public async update() {
    const currentPanel = WebviewPanel.currentPanel;

    if (!currentPanel) return;

    const allProps = await createAndShowPreviewConfig(this._workspacePath);
    const currentProps = allProps && allProps[currentPanel.currentComponentName];

    fs.writeFileSync(
      path.join(this._extensionPath, "preview", "index.js"),
      createJSTemplate(
        currentPanel.currentComponentPath,
        currentPanel.currentComponentName,
        currentProps,
      ),
    );
  }

  private startWebpackDevServer() {
    const webpackConfig = createWebpackConfig(this._extensionPath, this._workspacePath);
    const compiler = Webpack(webpackConfig);
    const devServerOptions = { ...webpackConfig.devServer, open: false };
    this._server = new WebpackDevServer(devServerOptions, compiler);

    this._server.startCallback(() => {
      console.log("start preview");
    });
  }

  public stopServer() {
    this._server?.stopCallback(() => {
      console.log("previewEnd");
    });
  }
}

export default PreviewProvider;
