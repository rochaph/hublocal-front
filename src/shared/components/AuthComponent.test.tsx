import React from "react";
import { render, screen } from "@testing-library/react";
import AuthComponent from "./AuthComponent";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import { Router } from "@mui/icons-material";

describe("AuthComponent", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Router>
          <AuthComponent>
            <div data-testid="inner" />
          </AuthComponent>
        </Router>
      </Provider>
    );
  });

  test("should not render inner", () => {
    const call = () => screen.getByTestId("inner");
    expect(call).toThrowError();
  });
});
