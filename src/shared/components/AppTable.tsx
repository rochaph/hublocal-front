import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DataGrid, DataGridProps, ptBR } from "@mui/x-data-grid";
import React from "react";

function AppTable({
  onClickAdd,
  addOption = true,
  ...props
}: DataGridProps & {
  addOption?: boolean;
  onClickAdd?: () => unknown;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {addOption && (
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            width: "100%",
            height: "4em",
          }}
        >
          <Button
            data-testid="add-button"
            variant="contained"
            sx={{
              mr: 4,
              minWidth: "unset",
            }}
            color="success"
            onClick={onClickAdd}
          >
            +
          </Button>
        </Box>
      )}
      <DataGrid
        {...props}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        disableSelectionOnClick
        localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
      />
    </Box>
  );
}

export default AppTable;
