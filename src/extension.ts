import * as vscode from "vscode";

import PreviewPanel from "./webview/PreviewPanel";
import getWebviewOptions from "./webview/getWebview";

export const activate = (context: vscode.ExtensionContext) => {
  context.subscriptions.push(
    vscode.commands.registerCommand("react-preview.start", () => {
      PreviewPanel.createAndShow(context.extensionUri);
    }),
  );

  if (vscode.window.registerWebviewPanelSerializer) {
    vscode.window.registerWebviewPanelSerializer(PreviewPanel.viewType, {
      async deserializeWebviewPanel(webviewPanel: vscode.WebviewPanel) {
        webviewPanel.webview.options = getWebviewOptions(context.extensionUri);
        PreviewPanel.revive(webviewPanel, context.extensionUri);
      },
    });
  }
};

export const deactivate = () => {};
