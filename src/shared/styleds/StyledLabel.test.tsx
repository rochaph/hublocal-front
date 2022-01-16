import React from "react";
import { render, screen } from "@testing-library/react";
import StyledLabel from "./StyledLabel";

describe("StyledLabel", () => {
  test("should render button", () => {
    render(<StyledLabel />);
    const label = screen.queryAllByDisplayValue("label");
    expect(label).toBeDefined();
  });
});
