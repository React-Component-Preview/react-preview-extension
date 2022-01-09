import React from "react";
import styled from "styled-components";

import PropEntity from "./PropEntity";
import { Prop } from "../../../src/types";

interface Props {
  propList: Prop[];
}

function PropsList({ propList }: Props) {
  return (
    <Table>
      <Header>
        <tr>
          <th>Prop Name</th>
          <th>Value</th>
        </tr>
      </Header>

      {propList.map((prop) => (
        <PropEntity
          propName={prop.propName}
          propType={prop.propType}
          defaultValue={prop.defaultValue}
        />
      ))}
    </Table>
  );
}

const Table = styled.table`
  margin-top: 10px;
  width: 100%;
  min-height: 100px;
  border: 1px solid #808080;
  border-radius: 3px;
  text-align: left;
`;

const Header = styled.thead`
  border-bottom: 1px solid #808080;
`;

export default PropsList;
