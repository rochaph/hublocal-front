import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import Signup from "./Signup";

describe("SignUp", () => {
  test("should render signUp form", () => {
    const wrapper = ({ children }: { children: JSX.Element }) => (
      <Provider store={store}> {children} </Provider>
    );

    render(
      <MemoryRouter initialEntries={["/login"]}>
        <Signup />
      </MemoryRouter>,
      { wrapper }
    );
    const signup = screen.getByTestId("signup-form");

    expect(signup).toBeDefined();
  });

  test("should validate signUp form", () => {
    const wrapper = ({ children }: { children: JSX.Element }) => (
      <Provider store={store}> {children} </Provider>
    );

    render(
      <MemoryRouter initialEntries={["/login"]}>
        <Signup />
      </MemoryRouter>,
      { wrapper }
    );
    const signup = screen.getByTestId("signup-form");

    expect(signup).toBeDefined();
  });
});
