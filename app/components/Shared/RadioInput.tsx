import React from "react";

interface Props {
  label: string;
  name: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  radioList: string[];
  required?: boolean;
  className?: string;
}

const RadioInput = ({ label, name, onChange, radioList, required, className }: Props) => {
  return (
    <div>
      <p>{label}</p>
      {radioList.map((radio) => (
        <div>
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
          />
        </div>
      ))}
    </div>
  );
};

export default RadioInput;
