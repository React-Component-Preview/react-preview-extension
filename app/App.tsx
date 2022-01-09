import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Preview from "./panels/PreviewPanel";
import ControlPanel from "./panels/ControlPanel";

const App = () => {
  const [propList, setPropList] = useState([]);

  useEffect(() => {
    window.addEventListener("message", (message: MessageEvent<any>) => {
      const data = message.data;

      if (data.propList) {
        setPropList(data.propList);
      } else {
        setPropList([]);
      }
    });
  });

  return (
    <Wrapper>
      <Preview />
      <ControlPanel propList={propList} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
`;

export default App;
