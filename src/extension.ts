import * as vscode from "vscode";

import WebviewPanel from "./WebviewPanel";
import getWebviewOptions from "./utils/getWebviewOptions";
import { addGitIgnore } from "./utils/previewConfigController";

export const activate = (context: vscode.ExtensionContext) => {
  context.subscriptions.push(
    vscode.commands.registerCommand("preview.start", () => {
      const workspaceFolders = vscode.workspace.workspaceFolders;

      if (!workspaceFolders) return;

      const workspacePath = workspaceFolders[0].uri.path;

      addGitIgnore(workspacePath);

      WebviewPanel.createAndShow(context.extensionUri, workspacePath);
    }),
  );

  if (vscode.window.registerWebviewPanelSerializer) {
    vscode.window.registerWebviewPanelSerializer(WebviewPanel.viewType, {
      async deserializeWebviewPanel(webviewPanel: vscode.WebviewPanel) {
        const workspaceFolders = vscode.workspace.workspaceFolders;

        if (!workspaceFolders) return;

        const workspacePath = workspaceFolders[0].uri.path;

        webviewPanel.webview.options = getWebviewOptions(context.extensionUri);
        WebviewPanel.revive(webviewPanel, context.extensionUri, workspacePath);
      },
    });
  }
};

export const deactivate = () => {
  if (WebviewPanel.currentPanel) {
    WebviewPanel.currentPanel.dispose();
  }
};
