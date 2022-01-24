import { Alert, AlertTitle, Dialog, DialogActions } from "@mui/material";
import Button from "@mui/material/Button";
import React from "react";

function DeleteAction({
  open,
  handleOk,
  handleCancel,
}: {
  open: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}) {
  return (
    <Dialog data-testid="dialog" open={open}>
      <Alert severity="error">
        <AlertTitle>Tem certeza que deseja excluir?</AlertTitle>
        <p>Essa ação é irreversível</p>
      </Alert>
      <DialogActions>
        <Button data-testid="btn-ok" color="error" onClick={handleOk}>
          Confirmar
        </Button>
        <Button autoFocus data-testid="btn-cancel" onClick={handleCancel}>
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteAction;
