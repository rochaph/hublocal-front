import React from "react";
import { render, screen } from "@testing-library/react";
import ButtonAdd from "./ButtonAdd";

describe("ButtonAdd", () => {
  beforeEach(() => {
    render(<ButtonAdd />);
  });

  test("should render a button", () => {
    const button = screen.getByRole("button");
    expect(button).toBeDefined();
  });
});
