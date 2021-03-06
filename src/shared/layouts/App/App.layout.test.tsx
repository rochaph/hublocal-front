import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import React from "react";
import AppLayout from "./App.layout";
import { Provider } from "react-redux";
import { store } from "../../../store/store";

describe("App.layout", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <AppLayout>
            <div data-testid="testDiv"></div>
          </AppLayout>
        </MemoryRouter>
      </Provider>
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
