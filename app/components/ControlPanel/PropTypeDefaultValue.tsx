import React from "react";

import TextInput from "../Shared/TextInput";
import Select from "../Shared/Select";
import RadioInput from "../Shared/RadioInput";

interface Props {
  label?: string;
  name: string;
  onChange?: React.ChangeEventHandler<HTMLElement>;
  propType: string;
  defaultValue: string;
  required: boolean;
  className?: string;
}

const PropTypeDefaultValue = ({
  name,
  label,
  propType,
  defaultValue,
  onChange,
  required,
  className,
}: Props) => {
  switch (propType) {
    case "number":
      return (
        <TextInput
          label={label}
          name={name}
          value={defaultValue}
          onChange={onChange}
          required={required}
          className={className}
        />
      );
    case "boolean":
      return (
        <RadioInput
          label={label}
          name={name}
          value={defaultValue}
          onChange={onChange}
          radioList={["true", "false"]}
          required={required}
          className={className}
        />
      );
    case "array":
      return (
        <TextInput
          label={label}
          name={name}
          value={defaultValue}
          onChange={onChange}
          required={required}
          className={className}
        />
      );
    case "object":
      return (
        <TextInput
          label={label}
          name={name}
          value={defaultValue}
          onChange={onChange}
          required={required}
          className={className}
        />
      );
    case "function":
      return (
        <Select
          label={label}
          name={name}
          value={defaultValue}
          onChange={onChange}
          optionList={[
            {
              name: "onClick",
              value:
                "() => window.parent.postMessage({command: 'previewEvent', eventMessage: 'Clicked'}, '*')",
            },
            {
              name: "onSubmit",
              value:
                "() => window.parent.postMessage({command: 'previewEvent', eventMessage: 'Submitted'}, '*')",
            },
            {
              name: "onKeydown",
              value:
                "() => window.parent.postMessage({command: 'previewEvent', eventMessage: 'Key Down'}, '*')",
            },
            {
              name: "onKeyPress",
              value:
                "() => window.parent.postMessage({command: 'previewEvent', eventMessage: 'Key Pressed'}, '*')",
            },
            {
              name: "onKeyUp",
              value:
                "() => window.parent.postMessage({command: 'previewEvent', eventMessage: 'Key Up'}, '*')",
            },
          ]}
          required={required}
          className={className}
        />
      );
    default:
      return (
        <TextInput
          label={label}
          name={name}
          value={defaultValue}
          onChange={onChange}
          required={required}
          className={className}
        />
      );
  }
};

export default PropTypeDefaultValue;
