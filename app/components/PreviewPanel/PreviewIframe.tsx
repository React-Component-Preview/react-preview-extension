import React from "react";
import styled from "styled-components";

interface Props {
  port: number;
  backgroundColor: string;
  children?: React.ReactNode;
}

interface PreviewIframeType {
  backgroundColor: string;
}

const PreviewIframe = ({ port, backgroundColor, children }: Props) => {
  return (
    <Wrapper>
      <CustomIframe src={`http://localhost:${port}`} backgroundColor={backgroundColor} />
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  height: 90%;
  width: 95%;
`;

const CustomIframe = styled.iframe<PreviewIframeType>`
  height: 100%;
  width: 100%;
  border: 1px solid #808080;
  border-radius: 3px;
  background-color: ${(prop) => prop.backgroundColor};
`;

export default PreviewIframe;
