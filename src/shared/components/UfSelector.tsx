import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";
import { UFS } from "../../typings/UfEnum";

function UfSelector(props: SelectProps) {
  return (
    <FormControl variant="outlined" sx={{ mt: 2 }}>
      <InputLabel id="select-label">Selecione</InputLabel>
      <Select
        style={{ width: "100%" }}
        variant="outlined"
        labelId="select-label"
        label="Selecione"
        {...props}
      >
        {Object.entries(UFS).map((uf, index) => (
          <MenuItem key={index} value={uf[1]}>
            {uf[0]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default UfSelector;
