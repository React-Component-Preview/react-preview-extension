import React from "react";
import styled from "styled-components";

export interface Props {
  type?: "button" | "submit" | "reset" | undefined;
  value?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  testId?: string;
}

export const BUTTON_TEST_ID = "default-button";

const Button = ({
  type,
  value,
  onClick,
  className,
  testId = BUTTON_TEST_ID,
}: Props) => {
  return (
    <DefaultButton
      type={type}
      value={value}
      onClick={onClick}
      className={className}
      data-testid={testId}
    >
      {value}
    </DefaultButton>
  );
};

const DefaultButton = styled.button`
  width: 100%;
`;

export default Button;
