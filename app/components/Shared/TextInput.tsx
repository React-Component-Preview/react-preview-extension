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
}

const TextInput = ({
  label,
  name,
  value,
  readOnly,
  required,
  placeHolder,
  className,
  onChange,
}: Props) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <Input
        type="text"
        id={name}
        className={className}
        value={value}
        readOnly={readOnly}
        required={required}
        placeholder={placeHolder}
        onChange={onChange}
      />
    </>
  );
};

const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  border-radius: 3px;
`;

export default TextInput;
