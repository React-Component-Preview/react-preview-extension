import React from "react";
import styled from "styled-components";

interface Props {
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
}

const ColorInput = ({ name, value, onChange, required }: Props) => {
  return (
    <>
      <Input type="color" name={name} value={value} onChange={onChange} required={required} />
    </>
  );
};

const Input = styled.input`
  height: 30px;
  width: 30px;
  cursor: pointer;
`;

export default ColorInput;
