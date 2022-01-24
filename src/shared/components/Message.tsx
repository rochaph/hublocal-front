import { Alert, Snackbar } from "@mui/material";
import React from "react";
import { connect, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { removeMessage } from "../../store/message/message.slice";

function Message({
  showMessage,
  error,
  message,
}: {
  showMessage: boolean;
  message: string;
  error: boolean;
}) {
  const dispatch = useDispatch();
  return (
    <Snackbar
      open={showMessage}
      autoHideDuration={2000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      onClose={(event) => {
        dispatch(removeMessage());
      }}
    >
      <Alert severity={!error ? "success" : "error"} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

function mapStateToProps(state: RootState) {
  return {
    showMessage: state.message.showMessage,
    message: state.message.message,
    error: state.message.error,
  };
}

export default connect(mapStateToProps)(Message);
