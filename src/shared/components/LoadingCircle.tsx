import { Backdrop, BackdropProps, CircularProgress } from "@mui/material";
import React from "react";

function LoadingCircle(params: BackdropProps) {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      {...params}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default LoadingCircle;
