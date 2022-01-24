import React, { useEffect, useState } from "react";
import AppForm from "../../shared/components/AppForm";
import StyledLabel from "../../shared/styleds/StyledLabel";
import {
  Alert,
  AlertTitle,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextareaAutosize,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { EmpresaService } from "../../services/empresa/empresa.service";
import { Controller, useForm } from "react-hook-form";
import { Empresa, Responsavel } from "../../typings/entities";
import RenderErrors from "../../shared/components/RenderErrors";
import { yupResolver } from "@hookform/resolvers/yup";
import { UpdateEmpresaValidation } from "../../validations/Empresa.validation";
import InputMask from "../../shared/components/InputMask";
import { useDispatch } from "react-redux";
import {
  errorMessage,
  successMessage,
} from "../../store/message/message.slice";
import { Navigate } from "react-router-dom";
import { removeMask } from "../../shared/utils/utils";

function UpdateEmpresaForm() {
  const params = useParams<{ id: string }>();
  if (!params.id) return <Navigate to="/app/empresas"></Navigate>;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const empresaService = new EmpresaService();
  const id = parseInt(params.id);
  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<Empresa>({ resolver: yupResolver(UpdateEmpresaValidation) });
  const [responsaveis, setResponsaveis] = useState<
    (Responsavel & { id: number })[]
  >([]);

  function updateEmpresa(data: Empresa) {
    empresaService
      .updateEmpresa(id, {
        ...data,
        cnpj: removeMask(data.cnpj),
        responsavelId: parseInt(data.responsavelId as string),
      })
      .then(() => {
        navigate("/app/empresas");
        dispatch(successMessage("Empresa atualizada!"));
      })
      .catch(() => {
        dispatch(errorMessage("Erro ao tentar atualizar empresa!"));
      });
  }

  function getEmpresa() {
    empresaService.getById(id).then(({ data }) => {
      setResponsaveis(data.responsaveis);
      const fields = ["nome", "cnpj", "descricao"];
      fields.forEach((value) => {
        const v = value as "nome" | "cnpj" | "descricao";
        setValue(v, data[v]);
      });
    });
  }

  function getResponsaveis() {
    empresaService.getResponsaveis(id).then(({ data }) => {
      setResponsaveis(data);
      const principal = data?.filter((responsavel) => responsavel.principal);
      setValue("responsavelId", principal[0].id);
    });
  }

  useEffect(() => {
    getEmpresa();
    getResponsaveis();
  }, []);

  return (
    <AppForm mode="update" onSubmit={handleSubmit(updateEmpresa)}>
      {Object.keys(errors).some((key) =>
        ["nome", "descricao", "cnpj"].includes(key)
      ) && (
        <Alert severity="error" sx={{ mt: 2 }}>
          <AlertTitle> Dados inválidos </AlertTitle>
          {RenderErrors(errors)}
        </Alert>
      )}
      <StyledLabel>Nome</StyledLabel>
      <Input type="text" {...register("nome")} />
      <StyledLabel>CNPJ</StyledLabel>
      <Controller
        control={control}
        render={({ field: { value, onChange } }) => (
          <InputMask
            value={value}
            onChange={onChange}
            mask={"99.999.999/9999-99"}
          />
        )}
        defaultValue=""
        name="cnpj"
      />
      <StyledLabel>Descricao</StyledLabel>
      <TextareaAutosize minRows="10" {...register("descricao")} />
      <Typography variant={"subtitle1"} sx={{ mt: 4 }}>
        Responsável Principal
      </Typography>

      <Controller
        control={control}
        render={({ field: { value, onChange } }) => (
          <FormControl sx={{ mt: 2 }}>
            <InputLabel id="select-label">Selecione</InputLabel>
            <Select
              labelId="select-label"
              label="Selecione"
              value={value}
              onChange={onChange}
            >
              {responsaveis.map((value, index) => (
                <MenuItem key={index} value={value.id}>
                  {value.nome}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        name="responsavelId"
        defaultValue=""
      />
    </AppForm>
  );
}

export default UpdateEmpresaForm;
