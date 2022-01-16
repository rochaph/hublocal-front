import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import { InputLabel, InputLabelProps } from "@mui/material";

const Label = styled(InputLabel)`
  margin-top: 2em;
`;

function StyledLabel({
  children,
  ...props
}: PropsWithChildren<InputLabelProps>) {
  return <Label {...props}> {children} </Label>;
}

export default StyledLabel;
