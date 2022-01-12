import React from "react";
import styled from "styled-components";

interface Props {
  componentName: string;
}

const Header = ({ componentName }: Props) => {
  return (
    <Wrapper>
      <ComponentName>Component: {componentName}</ComponentName>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  min-height: 30px;
  width: 100%;
  font-size: 15px;
`;

const ComponentName = styled.span`
  display: block;
  margin-top: 15px;
`;

export default Header;
