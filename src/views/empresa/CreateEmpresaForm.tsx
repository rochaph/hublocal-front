import React, { useEffect } from "react";
import AppForm from "../../shared/components/AppForm";
import StyledLabel from "../../shared/styleds/StyledLabel";
import { Alert, AlertTitle, Input, TextareaAutosize } from "@mui/material";
import Typography from "@mui/material/Typography";
import {
  useForm,
  Controller,
  FormProvider,
  useFieldArray,
} from "react-hook-form";
import { Empresa, Local } from "../../typings/entities";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateEmpresaValidation } from "../../validations/Empresa.validation";
import InputMask from "../../shared/components/InputMask";
import RenderErrors from "../../shared/components/RenderErrors";
import { EmpresaService } from "../../services/empresa/empresa.service";
import { removeMask } from "../../shared/utils/utils";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import {
  errorMessage,
  successMessage,
} from "../../store/message/message.slice";
import ResponsavelListForm from "../../shared/components/ResponsavelListForm";
import { responsavelTemplate } from "../../shared/templates/templates";
import EnderecoForm from "../../shared/components/EnderecoForm";
import { EnderecoAPI } from "../../services/endereco/endereco.service";

function CreateEmpresaForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const empresaService = new EmpresaService();
  const methods = useForm<Omit<Empresa, "locais"> & { local: Local }>({
    resolver: yupResolver(CreateEmpresaValidation),
  });
  const arrayMethods = useFieldArray({
    name: "responsaveis",
    control: methods.control,
  });

  function afterCallEndereco(data: EnderecoAPI) {
    const local = methods.getValues().local;
    methods.setValue(
      "local",
      {
        ...local,
        endereco: {
          ...local.endereco,
          rua: data.logradouro,
          bairro: data.bairro,
          uf: data.uf,
          cidade: data.localidade,
        },
      },
      { shouldDirty: true, shouldTouch: true }
    );
  }

  function onSubmit(data: Omit<Empresa, "locais"> & { local: Local }) {
    const mask = new RegExp(/([./_() -])+/g);

    data.responsaveis?.map((responsavel, index) => {
      responsavel.principal = index === 0;
      responsavel.endereco.cep = removeMask(responsavel.endereco.cep);
      responsavel.telefone = removeMask(responsavel.telefone);
    });

    empresaService
      .createEmpresa({
        ...data,
        cnpj: removeMask(data.cnpj),
        locais: [
          {
            ...data.local,
            endereco: {
              ...data.local.endereco,
              cep: removeMask(data.local.endereco.cep),
            },
          },
        ],
      })
      .then(() => {
        dispatch(successMessage("Empresa criada com sucesso!"));
        navigate("/app/empresas");
      })
      .catch(() => {
        dispatch(errorMessage("Houve um erro ao tentar criar a empresa!"));
      });
  }

  useEffect(() => arrayMethods.insert(0, { ...responsavelTemplate }), []);

  return (
    <FormProvider {...methods}>
      <AppForm onSubmit={methods.handleSubmit(onSubmit)} mode={"create"}>
        {Object.keys(methods.formState.errors).some((key) =>
          ["nome", "descricao", "cnpj"].includes(key)
        ) && (
          <Alert severity="error" sx={{ mt: 2 }}>
            <AlertTitle> Empresa inválida </AlertTitle>
            {RenderErrors(methods.formState.errors)}
          </Alert>
        )}

        <StyledLabel>Nome</StyledLabel>
        <Input {...methods.register("nome")} type="text" />

        <StyledLabel>CNPJ</StyledLabel>
        <Controller
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
        <TextareaAutosize
          {...methods.register("descricao")}
          name="descricao"
          minRows="10"
        />

        <Typography variant={"subtitle1"} sx={{ mt: 4 }}>
          Local
        </Typography>

        {methods.formState.errors.local && (
          <Alert severity="error" sx={{ mt: 3 }}>
            <AlertTitle> Local inválido </AlertTitle>
            {RenderErrors(methods.formState.errors.local)}
            {methods.formState.errors.local?.endereco &&
              RenderErrors(methods.formState.errors.local.endereco)}
          </Alert>
        )}

        <StyledLabel>Nome</StyledLabel>
        <Input type="text" {...methods.register("local.nome")} />

        <EnderecoForm prefix="local" afterCallEndereco={afterCallEndereco} />

        <Typography variant={"subtitle1"} sx={{ mt: 4 }}>
          Responsaveis
        </Typography>

        <ResponsavelListForm methods={arrayMethods}></ResponsavelListForm>
      </AppForm>
    </FormProvider>
  );
}

export default CreateEmpresaForm;
