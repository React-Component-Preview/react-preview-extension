import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {

  context.subscriptions.push(vscode.commands.registerCommand("react-component-preview.active", () => {
    vscode.window.showInformationMessage("Hello World from React Component Preview!");
  }));
}

export function deactivate() {}
