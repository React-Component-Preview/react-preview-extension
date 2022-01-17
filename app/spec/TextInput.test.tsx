import React from "react";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";

import TextInput, {
  Props,
  TEXT_INPUT_TEST_ID,
} from "../components/Shared/TextInput";

describe("TextInput test", () => {
  let props: Props;

  beforeEach(() => {
    props = {
      name: "Test TextInput",
    };
  });

  const renderColorInput = (optionProps?: Props) =>
    render(<TextInput {...props} {...optionProps} />);

  it("Render test", () => {
    const { getByTestId } = renderColorInput();
    const textInput = getByTestId(TEXT_INPUT_TEST_ID);

    expect(textInput).toBeInTheDocument();
  });

  it("Attributes test", () => {
    const { getByTestId } = renderColorInput({
      disabled: true,
      required: true,
      placeHolder: "input",
    });
    const textInput = getByTestId(TEXT_INPUT_TEST_ID);

    expect(textInput).toHaveAttribute("type", "text");
    expect(textInput).toHaveAttribute("disabled");
    expect(textInput).toHaveAttribute("required");
    expect(textInput).toHaveAttribute("placeHolder", "input");
  });

  it("onChange event test", () => {
    const { getByTestId } = renderColorInput();
    const textInput = getByTestId(TEXT_INPUT_TEST_ID) as HTMLInputElement;

    fireEvent.change(textInput, { target: { value: "test" } });
    expect(textInput.value).toBe("test");
    fireEvent.change(textInput, { target: { value: "" } });
    expect(textInput.value).toBe("");
  });
});
