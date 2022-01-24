import React, { useEffect, useState } from "react";
import { GridCellParams, GridColDef } from "@mui/x-data-grid";
import ActionCell from "../../shared/components/ActionCell";
import AppTable from "../../shared/components/AppTable";
import { useNavigate } from "react-router";
import { EmpresaService } from "../../services/empresa/empresa.service";
import { Empresa as EmpresaEntity } from "../../typings/entities";
import DeleteAction from "../../shared/components/DeleteAction";
import { useDispatch } from "react-redux";
import {
  errorMessage,
  successMessage,
} from "../../store/message/message.slice";

function Empresa() {
  const [rows, setRows] = useState<EmpresaEntity[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState(-1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const empresaService = new EmpresaService();

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
      field: "actions",
      headerName: "Ações",
      renderCell: ActionCell(deleteEmpresaById, updateEmpresa),
      width: 100,
    },
  ];

  function listEmpresas(pageNumber: number) {
    setLoading(true);
    empresaService
      .listAllEmpresas(pageNumber, 10)
      .then(({ data }) => {
        setRows(data.empresas);
        setTotal(data.total);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  async function updateEmpresa(props: GridCellParams<null, null>) {
    navigate(`/app/empresas/atualizar/${props.id}`);
  }

  function deleteEmpresaById(props: GridCellParams) {
    setIdToDelete(props.id as number);
    setOpen(true);
  }

  function handleOk() {
    setLoading(true);
    empresaService
      .deleteEmpresa(idToDelete)
      .then((data) => {
        setLoading(true);
        setTimeout(() => {
          page === 1 ? listEmpresas(page) : setPage(1);
          listEmpresas(page);
          dispatch(successMessage("Empresa excluída com sucesso!"));
        }, 1000);
      })
      .catch(() => {
        dispatch(errorMessage("Erro ao tentar excluir empresa!"));
        setLoading(false);
      })
      .finally(() => setOpen(false));
  }
  useEffect(() => listEmpresas(page), [page]);

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
        title="Empresas"
        onClickAdd={() => navigate("/app/empresas/cadastro")}
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

export default Empresa;
