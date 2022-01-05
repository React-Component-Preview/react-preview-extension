import * as vscode from "vscode";

import WebviewPanel from "./webview/WebviewPanel";
import getWebviewOptions from "./webview/getWebviewOptions";

import PreviewProvider from "./previewProvider/PreviewProvider";

export const activate = (context: vscode.ExtensionContext) => {
  context.subscriptions.push(
    vscode.commands.registerCommand("react-preview.start", () => {
      WebviewPanel.createAndShow(context.extensionUri);
      PreviewProvider.startPreview(context.extensionUri.path);
    }),
  );

  if (vscode.window.registerWebviewPanelSerializer) {
    vscode.window.registerWebviewPanelSerializer(WebviewPanel.viewType, {
      async deserializeWebviewPanel(webviewPanel: vscode.WebviewPanel) {
        webviewPanel.webview.options = getWebviewOptions(context.extensionUri);
        WebviewPanel.revive(webviewPanel, context.extensionUri);
      },
    });
  }
};

export const deactivate = () => {
  PreviewProvider.preview?.stopServer();
  WebviewPanel.currentPanel?.dispose();
};
