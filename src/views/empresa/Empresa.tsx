import React from "react";
import { GridCellParams, GridColDef } from "@mui/x-data-grid";
import ActionCell from "../../shared/components/ActionCell";
import AppTable from "../../shared/components/AppTable";
import { useNavigate } from "react-router";

async function deleteEmpresa(props: GridCellParams) {
  console.log(props.id);
}

async function updateEmpresa(props: GridCellParams) {
  console.log(props.field);
}

function Empresa() {
  const columns: GridColDef[] = [
    {
      field: "nome",
      headerName: "Nome",
      flex: 1,
    },
    {
      field: "cnpj",
      headerName: "CNPJ",
      flex: 1,
    },
    {
      field: "descricao",
      headerName: "Descrição",
      flex: 1,
    },
    {
      field: "locais",
      headerName: "Locais",
      flex: 1,
    },
    {
      field: "Responsáveis",
      headerName: "Responsáveis",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Ações",
      renderCell: ActionCell(deleteEmpresa, updateEmpresa),
      width: 100,
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
    <AppTable
      onClickAdd={() => navigate("/app/empresas/cadastro")}
      columns={columns}
      rows={rows}
    />
  );
}

export default Empresa;
