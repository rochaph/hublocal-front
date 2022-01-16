import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import AppLayout from "./App.layout";

describe("App.layout", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <AppLayout>
          <div data-testid="testDiv"></div>
        </AppLayout>
      </BrowserRouter>
    );
  });

  test("Should render header", () => {
    const header = screen.queryAllByDisplayValue("header");
    expect(header).toBeDefined();
  });

  test("Should render main", () => {
    const main = screen.queryAllByDisplayValue("main");
    expect(main).toBeDefined();
  });

  test("Should render footer", () => {
    const footer = screen.queryAllByDisplayValue("footer");
    expect(footer).toBeDefined();
  });

  test("Should render testDiv", () => {
    const div = screen.getByTestId("testDiv");
    expect(div).toBeDefined();
  });
});
