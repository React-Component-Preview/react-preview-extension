import { Prop } from "../types";

const createJSTemplate = (
  componentUri: string,
  componentName: string | undefined,
  propList?: Prop[] | undefined,
): string => {
  let props = "";

  propList &&
    propList.forEach((prop) => {
      props = `${props} ${prop.propName}={${prop.defaultValue}}`;
    });

  return `
import React from "react";
import ReactDOM from "react-dom";

import ${componentName} from "${componentUri}";

ReactDOM.render(<${componentName} ${props} />, document.getElementById("root"));`;
};

export default createJSTemplate;
