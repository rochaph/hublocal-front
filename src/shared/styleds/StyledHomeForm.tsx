import React, { PropsWithChildren } from "react";
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
      fromSize: "300px",
      toSize: "400px",
    },
    "400px",
    "1000px"
  )};
  box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.4);
  animation: slide 0.5s forwards;
  animation-delay: 2s;
`;

function StyledHomeForm({
  children,
  ...props
}: PropsWithChildren<React.FormHTMLAttributes<HTMLFormElement>>) {
  return <Form {...props}> {children}</Form>;
}

export default StyledHomeForm;
