import React, { ReactElement } from "react";

import ControlMenu from "./components/ControlMenu";
import Preview from "./components/Preview";

function App(): ReactElement {
  return (
    <div>
      <h1>Hello this is React Webview Preview</h1>
      <ControlMenu />
      <Preview />
    </div>
  );
}

export default App;
