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
  text-indent: initial;
`;

const Header = styled.thead`
  display: table-header-group;
  vertical-align: middle;
`;

export default PropsList;
