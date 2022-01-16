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

async function deleteLocal(props: GridCellParams) {
  console.log(props.id);
}

async function updateLocal(props: GridCellParams) {
  console.log(props.field);
}

function Local() {
  const columns: GridColDef[] = [
    {
      field: "cep",
      headerName: "CEP",
      resizable: true,
      flex: 1,
    },
    {
      field: "rua",
      headerName: "Rua",
      resizable: true,
      flex: 1,
    },
    {
      field: "bairro",
      headerName: "Bairro",
      resizable: true,
      flex: 1,
    },
    {
      field: "cidade",
      headerName: "Cidade",
      resizable: true,
      flex: 1,
    },
    {
      field: "uf",
      headerName: "UF",
      resizable: true,
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Ações",
      renderCell: ActionCell(deleteLocal, updateLocal),
      width: 100,
    },
  ];

  const rows = [
    {
      id: 1,
      cep: "Teste",
      rua: "rua a",
      bairro: "bairro a",
      cidade: "cidade a",
      uf: "uf",
    },
  ];
  const navigate = useNavigate();

  return (
    <AppTable onClickAdd={() => navigate("/")} columns={columns} rows={rows} />
  );
}

export default Local;
