import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import ActionCell from "./ActionCell";
import { GridCellValue, GridRowId } from "@mui/x-data-grid";

describe("ActionCell", () => {
  beforeEach(() => {
    const Cell = ActionCell(
      () => console.log("delete"),
      () => console.log("edit")
    );
    render(
      <Cell
        id={"1"}
        field={"teste"}
        value={undefined}
        formattedValue={undefined}
        row={undefined}
        cellMode={"view"}
        hasFocus={false}
        tabIndex={0}
        getValue={function (id: GridRowId, field: string): GridCellValue {
          throw new Error("Function not implemented.");
        }}
        colDef={{
          field: "teste",
          headerName: "Teste",
          type: "string",
          computedWidth: 100,
        }}
        rowNode={{
          id: 1,
          parent: "teste",
          depth: 1,
          groupingKey: 1,
          groupingField: "teste",
        }}
      />
    );
  });

  test("should render delete icon", () => {
    const deleteIcon = screen.queryByTestId("delete-icon");
    expect(deleteIcon).toBeDefined();
  });

  test("should render edit icon", () => {
    const editIcon = screen.queryByTestId("edit-icon");
    expect(editIcon).toBeDefined();
  });

  test("should call the callbackDelete", () => {
    const deleteButton = screen.queryByTestId("delete-button");
    const spy = jest.spyOn(console, "log");

    fireEvent.click(deleteButton!);
    expect(spy).toBeCalledWith("delete");
  });

  test("should call the callbackEdit", () => {
    const editButton = screen.queryByTestId("edit-button");
    const spy = jest.spyOn(console, "log");

    fireEvent.click(editButton!);
    expect(spy).toBeCalledWith("edit");
  });
});
