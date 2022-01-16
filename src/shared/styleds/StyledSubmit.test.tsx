import React from "react";
import StyledSubmit from "./StyledSubmit";
import { render, screen } from "@testing-library/react";

describe("StyledSubmit", () => {
  test("should render button", () => {
    render(<StyledSubmit />);
    const button = screen.queryAllByDisplayValue("button");
    expect(button).toBeDefined();
  });
});
