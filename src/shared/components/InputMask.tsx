import ReactInputMask, { Props } from "react-input-mask";
import React from "react";
import { Input, InputProps } from "@mui/material";

function InputMask(props: Props) {
  return (
    <ReactInputMask {...props}>
      {(inputProps: Props): React.ReactElement<InputProps> => (
        <Input type="text" />
      )}
    </ReactInputMask>
  );
}

export default InputMask;
