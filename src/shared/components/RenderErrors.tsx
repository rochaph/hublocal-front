import React from "react";
import { FieldError } from "react-hook-form";

function RenderErrors(field?: Record<string, any>) {
  return (
    field &&
    Object.values(field).map((error, index) => (
      <p onClick={() => console.log(error)} key={index}>
        {error.message as FieldError}
      </p>
    ))
  );
}

export default RenderErrors;
