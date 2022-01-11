import { Uri, WebviewOptions } from "vscode";

const getWebviewOptions = (extensionUri: Uri): WebviewOptions => {
  return {
    enableScripts: true,
    localResourceRoots: [
      Uri.joinPath(extensionUri, "out", "app"),
      Uri.joinPath(extensionUri, "app"),
    ],
  };
};

export default getWebviewOptions;
