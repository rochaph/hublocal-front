import React, { PropsWithChildren } from "react";
import styled from "styled-components";

const Form = styled.form``;

function AppForm({
  children,
  ...props
}: PropsWithChildren<React.FormHTMLAttributes<HTMLFormElement>>) {
  return <Form {...props}>{children}</Form>;
}

export default AppForm;
