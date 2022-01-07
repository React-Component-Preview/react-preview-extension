import React, { useState } from "react";
import styled from "styled-components";

import BackgroundColorControl from "../components/PreviewPanel/BackgroundColorControl";
import PreviewIframe from "../components/PreviewPanel/PreviewIframe";

interface Props {
  port?: number;
}

const PreviewPanel = ({ port = 9132 }: Props) => {
  const [backgroundColor, setBackgroundColor] = useState("#0000");

  const onBackgroundColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBackgroundColor(event.currentTarget.value);
  };

  return (
    <Wrapper>
      <PreviewIframe port={port} backgroundColor={backgroundColor}>
        <BackgroundColorControl
          backgroundColor={backgroundColor}
          onBackgroundColorChange={onBackgroundColorChange}
        />
      </PreviewIframe>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60%;
`;

export default PreviewPanel;
