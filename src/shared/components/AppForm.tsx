import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import Typography from "@mui/material/Typography";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 4em auto;
  width: 20%;
  min-width: 20em;
`;

function AppForm({
  mode,
  children,
  ...props
}: PropsWithChildren<
  { mode: "create" | "update" } & React.FormHTMLAttributes<HTMLFormElement>
>) {
  return (
    <Form {...props}>
      <Typography variant={"subtitle1"}>
        {mode === "create" && "Cadastro"}
        {mode === "update" && "Atualizar"}
      </Typography>
      {children}
    </Form>
  );
}

export default AppForm;
