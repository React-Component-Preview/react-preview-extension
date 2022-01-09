import React, { useState } from "react";
import styled from "styled-components";

import PropTypeDefaultValue from "./PropTypeDefaultValue";
import TextInput from "../Shared/TextInput";
import Select from "../Shared/Select";
import Button from "../Shared/Button";

function PropsControlHeader() {
  const [propName, setPropName] = useState("");
  const [propType, setPropType] = useState("");
  const [defaultValue, setDefaultValue] = useState("");

  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      propName: { value: string };
      propType: { value: string };
      defaultValue: { value: string };
    };

    const propName = target.propName.value;
    const propType = target.propType.value;
    const defaultValue = target.defaultValue.value;

    vscode.postMessage({
      command: "add",
      payload: { propName, propType, defaultValue },
    });
  };

  const onPropNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPropName(event.currentTarget.value);
  };

  const onPropTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPropType(event.currentTarget.value);
  };

  const onDefaultValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDefaultValue(event.currentTarget.value);
  };

  return (
    <FormWrapper onSubmit={onSubmit}>
      <div>
        <TextInput label="Prop Name" name="propName" value={propName} onChange={onPropNameChange} />
      </div>

      <div>
        <Select
          label="Prop Type"
          name="propType"
          value={propType}
          onChange={onPropTypeChange}
          optionList={["string", "number", "boolean", "array", "object", "function"]}
        />
      </div>

      <div>
        <PropTypeDefaultValue
          propType={propType}
          defaultValue={defaultValue}
          onChange={onDefaultValueChange}
        />
      </div>

      <div>
        <Button type="submit" value="Add" />
      </div>
    </FormWrapper>
  );
}

const FormWrapper = styled.form`
  display: flex;
  flex-direction: row;
  min-height: 80px;
  padding: 10px;
  border: 1px solid #808080;
  border-radius: 3px;

  div {
    height: 40px;
    width: 25%;
    margin: 0px 5px;
  }
`;

export default PropsControlHeader;
