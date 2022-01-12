import React from "react";

import TextInput from "../Shared/TextInput";
import Select from "../Shared/Select";
import RadioInput from "../Shared/RadioInput";

interface Props {
  propType: string;
  defaultValue: string;
  onChange: React.ChangeEventHandler<HTMLElement>;
  required: boolean;
  className: string;
}

const PropTypeDefaultValue = ({ propType, defaultValue, onChange, required, className }: Props) => {
  switch (propType) {
    case "number":
      return (
        <TextInput
          label="Default Value"
          name="defaultValue"
          value={defaultValue}
          onChange={onChange}
          required={required}
          className={className}
        />
      );
    case "boolean":
      return (
        <RadioInput
          label="Boolean"
          name="defaultValue"
          onChange={onChange}
          radioList={["true", "false"]}
          required={required}
          className={className}
        />
      );
    case "array":
      return (
        <TextInput
          label="Default Value"
          name="defaultValue"
          value={defaultValue}
          onChange={onChange}
          required={required}
          className={className}
        />
      );
    case "object":
      return (
        <TextInput
          label="Default Value"
          name="defaultValue"
          value={defaultValue}
          onChange={onChange}
          required={required}
          className={className}
        />
      );
    case "function":
      return (
        <Select
          label="Default Value"
          name="defaultValue"
          value={defaultValue}
          onChange={onChange}
          optionList={[
            { name: "onClick", value: "() => alert('clicked')" },
            { name: "onSubmit", value: "() => alert('submitted')" },
            { name: "onKeydown", value: "() => alert('key down')" },
            { name: "onKeyPress", value: "() => alert('key press')" },
            { name: "onKeyUp", value: "() => alert('key up')" },
          ]}
          required={required}
          className={className}
        />
      );
    default:
      return (
        <TextInput
          label="Default Value"
          name="defaultValue"
          value={defaultValue}
          onChange={onChange}
          required={required}
          className={className}
        />
      );
  }
};

export default PropTypeDefaultValue;
