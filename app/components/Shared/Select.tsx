import React from "react";
import styled from "styled-components";

interface functionOptions {
  name: string;
  value: string;
}

interface Props {
  label?: string;
  name: string;
  value: string;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  optionList: functionOptions[];
  required?: boolean;
  className?: string;
}

function Select({
  label,
  name,
  value,
  onChange,
  required,
  className,
  optionList,
}: Props) {
  return (
    <>
      {label && <Label htmlFor={name}>{label}</Label>}
      <DefaultSelect
        value={value}
        name={name}
        onChange={onChange}
        required={required}
        className={className}
      >
        {optionList.map((option) => (
          <option key={option.name} value={option.value}>
            {option.name}
          </option>
        ))}
      </DefaultSelect>
    </>
  );
}

const Label = styled.label`
  display: inline-block;
  margin-bottom: 10px;
`;

const DefaultSelect = styled.select`
  box-sizing: border-box;
  width: 100%;
`;

export default Select;
