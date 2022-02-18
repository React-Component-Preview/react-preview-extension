import * as path from "path";
import * as fs from "fs";

import { Prop, PreviewConfig } from "../types";

export const addGitIgnore = (workspacePath: string) => {
  const gitIgnoreContent = "\n# React Component Preview\npreviewConfig.json";

  if (fs.existsSync(path.join(workspacePath, ".gitignore"))) {
    const gitIgnore = fs.readFileSync(
      path.join(workspacePath, ".gitignore"),
      "utf8",
    );

    if (gitIgnore.indexOf(gitIgnoreContent) === -1) {
      fs.appendFileSync(
        path.join(workspacePath, ".gitignore"),
        gitIgnoreContent,
      );
    }
  }
};

export const createAndShowPreviewConfig = (workspacePath: string) => {
  let previewConfigData: PreviewConfig = {};

  if (!fs.existsSync(path.join(workspacePath, "previewConfig.json"))) {
    fs.appendFileSync(path.resolve(workspacePath, "previewConfig.json"), "");
  } else {
    const previewConfig = fs.readFileSync(
      path.resolve(workspacePath, "previewConfig.json"),
      "utf8",
    );

    previewConfigData = previewConfig ? JSON.parse(previewConfig) : {};
  }

  return previewConfigData;
};

export const addPropInfo = (
  workspacePath: string,
  componentName: string,
  propInfo: Prop,
) => {
  const previewConfigData = createAndShowPreviewConfig(workspacePath);

  previewConfigData[componentName] = previewConfigData[componentName] || [];
  previewConfigData[componentName].push(propInfo);

  fs.writeFileSync(
    path.resolve(workspacePath, "previewConfig.json"),
    JSON.stringify(previewConfigData, null, 2),
  );
};

export const removePropInfo = (
  workspacePath: string,
  componentName: string,
  propName: string,
) => {
  const previewConfigData = createAndShowPreviewConfig(workspacePath);

  if (previewConfigData[componentName]) {
    previewConfigData[componentName] = previewConfigData[componentName].filter(
      (prop: Prop) => prop.propName !== propName,
    );
  }

  fs.writeFileSync(
    path.resolve(workspacePath, "previewConfig.json"),
    JSON.stringify(previewConfigData, null, 2),
  );
};

export const updatePropInfo = (
  workspacePath: string,
  componentName: string,
  prevPropName: string,
  propInfo: Prop,
) => {
  const previewConfigData = createAndShowPreviewConfig(workspacePath);

  if (previewConfigData[componentName]) {
    previewConfigData[componentName] = previewConfigData[componentName].map(
      (prop: Prop) => {
        if (prop.propName === prevPropName) {
          return propInfo;
        }

        return prop;
      },
    );
  }

  fs.writeFileSync(
    path.resolve(workspacePath, "previewConfig.json"),
    JSON.stringify(previewConfigData, null, 2),
  );
};
