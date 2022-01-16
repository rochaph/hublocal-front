import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Dashboard from "./Dashboard";
import { MemoryRouter } from "react-router-dom";

describe("Dashboard", () => {
  test("should render welcome screen", () => {
    render(
      <MemoryRouter initialEntries={["/app"]}>
        <Dashboard />
      </MemoryRouter>
    );
    const welcomeDiv = screen.getByTestId("welcome");

    expect(welcomeDiv).toBeDefined();
  });
});
