import React, { useEffect, useState } from "react";
import { GridCellParams, GridColDef } from "@mui/x-data-grid";
import styled from "styled-components";
import Button from "@mui/material/Button";
import ActionCell from "../../shared/components/ActionCell";
import AppTable from "../../shared/components/AppTable";
import { useNavigate } from "react-router";
import { LocalService } from "../../services/local/local.service";
import { Local as LocalEntity } from "../../typings/entities";
import DeleteAction from "../../shared/components/DeleteAction";
import {
  errorMessage,
  successMessage,
} from "../../store/message/message.slice";
import { useDispatch } from "react-redux";

const ActionButton = styled(Button)`
  min-width: unset;
`;

function Local() {
  const [rows, setRows] = useState<LocalEntity[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState(-1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const localService = new LocalService();

  const columns: GridColDef[] = [
    {
      field: "nome",
      headerName: "Nome",
      flex: 1,
    },
    {
      field: "cep",
      headerName: "CEP",
      flex: 1,
      valueGetter: (params) => params.row.endereco?.cep || "Vazio",
    },
    {
      field: "rua",
      headerName: "Rua",
      flex: 1,
      valueGetter: (params) => params.row.endereco?.rua || "Vazio",
    },
    {
      field: "bairro",
      headerName: "Bairro",
      flex: 1,
      valueGetter: (params) => params.row.endereco?.bairro || "Vazio",
    },
    {
      field: "cidade",
      headerName: "Cidade",
      flex: 1,
      valueGetter: (params) => params.row.endereco?.cidade || "Vazio",
    },
    {
      field: "uf",
      headerName: "UF",
      flex: 1,
      valueGetter: (params) => params.row.endereco?.uf.sigla || "Vazio",
    },
    {
      field: "actions",
      headerName: "Ações",
      renderCell: ActionCell(deleteLocalById, updateLocal),
      width: 100,
    },
  ];

  function listLocais(pageNumber: number) {
    setLoading(true);
    localService
      .listAllLocais(pageNumber, 10)
      .then(({ data }) => {
        setRows(data.locais);
        setTotal(data.total);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function updateLocal(props: GridCellParams<null, null>) {
    navigate(`/app/locais/atualizar/${props.id}`);
  }

  function handleOk() {
    setLoading(true);
    localService
      .deleteLocal(idToDelete)
      .then((data) => {
        setLoading(true);
        setTimeout(() => {
          page === 1 ? listLocais(page) : setPage(1);
          dispatch(successMessage("Local excluído com sucesso!"));
        }, 1000);
      })
      .catch(() => {
        setLoading(false);
        dispatch(errorMessage("Erro ao tentar excluir local!"));
      })
      .finally(() => setOpen(false));
  }

  function deleteLocalById(props: GridCellParams) {
    setIdToDelete(props.id as number);
    setOpen(true);
  }

  useEffect(() => listLocais(page), [page]);

  return (
    <>
      <DeleteAction
        open={open}
        handleOk={handleOk}
        handleCancel={() => {
          setIdToDelete(-1);
          setOpen(false);
        }}
      />

      <AppTable
        title="Locais"
        data-testid="empresa-table"
        onClickAdd={() => navigate("/app/locais/cadastro")}
        columns={columns}
        rows={rows}
        page={page - 1}
        pageSize={10}
        rowCount={total}
        onPageChange={(page) => {
          setPage(page + 1);
        }}
        loading={loading}
      />
    </>
  );
}

export default Local;
