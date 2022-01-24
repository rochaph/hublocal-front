import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "./Home";
import { Provider } from "react-redux";
import { store } from "../../store/store";

describe("Home", () => {
  test("should render homepage screen", () => {
    const wrapper = ({ children }: { children: JSX.Element }) => (
      <Provider store={store}> {children} </Provider>
    );
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Home />
      </MemoryRouter>,
      { wrapper }
    );
    const homepage = screen.getByTestId("homepage");

    expect(homepage).toBeDefined();
  });
});
