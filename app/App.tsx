import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Preview from "./panels/PreviewPanel";
import ControlPanel from "./panels/ControlPanel";

const App = () => {
  const [componentName, setComponentName] = useState("");

  useEffect(() => {
    window.addEventListener("message", () => {});
  }, []);

  return (
    <Wrapper>
      <Preview />
      <ControlPanel componentName={componentName} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
`;

export default App;
