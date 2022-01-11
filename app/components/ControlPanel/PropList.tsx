import React from "react";
import styled from "styled-components";

import PropEntity from "./PropEntity";
import { Prop } from "../../../src/types";

interface Props {
  propList: Prop[];
}

function PropsList({ propList }: Props) {
  return (
    <PropListWrapper>
      <PropListHeader>
        <div>Prop Name</div>
        <div>Prop Type</div>
        <div>Value</div>
        <div>Delete</div>
      </PropListHeader>

      {propList.map((prop) => (
        <PropEntity
          key={`${prop.propName}-${prop.defaultValue}`}
          propName={prop.propName}
          propType={prop.propType}
          defaultValue={prop.defaultValue}
        />
      ))}
    </PropListWrapper>
  );
}

const PropListWrapper = styled.div`
  margin: 10px 0px;
  width: 100%;
  min-height: 65%;
  border: 1px solid #808080;
  border-radius: 3px;
  text-align: left;
  padding: 10px;
`;

const PropListHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  width: 100%;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default PropsList;
