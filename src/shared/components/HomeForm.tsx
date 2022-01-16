import React, { FormHTMLAttributes, PropsWithChildren } from "react";
import styled from "styled-components";
import { fluidRange } from "polished";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 18em;
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

function HomeForm({
  children,
  ...props
}: PropsWithChildren<FormHTMLAttributes<HTMLFormElement>>) {
  return <Form {...props}> {children}</Form>;
}

export default HomeForm;
