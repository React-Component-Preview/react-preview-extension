import React from "react";
import styled from "styled-components";

interface Props {
  label: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  readOnly?: boolean;
  required?: boolean;
  placeHolder?: string;
  className?: string;
  disabled?: boolean;
}

const TextInput = ({
  label,
  name,
  value,
  onChange,
  readOnly,
  required,
  placeHolder,
  className,
  disabled,
}: Props) => {
  return (
    <>
      <Label htmlFor={name}>{label}</Label>
      <Input
        type="text"
        id={name}
        className={className}
        value={value}
        readOnly={readOnly}
        required={required}
        placeholder={placeHolder}
        onChange={onChange}
        disabled={disabled}
      />
    </>
  );
};

const Label = styled.label`
  display: inline-block;
  margin-bottom: 10px;
`;

const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  border-radius: 3px;
`;

export default TextInput;
