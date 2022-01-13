import React, { useState } from "react";
import styled from "styled-components";

import PreviewControlMenu from "../components/PreviewPanel/PreviewControlMenu";
import PreviewIframe from "../components/PreviewPanel/PreviewIframe";

interface Props {
  port?: number;
}

const PreviewPanel = ({ port = 9132 }: Props) => {
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");

  const onBackgroundColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBackgroundColor(event.currentTarget.value);
  };

  return (
    <Wrapper>
      <PreviewIframe port={port} backgroundColor={backgroundColor}>
        <PreviewControlMenu
          backgroundColor={backgroundColor}
          onBackgroundColorChange={onBackgroundColorChange}
        />
      </PreviewIframe>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  margin-bottom: 10px;
`;

export default PreviewPanel;
