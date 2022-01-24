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
import Typography from "@mui/material/Typography";
import { Empresa, Local } from "../../typings/entities";
import {
  Controller,
  useFieldArray,
  useForm,
  FormProvider,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { CreateLocalValidation } from "../../validations/Local.validation";
import ResponsavelListForm from "../../shared/components/ResponsavelListForm";
import { responsavelTemplate } from "../../shared/templates/templates";
import { EmpresaService } from "../../services/empresa/empresa.service";
import { LocalService } from "../../services/local/local.service";
import { useDispatch } from "react-redux";
import {
  errorMessage,
  successMessage,
} from "../../store/message/message.slice";
import RenderErrors from "../../shared/components/RenderErrors";
import { removeMask } from "../../shared/utils/utils";
import { useNavigate } from "react-router";
import EnderecoForm from "../../shared/components/EnderecoForm";
import { EnderecoAPI } from "../../services/endereco/endereco.service";

function CreateLocalForm() {
  const empresaService = new EmpresaService();
  const localService = new LocalService();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const methods = useForm<Local>({
    resolver: yupResolver(CreateLocalValidation),
  });
  const arrayMethods = useFieldArray({
    name: "responsaveis",
    control: methods.control,
  });

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

  function createLocal(data: Local) {
    data.responsaveis?.map((responsavel, index) => {
      responsavel.principalLocal = index === 0;
      responsavel.endereco.cep = removeMask(responsavel.endereco.cep);
      responsavel.telefone = removeMask(responsavel.telefone);
    });

    localService
      .createLocal({
        ...data,
        endereco: {
          ...data.endereco,
          cep: removeMask(data.endereco.cep),
        },
      })
      .then(() => {
        dispatch(successMessage("Local criado com sucesso!"));
        navigate("/app/locais");
      })
      .catch(() => {
        dispatch(errorMessage("Houve um erro ao tentar criar o local!"));
      });
  }

  useEffect(() => {
    arrayMethods.insert(0, { ...responsavelTemplate });

    empresaService.listAllEmpresasWithoutOffset().then(({ data }) => {
      setEmpresas(data.empresas);
    });
  }, []);

  return (
    <FormProvider {...methods}>
      <AppForm mode={"create"} onSubmit={methods.handleSubmit(createLocal)}>
        {Object.entries(methods.formState.errors).length > 0 && (
          <Alert severity="error" sx={{ mt: 2 }}>
            <AlertTitle> Local inválido </AlertTitle>
            {RenderErrors(methods.formState.errors)}
            {RenderErrors(methods.formState.errors.endereco)}
          </Alert>
        )}
        <StyledLabel>Nome</StyledLabel>
        <Input type="text" {...methods.register("nome")} />
        <EnderecoForm afterCallEndereco={afterCallEndereco} />

        <StyledLabel>Empresa</StyledLabel>
        <Controller
          control={methods.control}
          render={({ field: { value, onChange } }) => (
            <FormControl variant="outlined" sx={{ mt: 2 }}>
              <InputLabel id="select-label">Selecione</InputLabel>
              <Select
                defaultValue=""
                style={{ width: "100%" }}
                variant="outlined"
                labelId="select-label"
                label="Selecione"
                value={value}
                onChange={onChange}
              >
                {empresas.map((value, index) => (
                  <MenuItem key={index} value={value.id}>
                    {value.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          name="empresaId"
          defaultValue=""
        />

        <Typography variant={"subtitle1"} sx={{ mt: 4 }}>
          Responsaveis
        </Typography>
        <ResponsavelListForm methods={arrayMethods} />
      </AppForm>
    </FormProvider>
  );
}

export default CreateLocalForm;
