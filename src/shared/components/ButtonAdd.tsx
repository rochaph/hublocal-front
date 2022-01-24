import Button, { ButtonProps } from "@mui/material/Button";
import React from "react";

function ButtonAdd(props: ButtonProps) {
  return (
    <Button
      {...props}
      variant="contained"
      sx={{
        minWidth: "unset",
      }}
      color="success"
    >
      +
    </Button>
  );
}
export default ButtonAdd;
