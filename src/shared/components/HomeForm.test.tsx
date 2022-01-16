import React from "react";
import { render, screen } from "@testing-library/react";
import StyledLabel from "../styleds/StyledLabel";

describe("HomeForm", () => {
  test("should render form", () => {
    render(<StyledLabel />);
    const form = screen.queryAllByDisplayValue("form");
    expect(form).toBeDefined();
  });
});
