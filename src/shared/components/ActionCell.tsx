import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import styled from "styled-components";
import Button from "@mui/material/Button";
import { GridCellParams } from "@mui/x-data-grid";

const ActionButton = styled(Button)`
  min-width: unset;
`;

function ActionCell(
  callbackDelete: (props: GridCellParams) => Promise<void> | void,
  callbackEdit: (props: GridCellParams) => Promise<void> | void
) {
  function Render(props: GridCellParams) {
    return (
      <>
        <ActionButton
          data-testid="delete-button"
          onClick={async () => await callbackDelete(props)}
        >
          <DeleteIcon data-testid="delete-icon" />
        </ActionButton>
        <ActionButton
          data-testid="edit-button"
          onClick={async () => await callbackEdit(props)}
        >
          <EditIcon data-testid="edit-icon" />
        </ActionButton>
      </>
    );
  }

  return Render;
}

export default ActionCell;
