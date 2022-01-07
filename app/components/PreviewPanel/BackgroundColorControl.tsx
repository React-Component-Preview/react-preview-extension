import React from "react";
import styled from "styled-components";

import ColorInput from "../Shared/ColorInput";

interface Props {
  backgroundColor: string;
  onBackgroundColorChange: React.ChangeEventHandler<HTMLInputElement>;
}

const BackgroundColorControl = ({ backgroundColor, onBackgroundColorChange }: Props) => {
  return (
    <Wrapper>
      <ColorInput
        name="backgroundColor"
        value={backgroundColor}
        onChange={onBackgroundColorChange}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;
`;

export default BackgroundColorControl;
