import React from "react";
import { GridCellParams, GridColDef } from "@mui/x-data-grid";
import styled from "styled-components";
import Button from "@mui/material/Button";
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
      flex: 1,
    },
    {
      field: "telefone",
      headerName: "Telefone",
      flex: 1,
    },
    {
      field: "empresa",
      headerName: "Empresa",
      flex: 1,
    },
  ];

  const rows = [
    {
      id: 1,
      nome: "Teste",
    },
  ];
  const navigate = useNavigate();

  return <AppTable addOption={false} columns={columns} rows={rows} />;
}

export default Responsavel;
