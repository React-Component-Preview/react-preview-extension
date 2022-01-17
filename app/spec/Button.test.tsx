import React from "react";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";

import Button, { Props, BUTTON_TEST_ID } from "../components/Shared/Button";

describe("Button test", () => {
  let props: Props;

  beforeEach(() => {
    props = {
      value: "Test Button",
    };
  });

  const renderButton = (optionProps?: Props) =>
    render(<Button {...props} {...optionProps} />);

  it("Render test", () => {
    const { getByTestId } = renderButton();
    const defaultButton = getByTestId(BUTTON_TEST_ID);

    expect(defaultButton).toBeInTheDocument();
  });

  it("Attributes test", () => {
    const { getByTestId } = renderButton({
      type: "button",
      className: "testButton",
    });
    const defaultButton = getByTestId(BUTTON_TEST_ID);

    expect(defaultButton).toHaveAttribute("value", "Test Button");
    expect(defaultButton).toHaveAttribute("type", "button");
  });

  it("onClick event test", () => {
    const mockCallBack = jest.fn();
    const { getByTestId } = renderButton({ onClick: mockCallBack });
    const defaultButton = getByTestId(BUTTON_TEST_ID);

    fireEvent.click(defaultButton);
    expect(mockCallBack).toHaveBeenCalled();
  });
});
