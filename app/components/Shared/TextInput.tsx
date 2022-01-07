import React from "react";

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
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        type="text"
        id={name}
        className={className}
        value={value}
        readOnly={readOnly}
        required={required}
        placeholder={placeHolder}
        onChange={onChange}
      />
    </div>
  );
};

export default TextInput;
