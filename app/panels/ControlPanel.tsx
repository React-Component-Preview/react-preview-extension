import React, { useEffect, useState } from "react";
import styled from "styled-components";

import PropRegisterForm from "../components/ControlPanel/PropRegisterForm";
import PropList from "../components/ControlPanel/PropList";

interface Props {
  componentName: string;
}

const ControlPanel = ({ componentName }: Props) => {
  const [propList, setPropList] = useState([]);

  return (
    <Wrapper>
      <PropRegisterForm />
      <PropList propList={propList} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 50%;
  color: red;
  border: 1px solid red;
  margin: 0px 20px;
`;

export default ControlPanel;
