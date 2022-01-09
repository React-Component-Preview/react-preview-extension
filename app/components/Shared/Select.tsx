import React from "react";
import styled from "styled-components";

interface Props {
  label: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  optionList: string[];
  required?: boolean;
  className?: string;
}

function Select({ label, name, value, onChange, required, className, optionList }: Props) {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <DefaultSelect
        value={value}
        name={name}
        onChange={onChange}
        required={required}
        className={className}
      >
        {optionList.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </DefaultSelect>
    </>
  );
}

const DefaultSelect = styled.select`
  box-sizing: border-box;
  width: 100%;
`;

export default Select;
