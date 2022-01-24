import React, { FormHTMLAttributes, PropsWithChildren } from "react";
import styled from "styled-components";
import Typography from "@mui/material/Typography";
import { fluidRange } from "polished";
import Button from "@mui/material/Button";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 4em auto;
  width: 20%;
  min-width: 20em;
  ${fluidRange(
    {
      prop: "width",
      fromSize: "300px",
      toSize: "540px",
    },
    "400px",
    "1000px"
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

const AppFormButton = styled(Button)`
  margin-top: 4em;
`;

function AppForm({
  mode,
  children,
  ...props
}: PropsWithChildren<
  { mode: "create" | "update" } & FormHTMLAttributes<HTMLFormElement>
>) {
  return (
    <Form {...props}>
      <Typography variant={"subtitle1"}>
        {mode === "create" && "Cadastro"}
        {mode === "update" && "Atualizar"}
      </Typography>
      {children}
      <AppFormButton type="submit" variant="contained">
        {mode === "create" && "Cadastrar"}
        {mode === "update" && "Atualizar"}
      </AppFormButton>
    </Form>
  );
}

export default AppForm;
