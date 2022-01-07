import React from "react";

interface Props {
  type: "button" | "submit" | "reset" | undefined;
  value: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ type, value, onClick }: Props) => {
  return (
    <button type={type} onClick={onClick}>
      {value}
    </button>
  );
};

export default Button;
