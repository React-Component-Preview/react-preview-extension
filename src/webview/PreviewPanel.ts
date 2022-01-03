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

  public sendMessage(command: string) {
    this._panel.webview.postMessage({ command });
  }

  private _update() {
    const webview = this._panel.webview;

    this._panel.title = "React Component Preview";
    this._panel.webview.html = this._getHtmlForWebview(webview);
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    const bundleScriptPath = vscode.Uri.joinPath(this._extensionUri, "out", "app", "bundle.js");
    const bundleScriptUri = webview.asWebviewUri(bundleScriptPath);


    return `
		<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">

				<meta name="viewport" content="width=device-width, initial-scale=1.0">

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

export default PreviewPanel;
