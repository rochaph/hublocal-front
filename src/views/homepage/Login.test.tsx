import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "./Login";
import { Provider } from "react-redux";
import { store } from "../../store/store";

describe("Login", () => {
  test("should render login form", () => {
    const wrapper = ({ children }: { children: JSX.Element }) => (
      <Provider store={store}> {children} </Provider>
    );

    render(
      <MemoryRouter initialEntries={["/login"]}>
        <Login />
      </MemoryRouter>,
      { wrapper }
    );
    const login = screen.getByTestId("login-form");

    expect(login).toBeDefined();
  });
});
