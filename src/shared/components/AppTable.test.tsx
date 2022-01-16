import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import AppTable from "./AppTable";

describe("AppTable", () => {
  beforeEach(() => {
    const columns = [{ field: "teste" }];
    const rows = [
      {
        id: 1,
        nome: "teste",
        headerName: "Teste",
      },
    ];
    render(
      <AppTable
        columns={columns}
        rows={rows}
        onClickAdd={() => console.log("added")}
      />
    );
  });

  test("should render DataGrid", () => {
    const datagrid = screen.getByRole("grid");
    expect(datagrid).toBeDefined();
  });

  test("should call onClickAdd", () => {
    const spy = jest.spyOn(console, "log");
    const addButton = screen.getByTestId("add-button");
    fireEvent.click(addButton);
    expect(spy).toBeCalledWith("added");
  });
});
