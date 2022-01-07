import React from "react";

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
    <div>
      <label htmlFor={name}>{label}</label>
      <select
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
      </select>
    </div>
  );
}

export default Select;
