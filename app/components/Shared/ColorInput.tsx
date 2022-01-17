import React from "react";
import styled from "styled-components";

export interface Props {
  name?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
}

export const COLOR_INPUT_TEST_ID = "color-input";

const ColorInput = ({ name, value, onChange, required }: Props) => {
  return (
    <>
      <Input
        type="color"
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        data-testid={COLOR_INPUT_TEST_ID}
      />
    </>
  );
};

const Input = styled.input`
  height: 30px;
  width: 30px;
  cursor: pointer;
`;

export default ColorInput;
