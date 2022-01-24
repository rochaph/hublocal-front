import React from "react";

import { render, screen } from "@testing-library/react";
import AppForm from "./AppForm";

describe("AppForm", () => {
  beforeEach(() => {
    render(
      <AppForm mode={"create"}>
        <div data-testid="inner" />{" "}
      </AppForm>
    );
  });

  test("should render child", () => {
    const child = screen.getByTestId("inner");
    expect(child).toBeDefined();
  });

  test("should render Cadastrar", () => {
    const text = screen.getAllByText("Cadastrar");
    expect(text).toBeDefined();
  });

  test("should render Atualizar", () => {
    render(<AppForm mode={"update"} />);
    const text = screen.getAllByText("Atualizar");
    expect(text).toBeDefined();
  });
});
