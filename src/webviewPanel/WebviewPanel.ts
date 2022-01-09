import * as vscode from "vscode";

import getWebviewOptions from "./getWebviewOptions";
import PreviewProvider from "../previewProvider/PreviewProvider";
import { createAndShowPreviewConfig, addPropsInfo, deletePropsInfo } from "./../utils/propsRecord";

class WebviewPanel {
  public static currentPanel: WebviewPanel | undefined;
  public static readonly viewType = "reactPreview";

  private readonly _workspacePath: string;
  private readonly _panel: vscode.WebviewPanel;
  private readonly _extensionUri: vscode.Uri;
  private _disposable: vscode.Disposable[] = [];

  public currentComponentName: string = "";
  public currentComponentPath: string = "";

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

    WebviewPanel.currentPanel = new WebviewPanel(panel, extensionUri, workspacePath);
  }

  public static revive(
    panel: vscode.WebviewPanel,
    extensionUri: vscode.Uri,
    workspacePath: string,
  ) {
    WebviewPanel.currentPanel = new WebviewPanel(panel, extensionUri, workspacePath);
  }

  private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri, workspacePath: string) {
    this._panel = panel;
    this._extensionUri = extensionUri;
    this._workspacePath = workspacePath;

    const editor = vscode.window.activeTextEditor;

    if (!editor) return;

    this.currentComponentPath = editor.document.uri.path;
    const activeFileName = this.currentComponentPath.split("/").pop() as string;
    this.currentComponentName = activeFileName.split(".")[0];

    this._update();

    this._panel.webview.onDidReceiveMessage(async (message) => {
      switch (message.command) {
        case "add":
          await addPropsInfo(this._workspacePath, this.currentComponentName, message.payload);
        case "delete":
          await deletePropsInfo(this._workspacePath, this.currentComponentName, message.propName);
      }

      this._update();
      PreviewProvider.preview?.update();
    });

    vscode.window.onDidChangeActiveTextEditor(() => {
      const editor = vscode.window.activeTextEditor;

      if (!editor) return;

      this.currentComponentPath = editor.document.uri.path;
      const activeFileName = this.currentComponentPath.split("/").pop() as string;
      this.currentComponentName = activeFileName.split(".")[0];

      this._update();
    });

    this._panel.onDidDispose(() => this.dispose(), null, this._disposable);

    this._panel.onDidChangeViewState(
      () => {
        if (this._panel.visible) {
          this._update();
        }
      },
      null,
      this._disposable,
    );
  }

  public dispose() {
    WebviewPanel.currentPanel = undefined;

    this._panel.dispose();

    while (this._disposable.length) {
      const x = this._disposable.pop();

      if (x) {
        x.dispose();
      }
    }
  }

  private async _update() {
    const webview = this._panel.webview;

    this._panel.title = "React Component Preview";
    this._panel.webview.html = this._getHtmlForWebview(webview);

    const props = await createAndShowPreviewConfig(this._workspacePath);
    const currentProps = props[this.currentComponentName];

    this._panel.webview.postMessage({ propList: currentProps });
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    const styleResetPath = vscode.Uri.joinPath(this._extensionUri, "app", "reset.css");
    const stylesResetUri = webview.asWebviewUri(styleResetPath);

    const bundleScriptPath = vscode.Uri.joinPath(this._extensionUri, "out", "app", "bundle.js");
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
