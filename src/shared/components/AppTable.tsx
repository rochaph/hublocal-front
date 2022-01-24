import { DataGrid, DataGridProps, ptBR } from "@mui/x-data-grid";
import React from "react";
import ButtonAdd from "./ButtonAdd";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import Box from "@mui/material/Box";

const TableContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const HeaderContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  text-align: center;
  margin: 1em 3em;
`;

function AppTable({
  title,
  onClickAdd,
  addOption = true,
  ...props
}: DataGridProps & {
  title: string;
  addOption?: boolean;
  onClickAdd?: () => unknown;
}) {
  return (
    <TableContainer>
      <HeaderContainer>
        <Typography variant="h6">{title}</Typography>
        {addOption && (
          <ButtonAdd data-testid="add-button" onClick={onClickAdd} />
        )}
      </HeaderContainer>
      <DataGrid
        {...props}
        pageSize={10}
        rowsPerPageOptions={[10]}
        disableSelectionOnClick
        disableColumnMenu
        disableColumnFilter
        disableColumnSelector
        paginationMode="server"
        localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
      />
    </TableContainer>
  );
}

export default AppTable;
