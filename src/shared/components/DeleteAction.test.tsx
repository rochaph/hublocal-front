import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import DeleteAction from "./DeleteAction";

describe("DeleteAction", () => {
  const wrapper = (open = false) => {
    render(
      <DeleteAction
        open={open}
        handleCancel={() => console.log("cancel")}
        handleOk={() => console.log("ok")}
      />
    );
  };

  test("should not render a dialog", () => {
    wrapper(false);
    const call = () => screen.getByTestId("dialog");
    expect(call).toThrowError();
  });

  test("should render a dialog", () => {
    wrapper(true);

    const dialog = screen.getByTestId("dialog");
    expect(dialog).toBeDefined();
  });

  test("should call handleOK on click btn-ok", () => {
    wrapper(true);
    const spy = jest.spyOn(console, "log");
    const btnok = screen.getByTestId("btn-ok");
    fireEvent(
      btnok,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
    expect(spy).toBeCalledWith("ok");
  });

  test("should call handlecancel on click btn-cancel", () => {
    wrapper(true);
    const spy = jest.spyOn(console, "log");
    const btnok = screen.getByTestId("btn-cancel");
    fireEvent(
      btnok,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
    expect(spy).toBeCalledWith("cancel");
  });
});
