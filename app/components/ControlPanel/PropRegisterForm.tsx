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

    setPropName("");
    setPropType("");
    setDefaultValue("");
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
      <Box>
        <TextInput
          label="Prop Name"
          name="propName"
          value={propName}
          onChange={onPropNameChange}
          required={true}
          className="content"
        />
      </Box>

      <Box>
        <Select
          label="Prop Type"
          name="propType"
          value={propType}
          onChange={onPropTypeChange}
          optionList={[
            { name: "string", value: "string" },
            { name: "number", value: "number" },
            { name: "boolean", value: "boolean" },
            { name: "array", value: "array" },
            { name: "object", value: "object" },
            { name: "function", value: "function" },
          ]}
          required={true}
          className="content"
        />
      </Box>

      <Box>
        <PropTypeDefaultValue
          propType={propType}
          defaultValue={defaultValue}
          onChange={onDefaultValueChange}
          required={true}
          className="content"
        />
      </Box>

      <Box>
        <Button type="submit" value="Add" className="content" />
      </Box>
    </FormWrapper>
  );
}

const FormWrapper = styled.form`
  display: flex;
  flex-direction: row;
  height: 80px;
  padding: 10px;
  border: 1px solid #808080;
  border-radius: 3px;
`;

const Box = styled.div`
  position: relative;
  height: 100%;
  width: 25%;
  margin: 0px 5px;

  .content {
    position: absolute;
    bottom: 5px;
    height: 30px;
  }
`;

export default PropsControlHeader;
