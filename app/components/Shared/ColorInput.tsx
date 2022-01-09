import React from "react";

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
      <input type="color" name={name} value={value} onChange={onChange} required={required} />
    </>
  );
};

export default ColorInput;
