import React from "react";
import styled from "styled-components";

import PropRegisterForm from "../components/ControlPanel/PropRegisterForm";
import PropList from "../components/ControlPanel/PropList";
import { Prop } from "../../src/types";

interface Props {
  propList: Prop[];
}

const ControlPanel = ({ propList }: Props) => {
  return (
    <Wrapper>
      <PropRegisterForm />
      <PropList propList={propList} />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  height: 40%;
`;

export default ControlPanel;
