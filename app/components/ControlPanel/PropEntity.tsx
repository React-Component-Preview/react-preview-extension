import React, { useState, useCallback, useEffect } from "react";
import { debounce } from "lodash";
import styled from "styled-components";

import Button from "../Shared/Button";
import TextInput from "../Shared/TextInput";
import PropTypeDefaultValue from "../ControlPanel/PropTypeDefaultValue";

interface Props {
  propName: string;
  propType: string;
  defaultValue: any;
}

const PropEntity = ({ propName, propType, defaultValue }: Props) => {
  const [newPropName, setNewPropName] = useState(propName);
  const [newDefaultValue, setNewDefaultValue] = useState(defaultValue);

  const debouncedPropUpdate = useCallback(
    debounce(() => {
      vscode.postMessage({
        command: "update",
        prevPropName: propName,
        payload: {
          propName: newPropName,
          propType,
          defaultValue: newDefaultValue,
        },
      });
    }, 500),
    [newDefaultValue],
  );

  useEffect(() => {
    if (defaultValue !== newDefaultValue || propName !== newPropName) {
      debouncedPropUpdate();
    }

    return debouncedPropUpdate.cancel;
  }, [debouncedPropUpdate, newPropName, newDefaultValue]);

  const onNewDefaultValueChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newValue = event.currentTarget.value;

    setNewDefaultValue(newValue);
  };

  const onNewPropNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPropName(event.currentTarget.value);
  };

  const onDeleteButtonClick = () => {
    vscode.postMessage({
      command: "delete",
      propName,
    });
  };

  return (
    <Wrapper>
      <TextInput
        name="propName"
        value={newPropName}
        onChange={onNewPropNameChange}
        required={true}
      />

      <Category>{propType}</Category>

      <PropTypeDefaultValue
        name="defaultValue"
        propType={propType}
        defaultValue={newDefaultValue}
        onChange={onNewDefaultValueChange}
        required={true}
      />

      <Button type="button" onClick={onDeleteButtonClick} value="X" />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  margin-top: 10px;
  padding: 5px;
  border: 1px solid #808080;
  border-radius: 3px;
`;

const Category = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default PropEntity;
