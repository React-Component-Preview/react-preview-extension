import React from "react";
import styled from "styled-components";

interface Props {
  type: "button" | "submit" | "reset" | undefined;
  value: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

const Button = ({ type, value, onClick, className }: Props) => {
  return (
    <DefaultButton type={type} onClick={onClick} className={className}>
      {value}
    </DefaultButton>
  );
};

const DefaultButton = styled.button`
  width: 100%;
`;

export default Button;
