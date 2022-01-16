import React, { FormHTMLAttributes, PropsWithChildren } from "react";
import styled from "styled-components";
import { fluidRange } from "polished";

const Form = styled.form`
  background-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 60%;
  ${fluidRange(
    {
      prop: "width",
      fromSize: "18em",
      toSize: "22em",
    },
    "30em",
    "40em"
  )};
  ${fluidRange(
    {
      prop: "padding",
      fromSize: "0.8em",
      toSize: "2em",
    },
    "20em",
    "30em"
  )};
  box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.4);
`;

function StyledHomeForm({
  children,
  ...props
}: PropsWithChildren<FormHTMLAttributes<HTMLFormElement>>) {
  return <Form {...props}> {children}</Form>;
}

export default StyledHomeForm;
