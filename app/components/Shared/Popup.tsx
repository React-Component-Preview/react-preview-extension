import React, { useEffect } from "react";
import styled from "styled-components";

interface Props {
  message: string;
  duration: number;
  setIsVisible: (isVisible: boolean) => void;
}

const Popup = ({ message, duration, setIsVisible }: Props) => {
  useEffect(() => {
    setTimeout(() => {
      setIsVisible(false);
    }, duration);
  }, []);

  return (
    <Wrapper>
      <Message>{message}</Message>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 40px;
  right: 10px;
  width: 200px;
  height: 30px;
  border: 1px solid #0ddceb;
  border-radius: 3px;
  background-color: #808080;
`;

const Message = styled.span`
  display: block;
  font-size: 15px;
`;

export default Popup;
