import { Uri, WebviewOptions } from "vscode";

const getWebviewOptions = (extensionUri: Uri): WebviewOptions => {
  return {
    enableScripts: true,
    localResourceRoots: [Uri.joinPath(extensionUri, "out", "app")],
  };
};

export default getWebviewOptions;
