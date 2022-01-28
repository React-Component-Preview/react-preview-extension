import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import * as Webpack from "webpack";
import * as WebpackDevServer from "webpack-dev-server";

import getWebviewOptions from "./utils/getWebviewOptions";
import createJSTemplate from "./utils/createJSTemplate";
import createWebpackConfig from "./utils/createWebpackConfig";
import {
  createAndShowPreviewConfig,
  addPropInfo,
  removePropInfo,
  updatePropInfo,
} from "./utils/previewConfigController";

import { Prop } from "./types.d";

class WebviewPanel {
  public static currentPanel: WebviewPanel | undefined;
  public static readonly viewType = "reactPreview";

  private readonly _workspacePath: string;
  private readonly _panel: vscode.WebviewPanel;
  private readonly _extensionUri: vscode.Uri;
  private _previewServer: WebpackDevServer | undefined;
  private _disposable: vscode.Disposable[] = [];
  private _currentComponentName: string = "";
  private _currentComponentPath: string = "";
  private _currentComponentPropList: Prop[] = [];

  public static createAndShow(extensionUri: vscode.Uri, workspacePath: string) {
    if (WebviewPanel.currentPanel) {
      WebviewPanel.currentPanel._panel.reveal(vscode.ViewColumn.Beside);
      return;
    }

    const panel = vscode.window.createWebviewPanel(
      WebviewPanel.viewType,
      "react-preview",
      vscode.ViewColumn.Beside,
      getWebviewOptions(extensionUri),
    );

    WebviewPanel.currentPanel = new WebviewPanel(
      panel,
      extensionUri,
      workspacePath,
    );
  }

  public static revive(
    panel: vscode.WebviewPanel,
    extensionUri: vscode.Uri,
    workspacePath: string,
  ) {
    WebviewPanel.currentPanel = new WebviewPanel(
      panel,
      extensionUri,
      workspacePath,
    );
  }

  private constructor(
    panel: vscode.WebviewPanel,
    extensionUri: vscode.Uri,
    workspacePath: string,
  ) {
    this._panel = panel;
    this._extensionUri = extensionUri;
    this._workspacePath = workspacePath;

    this._updateWebview();

    vscode.workspace.onDidSaveTextDocument(
      () => {
        const editor = vscode.window.activeTextEditor;

        if (!editor) {
          return;
        }

        if (
          editor.document.languageId !== "javascript" &&
          editor.document.languageId !== "javascriptreact"
        ) {
          return;
        }

        this._updatePreview();
      },
      null,
      this._disposable,
    );

    vscode.window.onDidChangeActiveTextEditor(
      () => {
        const editor = vscode.window.activeTextEditor;

        if (!editor) {
          return;
        }

        if (
          editor.document.languageId !== "javascript" &&
          editor.document.languageId !== "javascriptreact"
        ) {
          return;
        }

        this._updateWebview();
      },
      null,
      this._disposable,
    );

    this._panel.webview.onDidReceiveMessage(
      (message) => {
        switch (message.command) {
          case "add":
            addPropInfo(
              this._workspacePath,
              this._currentComponentName,
              message.payload,
            );
            this._updateWebview();
          case "delete":
            removePropInfo(
              this._workspacePath,
              this._currentComponentName,
              message.propName,
            );
            this._updateWebview();
          case "update":
            updatePropInfo(
              this._workspacePath,
              this._currentComponentName,
              message.prevPropName,
              message.payload,
            );
            this._updatePreview();
        }
      },
      null,
      this._disposable,
    );

    this._panel.onDidDispose(() => this.dispose(), null, this._disposable);
  }

  public dispose() {
    WebviewPanel.currentPanel = undefined;

    this._panel.dispose();
    this._stopPreviewServer();

    while (this._disposable.length) {
      const x = this._disposable.pop();

      if (x) {
        x.dispose();
      }
    }
  }

  private _updateWebview() {
    const webview = this._panel.webview;

    this._panel.title = "React Component Preview";
    this._panel.iconPath = vscode.Uri.joinPath(this._extensionUri, "icon.png");
    this._panel.webview.html = this._getHtmlForWebview(webview);

    this._updateCurrentComponentPathAndName();
    this._updateCurrentPropList();

    this._panel.webview.postMessage({
      command: "updateComponent",
      currentComponentName: this._currentComponentName,
      propList: this._currentComponentPropList,
    });

    this._updatePreview();
  }

  private _updatePreview() {
    this._updateCurrentPropList();

    fs.writeFileSync(
      path.resolve(this._extensionUri.path, "preview", "index.js"),
      createJSTemplate(
        this._currentComponentPath,
        this._currentComponentName,
        this._currentComponentPropList,
      ),
    );

    if (!this._previewServer) {
      this._startPreviewServer();
    }
  }

  private _updateCurrentComponentPathAndName() {
    const editor = vscode.window.activeTextEditor;

    if (!editor) {
      return;
    }

    if (
      editor.document.languageId !== "javascript" &&
      editor.document.languageId !== "javascriptreact"
    ) {
      return;
    }

    this._currentComponentPath = editor.document.uri.path;
    const activeFileName = this._currentComponentPath.split("/").pop() as string;
    this._currentComponentName = activeFileName.split(".")[0];
  }

  private _updateCurrentPropList() {
    const props = createAndShowPreviewConfig(this._workspacePath);
    this._currentComponentPropList = props[this._currentComponentName] || [];
  }

  private _startPreviewServer() {
    const webpackConfig = createWebpackConfig(
      this._extensionUri.path,
      this._workspacePath,
    );

    const compiler = Webpack(webpackConfig);
    const devServerOptions = { ...webpackConfig.devServer, open: false };
    this._previewServer = new WebpackDevServer(devServerOptions, compiler);

    this._previewServer.startCallback(() => {
      console.log("start preview");
    });
  }

  private _stopPreviewServer() {
    if (this._previewServer) {
      this._previewServer.stopCallback(() => {
        console.log("stop preview");
      });

      this._previewServer = undefined;
    }
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    const styleResetPath = vscode.Uri.joinPath(
      this._extensionUri,
      "app",
      "reset.css",
    );
    const stylesResetUri = webview.asWebviewUri(styleResetPath);

    const bundleScriptPath = vscode.Uri.joinPath(
      this._extensionUri,
      "out",
      "app",
      "bundle.js",
    );
    const bundleScriptUri = webview.asWebviewUri(bundleScriptPath);

    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link href="${stylesResetUri}" rel="stylesheet">

      <title>React Component Preview</title>
    </head>
    <body>
      <div id="root"></div>
      <script>
        const vscode = acquireVsCodeApi();
      </script>
      <script src="${bundleScriptUri}"></script>
    </body>
    </html>`;
  }
}

export default WebviewPanel;
