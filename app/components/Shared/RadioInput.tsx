import React from "react";
import styled from "styled-components";

interface Props {
  label?: string;
  name: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  radioList: string[];
  required?: boolean;
  className?: string;
}

const RadioInput = ({
  label,
  name,
  onChange,
  radioList,
  required,
  className,
  value,
}: Props) => {
  return (
    <>
      {label && <p>{label}</p>}
      {radioList.map((radio) => (
        <RadioWrapper>
          <label htmlFor={radio}>{radio}</label>
          <input
            type="radio"
            key={radio}
            name={name}
            id={radio}
            required={required}
            value={radio}
            onChange={onChange}
            className={className}
            checked={radio === value}
          />
        </RadioWrapper>
      ))}
    </>
  );
};

const RadioWrapper = styled.div`
  display: inline-block;
`;

export default RadioInput;
