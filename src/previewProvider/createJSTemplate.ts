import { PreviewConfig } from "../types";

const createJSTemplate = (
  componentUri: string,
  componentName: string,
  props?: PreviewConfig | undefined,
): string => {
  return `
import React from "react";
import ReactDOM from "react-dom";

import ${componentName} from "${componentUri}";

ReactDOM.render(<${componentName} ${props}/>, document.getElementById("root"));`;
};

export default createJSTemplate;
