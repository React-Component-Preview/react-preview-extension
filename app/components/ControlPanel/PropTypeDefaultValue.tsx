import React from "react";

import TextInput from "../Shared/TextInput";
import Select from "../Shared/Select";
import RadioInput from "../Shared/RadioInput";

interface Props {
  propType: string;
  defaultValue: string;
  onChange: React.ChangeEventHandler<HTMLElement>;
}

const PropTypeDefaultValue = ({ propType, defaultValue, onChange }: Props) => {
  switch (propType) {
    case "number":
      return (
        <TextInput
          label="Default Value"
          name="defaultValue"
          value={defaultValue}
          onChange={onChange}
        />
      );
    case "boolean":
      return (
        <RadioInput
          label="Boolean"
          name="defaultValue"
          onChange={onChange}
          radioList={["true", "false"]}
        />
      );
    case "array":
      return (
        <TextInput
          label="Default Value"
          name="defaultValue"
          value={defaultValue}
          onChange={onChange}
        />
      );
    case "object":
      return (
        <TextInput
          label="Default Value"
          name="defaultValue"
          value={defaultValue}
          onChange={onChange}
        />
      );
    case "function":
      return (
        <Select
          label="Default Value"
          name="defaultValue"
          value={defaultValue}
          onChange={onChange}
          optionList={["click", "submit", "key down", "key press", "key up"]}
        />
      );
    default:
      return (
        <TextInput
          label="Default Value"
          name="defaultValue"
          value={defaultValue}
          onChange={onChange}
        />
      );
  }
};

export default PropTypeDefaultValue;
