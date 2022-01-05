import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import * as Webpack from "webpack";
import * as WebpackDevServer from "webpack-dev-server";

import WebviewPanel from "./webview/WebviewPanel";
import getWebviewOptions from "./webview/getWebviewOptions";

const createWebpackConfig = require("./utils/createWebpackConfig");

let server: WebpackDevServer;

export const activate = (context: vscode.ExtensionContext) => {
  context.subscriptions.push(
    vscode.commands.registerCommand("react-preview.start", () => {
      WebviewPanel.createAndShow(context.extensionUri);
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

export const deactivate = () => {
  WebviewPanel.currentPanel?.dispose();
};
