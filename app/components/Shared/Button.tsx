import React from "react";
import styled from "styled-components";

interface Props {
  type: "button" | "submit" | "reset" | undefined;
  value: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ type, value, onClick }: Props) => {
  return (
    <DefaultButton type={type} onClick={onClick}>
      {value}
    </DefaultButton>
  );
};

const DefaultButton = styled.button`
  box-sizing: border-box;
  width: 100%;
`;

export default Button;
