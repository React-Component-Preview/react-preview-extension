import React from "react";
import styled from "styled-components";

import Button from "../Shared/Button";

interface Props {
  propName: string;
  propType: string;
  defaultValue: any;
}

const PropEntity = ({ propName, propType, defaultValue }: Props) => {
  const onDeleteButtonClick = () => {
    vscode.postMessage({
      command: "delete",
      propName,
    });
  };

  return (
    <Wrapper>
      <Category>{propName}</Category>
      <Category>{propType}</Category>
      <Category>{propType === "function" ? propName + " Event" : defaultValue}</Category>
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
