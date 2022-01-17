import React from "react";
import styled from "styled-components";

export interface Props {
  label?: string;
  name?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  radioList: string[];
  required?: boolean;
  className?: string;
}

export const RADIO_INPUT_TEST_ID = "radio-input";

const RadioInput = ({
  label,
  name,
  value,
  onChange,
  radioList,
  required,
  className,
}: Props) => {
  return (
    <>
      {label && <p>{label}</p>}
      {radioList.map((radio) => (
        <RadioWrapper key={radio}>
          <label htmlFor={radio}>{radio}</label>
          <input
            type="radio"
            name={name}
            id={radio}
            required={required}
            value={radio}
            onChange={onChange}
            className={className}
            checked={radio === value}
            data-testid={RADIO_INPUT_TEST_ID}
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
