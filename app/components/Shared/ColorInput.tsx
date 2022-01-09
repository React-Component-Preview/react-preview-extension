import React from "react";
import styled from "styled-components";

interface Props {
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  label?: string;
  required?: boolean;
}

const ColorInput = ({ label, name, value, onChange, required }: Props) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
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
