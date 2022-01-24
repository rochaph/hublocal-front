import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import { InputLabel, InputLabelProps } from "@mui/material";

const Label = styled(InputLabel)`
  margin: 2em 0 1em 0;
`;

function StyledLabel({
  children,
  ...props
}: PropsWithChildren<InputLabelProps>) {
  return <Label {...props}> {children} </Label>;
}

export default StyledLabel;
