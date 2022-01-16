import React from "react";
import AppForm from "../../shared/components/AppForm";
import StyledLabel from "../../shared/styleds/StyledLabel";
import { Input, TextareaAutosize } from "@mui/material";
import Typography from "@mui/material/Typography";

function EmpresaForm() {
  return (
    <AppForm>
      <Typography variant={"subtitle1"}>Empresa</Typography>
      <StyledLabel>Nome</StyledLabel>
      <Input type="text" name="nome" />
      <StyledLabel>CNPJ</StyledLabel>
      <Input name="cnpj" />
      <StyledLabel>Descricao</StyledLabel>
      <TextareaAutosize name="descricao" minRows="10" />
      <Typography variant={"subtitle1"} sx={{ mt: 4 }}>
        Responsável
      </Typography>
      <StyledLabel>Nome</StyledLabel>
      <Input type="text" />
      <StyledLabel>Telefone</StyledLabel>
      <Input type="text" />
      <Typography variant={"subtitle1"} sx={{ mt: 4 }}>
        Local
      </Typography>
      <StyledLabel>Cep</StyledLabel>
      <Input type="text" name="cep" />
      <StyledLabel>Rua</StyledLabel>
      <Input type="text" name="rua" />
      <StyledLabel>Bairro</StyledLabel>
      <Input type="text" name="bairro" />
      <StyledLabel>Cidade</StyledLabel>
      <Input type="text" name="cidade" />
      <StyledLabel>UF</StyledLabel>
      <Input type="text" name="uf" />
    </AppForm>
  );
}

export default EmpresaForm;
