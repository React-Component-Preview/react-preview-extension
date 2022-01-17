import React from "react";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";

import ColorInput, {
  Props,
  COLOR_INPUT_TEST_ID,
} from "../components/Shared/ColorInput";

describe("Button test", () => {
  let props: Props;

  beforeEach(() => {
    props = {
      name: "Test TextInput",
    };
  });

  const renderButton = (optionProps?: Props) =>
    render(<ColorInput {...props} {...optionProps} />);

  it("Render test", () => {
    const { getByTestId } = renderButton();
    const colorInput = getByTestId(COLOR_INPUT_TEST_ID);

    expect(colorInput).toBeInTheDocument();
  });

  it("Attributes test", () => {
    const { getByTestId } = renderButton({
      required: true,
      value: "#000000",
    });
    const colorInput = getByTestId(COLOR_INPUT_TEST_ID);

    expect(colorInput).toHaveAttribute("type", "color");
    expect(colorInput).toHaveAttribute("required");
    expect(colorInput).toHaveAttribute("value", "#000000");
  });

  it("onChange event test", () => {
    const { getByTestId } = renderButton();
    const colorInput = getByTestId(COLOR_INPUT_TEST_ID) as HTMLInputElement;

    fireEvent.change(colorInput, { target: { value: "#ffffff" } });
    expect(colorInput.value).toBe("#ffffff");
    fireEvent.change(colorInput, { target: { value: "#000000" } });
    expect(colorInput.value).toBe("#000000");
  });
});
