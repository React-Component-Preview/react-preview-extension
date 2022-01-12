import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";

import Preview from "./panels/PreviewPanel";
import ControlPanel from "./panels/ControlPanel";
import Header from "./components/Header";

const App = () => {
  const [currentComponentName, setCurrentComponentName] = useState("");
  const [propList, setPropList] = useState([]);

  const messageHandler = useCallback(() => {
    window.addEventListener("message", (message: MessageEvent<any>) => {
      const data = message.data;

      switch (data.command) {
        case "updateComponent":
          setPropList(data.propList);
          setCurrentComponentName(data.currentComponentName);
      }
    });
  }, []);

  useEffect(() => {
    messageHandler();
  });

  return (
    <Wrapper>
      <Header componentName={currentComponentName} />
      <Preview />
      <ControlPanel propList={propList} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
`;

export default App;
