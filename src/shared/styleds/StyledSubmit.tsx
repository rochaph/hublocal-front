import React from "react";
import styled from "styled-components";
import Button, { ButtonProps } from "@mui/material/Button";
import { PropsWithChildren } from "react";

const Submit = styled(Button)`
  margin-top: 4em;
`;

function StyledSubmit({ children, ...props }: PropsWithChildren<ButtonProps>) {
  return (
    <Submit type="submit" variant={"contained"} {...props}>
      {children}
    </Submit>
  );
}

export default StyledSubmit;
