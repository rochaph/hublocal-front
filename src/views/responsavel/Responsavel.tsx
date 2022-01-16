import React from "react";
import { GridCellParams, GridColDef } from "@mui/x-data-grid";
import styled from "styled-components";
import Button from "@mui/material/Button";
import ActionCell from "../../shared/components/ActionCell";
import AppTable from "../../shared/components/AppTable";
import { useNavigate } from "react-router";

const ActionButton = styled(Button)`
  min-width: unset;
`;

async function deleteResponsavel(props: GridCellParams) {
  console.log(props.id);
}

async function updateResponsavel(props: GridCellParams) {
  console.log(props.field);
}

function Responsavel() {
  const columns: GridColDef[] = [
    {
      field: "nome",
      headerName: "Nome",
      resizable: true,
      flex: 1,
    },
    {
      field: "telefone",
      headerName: "Telefone",
      resizable: true,
      flex: 1,
    },
    {
      field: "empresas",
      headerName: "Empresas",
      resizable: true,
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Ações",
      renderCell: ActionCell(deleteResponsavel, updateResponsavel),
      flex: 0,
    },
  ];

  const rows = [
    {
      id: 1,
      nome: "Teste",
    },
  ];
  const navigate = useNavigate();

  return (
    <AppTable onClickAdd={() => navigate("/")} columns={columns} rows={rows} />
  );
}

export default Responsavel;
