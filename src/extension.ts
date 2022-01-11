import * as vscode from "vscode";

import WebviewPanel from "./webviewPanel/WebviewPanel";
import PreviewProvider from "./previewProvider/PreviewProvider";
import getWebviewOptions from "./webviewPanel/getWebviewOptions";

import { addGitIgnore } from "./utils/propsRecord";

export const activate = (context: vscode.ExtensionContext) => {
  context.subscriptions.push(
    vscode.commands.registerCommand("react-preview.start", () => {
      const workspaceFolders = vscode.workspace.workspaceFolders;

      if (!workspaceFolders) return;

      const workspacePath = workspaceFolders[0].uri.path;

      addGitIgnore(workspacePath);

      PreviewProvider.startPreview(context.extensionUri.path, workspacePath);
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
  PreviewProvider.preview?.stopServer();
  WebviewPanel.currentPanel?.dispose();
};
