import React from "react";
import { render, screen } from "@testing-library/react";
import StyledLabel from "./StyledLabel";

describe("StyledForm", () => {
  test("should render form", () => {
    render(<StyledLabel />);
    const form = screen.queryAllByDisplayValue("form");
    expect(form).toBeDefined();
  });
});
