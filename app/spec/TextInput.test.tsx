import React from "react";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";

import TextInput, {
  Props,
  TEXT_INPUT_TEST_ID,
} from "../components/Shared/TextInput";

describe("Button test", () => {
  let props: Props;

  beforeEach(() => {
    props = {
      name: "Test TextInput",
    };
  });

  const renderButton = (optionProps?: Props) =>
    render(<TextInput {...props} {...optionProps} />);

  it("Render test", () => {
    const { getByTestId } = renderButton();
    const defaultButton = getByTestId(TEXT_INPUT_TEST_ID);

    expect(defaultButton).toBeInTheDocument();
  });

  it("Attributes test", () => {
    const { getByTestId } = renderButton({
      disabled: true,
      required: true,
      placeHolder: "input",
    });
    const defaultButton = getByTestId(TEXT_INPUT_TEST_ID);

    expect(defaultButton).toHaveAttribute("type", "text");
    expect(defaultButton).toHaveAttribute("disabled");
    expect(defaultButton).toHaveAttribute("required");
    expect(defaultButton).toHaveAttribute("placeHolder", "input");
  });

  it("onChange event test", () => {
    const { getByTestId } = renderButton();
    const defaultButton = getByTestId(TEXT_INPUT_TEST_ID) as HTMLInputElement;

    fireEvent.change(defaultButton, { target: { value: "test" } });
    expect(defaultButton.value).toBe("test");
    fireEvent.change(defaultButton, { target: { value: "" } });
    expect(defaultButton.value).toBe("");
  });
});
