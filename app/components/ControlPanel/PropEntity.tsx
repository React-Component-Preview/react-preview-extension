import React from "react";
import styled from "styled-components";

interface Props {
  propName: string;
  propType: string;
  defaultValue: any;
}

const PropEntity = ({ propName, propType, defaultValue }: Props) => {
  return (
    <Wrapper>
      <Prop>
        <th>{propName}</th>
        <th>{defaultValue}</th>
        <th>X</th>
      </Prop>
    </Wrapper>
  );
};

const Wrapper = styled.tbody`
  border: 1px solid #808080;
`;

const Prop = styled.tr`
  border: 1px solid #808080;
`;

export default PropEntity;
