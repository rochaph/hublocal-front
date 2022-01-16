import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import { fluidRange } from "polished";
import { FormGroup, FormGroupProps } from "@mui/material";

const Form = styled(FormGroup)`
  background-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 60%;
  ${fluidRange(
    {
      prop: "width",
      fromSize: "300px",
      toSize: "400px",
    },
    "400px",
    "1000px"
  )};
  box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.4);
`;

function StyledHomeForm({
  children,
  ...props
}: PropsWithChildren<FormGroupProps>) {
  return <Form {...props}> {children}</Form>;
}

export default StyledHomeForm;
