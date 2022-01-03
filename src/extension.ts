import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import * as Webpack from "webpack";
import * as WebpackDevServer from "webpack-dev-server";

import PreviewPanel from "./webview/PreviewPanel";
import getWebviewOptions from "./webview/getWebview";

const createWebpackConfig = require("./utils/createWebpackConfig");

export const activate = (context: vscode.ExtensionContext) => {
  context.subscriptions.push(
    vscode.commands.registerCommand("react-preview.start", () => {
      PreviewPanel.createAndShow(context.extensionUri);

      const editor = vscode.window.activeTextEditor;
      const workspaceFolders = vscode.workspace.workspaceFolders;

      if (!workspaceFolders) {
        vscode.window.showInformationMessage("No Active Editor");
        return;
      }

      if (!editor) {
        vscode.window.showInformationMessage("No Active Editor");
        return;
      }

      const currentEditorText = editor.document.getText();

      const extensionPath = context.extensionPath;
      const workspacePath = workspaceFolders[0].uri.path;

      fs.writeFileSync(path.join(extensionPath, "preview", "Component.js"), currentEditorText);

      const webpackConfig = createWebpackConfig(9132, extensionPath, workspacePath);
      const compiler = Webpack(webpackConfig);
      const devServerOptions = { ...webpackConfig.devServer, open: true };
      const server = new WebpackDevServer(devServerOptions, compiler);

      server.startCallback(() => {
        PreviewPanel.currentPanel?.sendMessage("previewReady");
      });
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
