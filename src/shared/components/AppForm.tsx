import React, { PropsWithChildren } from "react";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 4em auto;
  width: 20%;
  min-width: 20em;
`;

function AppForm({
  children,
  ...props
}: PropsWithChildren<React.FormHTMLAttributes<HTMLFormElement>>) {
  return <Form {...props}>{children}</Form>;
}

export default AppForm;
