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
} from "@mui/material";
import { Navigate, useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { LocalService } from "../../services/local/local.service";
import EnderecoForm from "../../shared/components/EnderecoForm";
import { EmpresaService } from "../../services/empresa/empresa.service";
import { EnderecoAPI } from "../../services/endereco/endereco.service";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { Local, Responsavel } from "../../typings/entities";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import {
  errorMessage,
  successMessage,
} from "../../store/message/message.slice";

import { UpdateLocalValidation } from "../../validations/Local.validation";
import RenderErrors from "../../shared/components/RenderErrors";

function UpdateLocalForm() {
  const params = useParams<{ id: string }>();
  if (!params.id) return <Navigate to="/app/locais"></Navigate>;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const localService = new LocalService();
  const empresaService = new EmpresaService();
  const id = parseInt(params.id);
  const methods = useForm<Local>({
    resolver: yupResolver(UpdateLocalValidation),
  });
  const [responsaveis, setResponsaveis] = useState<
    (Responsavel & { id: number })[]
  >([]);

  function afterCallEndereco(data: EnderecoAPI) {
    const local = methods.getValues();
    methods.setValue(
      "endereco",
      {
        ...local.endereco,
        rua: data.logradouro,
        bairro: data.bairro,
        uf: data.uf,
        cidade: data.localidade,
      },
      { shouldDirty: true, shouldTouch: true }
    );
  }

  async function getLocal() {
    const { data: dataLocal } = await localService.getLocalById(id);
    const { data: dataResponsaveis } = await empresaService.getResponsaveis(
      dataLocal.empresaId
    );
    setResponsaveis(dataResponsaveis);

    const fields = ["nome", "endereco", "responsavelId"];
    fields.forEach((value) => {
      const v = value as "nome" | "endereco" | "responsavelId";
      if (v === "endereco") {
        dataLocal[v].uf = (dataLocal[v] as any).uf.sigla;
      }
      methods.setValue(v, dataLocal[v]);
    });
  }

  function updateLocal(data: Local) {
    localService
      .updateLocal(id, {
        ...data,
        responsavelId: parseInt(data.responsavelId as string),
      })
      .then(() => {
        navigate("/app/locais");
        dispatch(successMessage("Local atualizado!"));
      })
      .catch(() => {
        dispatch(errorMessage("Erro ao tentar atualizar local!"));
      });
  }
  useEffect(() => {
    getLocal().then();
  }, []);

  return (
    <FormProvider {...methods}>
      <AppForm
        mode={"update"}
        data-testid="updatelocalform"
        onSubmit={methods.handleSubmit(updateLocal)}
      >
        {Object.keys(methods.formState.errors).length > 0 && (
          <Alert severity="error" sx={{ mt: 2 }}>
            <AlertTitle> Dados inválidos </AlertTitle>
            {RenderErrors(methods.formState.errors)}
            {RenderErrors(methods.formState.errors.endereco)}
          </Alert>
        )}
        <StyledLabel>Nome</StyledLabel>
        <Input type="text" {...methods.register("nome")} />
        <EnderecoForm afterCallEndereco={afterCallEndereco} />
        <StyledLabel>Responsável Principal</StyledLabel>
        <Controller
          control={methods.control}
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
    </FormProvider>
  );
}

export default UpdateLocalForm;
