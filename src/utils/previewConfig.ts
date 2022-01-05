import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";

import { Prop, PreviewConfig } from "../types";

export const addGitIgnore = () => {
  const workspaceFolders = vscode.workspace.workspaceFolders;

  if (!workspaceFolders) {
    vscode.window.showInformationMessage("No Active Workspace");
    return;
  }

  const workspacePath = workspaceFolders[0].uri.path;
  const gitIgnorePath = path.join(workspacePath, ".gitignore");

  if (!gitIgnorePath) {
    fs.writeFileSync(gitIgnorePath, "preview.config.json");
    fs.writeFileSync(gitIgnorePath, "\n#React Component Preview\npreview.config.json");
  } else {
    const originalGitignoreContent = fs.readFileSync(gitIgnorePath).toString();

    if (originalGitignoreContent.includes("preview.config.json")) {
      return;
    }

    fs.writeFileSync(
      gitIgnorePath,
      originalGitignoreContent + "\n#React Component Preview\npreview.config.json",
    );
  }
};

export const addPropsInfo = async (name: string, props: Prop[]) => {
  const workspaceFolders = vscode.workspace.workspaceFolders;

  if (!workspaceFolders) {
    vscode.window.showInformationMessage("No Active Workspace");
    return;
  }

  let propInfo = "";

  const workspacePath = workspaceFolders[0].uri.path;
  const previewConfigPath = path.join(workspacePath, "preview.config.json");
  const previewConfigFile = await vscode.workspace.findFiles("preview.config.json");

  if (!previewConfigFile[0]) {
    fs.writeFileSync(previewConfigPath, propInfo);
  }

  const currentConfig = fs.readFileSync(previewConfigPath).toString();
  const currentConfigData = JSON.parse(currentConfig);

  const newProps = {
    name,
    props,
  };

  currentConfigData[newProps.name] = newProps;

  fs.writeFileSync(previewConfigPath, JSON.stringify(currentConfigData));
};

export const getPreviewConfig = (): PreviewConfig | undefined => {
  const workspaceFolders = vscode.workspace.workspaceFolders;

  if (!workspaceFolders) {
    vscode.window.showInformationMessage("No Active Workspace");
    return;
  }

  const workspacePath = workspaceFolders[0].uri.path;
  const previewConfigPath = path.join(workspacePath, "preview.config.json");

  const currentConfig = fs.readFileSync(previewConfigPath).toString();
  const currentConfigData = JSON.parse(currentConfig);

  return currentConfigData;
};
