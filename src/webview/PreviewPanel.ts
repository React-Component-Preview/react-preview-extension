import * as vscode from "vscode";

import getWebviewOptions from "./getWebview";
import getNonce from "./getNonce";

class PreviewPanel {
  public static currentPanel: PreviewPanel | undefined;
  public static readonly viewType = "reactPreview";

  private readonly _panel: vscode.WebviewPanel;
  private readonly _extensionUri: vscode.Uri;
  private _disposable: vscode.Disposable[] = [];

  public static createAndShow(extensionUri: vscode.Uri) {
    const column = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : undefined;

    if (PreviewPanel.currentPanel) {
      PreviewPanel.currentPanel._panel.reveal(column);
      return;
    }

    const panel = vscode.window.createWebviewPanel(
      PreviewPanel.viewType,
      "react-preview",
      vscode.ViewColumn.Beside,
      getWebviewOptions(extensionUri),
    );

    PreviewPanel.currentPanel = new PreviewPanel(panel, extensionUri);
  }

  public static revive(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    PreviewPanel.currentPanel = new PreviewPanel(panel, extensionUri);
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

    this._panel.webview.onDidReceiveMessage(
      (message) => {
        switch (message.command) {
          case "alert":
            vscode.window.showErrorMessage(message.text);
            return;
        }
      },
      null,
      this._disposable,
    );
  }

  public doRefactor() {
    this._panel.webview.postMessage({ command: "refactor" });
  }

  public dispose() {
    PreviewPanel.currentPanel = undefined;

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
    const scriptPathOnDisk = vscode.Uri.joinPath(this._extensionUri, "media", "main.js");

    const scriptUri = scriptPathOnDisk.with({ scheme: "vscode-resource" });

    const styleResetPath = vscode.Uri.joinPath(this._extensionUri, "media", "reset.css");
    const stylesPathMainPath = vscode.Uri.joinPath(this._extensionUri, "media", "vscode.css");

    const stylesResetUri = webview.asWebviewUri(styleResetPath);
    const stylesMainUri = webview.asWebviewUri(stylesPathMainPath);

    const nonce = getNonce();

    return `
		<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">

				<!--
					Use a content security policy to only allow loading images from https or from our extension directory,
					and only allow scripts that have a specific nonce.
				-->
				<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; img-src ${webview.cspSource} https:; script-src 'nonce-${nonce}';">

				<meta name="viewport" content="width=device-width, initial-scale=1.0">

				<link href="${stylesResetUri}" rel="stylesheet">
				<link href="${stylesMainUri}" rel="stylesheet">

				<title>React Component Preview</title>
			</head>
			<body>
        <h1> React Component Preview</h1>

				<script nonce="${nonce}" src="${scriptUri}"></script>
			</body>
			</html>`;
  }
}

export default PreviewPanel;
