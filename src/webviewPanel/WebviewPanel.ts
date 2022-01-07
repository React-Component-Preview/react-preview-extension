import * as vscode from "vscode";

import getWebviewOptions from "./getWebviewOptions";

class WebviewPanel {
  public static currentPanel: WebviewPanel | undefined;
  public static readonly viewType = "reactPreview";

  private readonly _panel: vscode.WebviewPanel;
  private readonly _extensionUri: vscode.Uri;
  private _disposable: vscode.Disposable[] = [];

  public static createAndShow(extensionUri: vscode.Uri) {
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

    WebviewPanel.currentPanel = new WebviewPanel(panel, extensionUri);
  }

  public static revive(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    WebviewPanel.currentPanel = new WebviewPanel(panel, extensionUri);
  }

  private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    this._panel = panel;
    this._extensionUri = extensionUri;

    this._update();

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

  private _update() {
    const webview = this._panel.webview;

    this._panel.title = "React Component Preview";
    this._panel.webview.html = this._getHtmlForWebview(webview);
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    const bundleScriptPath = vscode.Uri.joinPath(this._extensionUri, "out", "app", "bundle.js");
    const bundleScriptUri = webview.asWebviewUri(bundleScriptPath);

    const styleResetPath = vscode.Uri.joinPath(this._extensionUri, "app", "reset.css");
    const stylesResetUri = webview.asWebviewUri(styleResetPath);

    return `
		<!DOCTYPE html>
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
