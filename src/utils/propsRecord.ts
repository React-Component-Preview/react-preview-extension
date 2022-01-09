import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs/promises";

import { Prop, PreviewConfig } from "./../types.d";

const gitIgnoreContent = "\n#React Component Preview\npreviewConfig.json";

export const addGitIgnore = async (workspacePath: string) => {
  const gitIgnoreFiles = await vscode.workspace.findFiles(".gitignore");
  const gitIgnorePath = gitIgnoreFiles[0] ? gitIgnoreFiles[0].path : undefined;

  if (!gitIgnorePath) {
    await fs.writeFile(path.join(workspacePath, ".gitignore"), gitIgnoreContent);
    return;
  }

  const originalGitignoreContent = await fs.readFile(gitIgnorePath);

  if (!originalGitignoreContent.includes("previewConfig.json")) {
    fs.writeFile(gitIgnorePath, originalGitignoreContent + gitIgnoreContent);
  }
};

export const createAndShowPreviewConfig = async (workspacePath: string) => {
  const previewConfigFiles = await vscode.workspace.findFiles("previewConfig.json");
  const previewConfigPath = previewConfigFiles[0].path as string;

  if (!previewConfigPath) {
    await fs.writeFile(path.join(workspacePath, "previewConfig.json"), "");
    return;
  }

  const previewConfig = await fs.readFile(path.join(workspacePath, "previewConfig.json"));

  return JSON.parse(previewConfig.toString());
};

export const addPropsInfo = async (
  workspacePath: string,
  componentName: string,
  propInfo: Prop,
) => {
  const previewConfigFiles = await vscode.workspace.findFiles("previewConfig.json");
  const previewConfigPath = previewConfigFiles[0] ? previewConfigFiles[0].path : undefined;

  if (!previewConfigPath) {
    const newConfig: PreviewConfig = {};

    newConfig[componentName].push(propInfo);

    await fs.writeFile(path.join(workspacePath, "previewConfig.json"), JSON.stringify(newConfig));
    return;
  }

  const previewConfig = await fs.readFile(previewConfigPath);
  const originalPropsInfo = JSON.parse(previewConfig.toString());

  originalPropsInfo[componentName].push(propInfo);

  await fs.writeFile(
    path.join(workspacePath, "previewConfig.json"),
    JSON.stringify(originalPropsInfo),
  );
};
