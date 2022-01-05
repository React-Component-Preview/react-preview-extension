import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import * as Webpack from "webpack";
import * as WebpackDevServer from "webpack-dev-server";

import createWebpackConfig from "./createWebpackConfig";
import createJSTemplate from "./createJSTemplate";

class PreviewProvider {
  public static preview: PreviewProvider | undefined;

  private _extensionPath: string;
  private _server: WebpackDevServer | undefined;

  public static startPreview(extensionPath: string) {
    PreviewProvider.preview = new PreviewProvider(extensionPath);
  }

  private constructor(extensionPath: string) {
    this._extensionPath = extensionPath;

    const editor = vscode.window.activeTextEditor;
    const workspaceFolders = vscode.workspace.workspaceFolders;

    if (!workspaceFolders) {
      vscode.window.showInformationMessage("No Active Workspace");
      return;
    }

    if (!editor) {
      vscode.window.showInformationMessage("No Active Editor");
      return;
    }

    const workspacePath = workspaceFolders[0].uri.path;
    const currentEditorPath = editor.document.uri.path;

    this.update(currentEditorPath);

    vscode.workspace.onDidSaveTextDocument(() => {
      this.update(currentEditorPath);
    });

    vscode.workspace.onDidOpenTextDocument(() => {
      const editor = vscode.window.activeTextEditor;

      if (!editor) {
        return;
      }

      const changedEditorPath = editor.document.uri.path;

      this.update(changedEditorPath);
    });

    this.startWebpackDevServer(workspacePath);
  }

  private update(currentEditorPath: string) {
    fs.writeFileSync(
      path.join(this._extensionPath, "preview", "index.js"),
      createJSTemplate(currentEditorPath, "Component"),
    );
  }

  private startWebpackDevServer(workspacePath: string) {
    const webpackConfig = createWebpackConfig(9132, this._extensionPath, workspacePath);
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
