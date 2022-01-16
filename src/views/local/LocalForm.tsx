import React from "react";
import AppForm from "../../shared/components/AppForm";
import Typography from "@mui/material/Typography";
import StyledLabel from "../../shared/styleds/StyledLabel";
import { Input, Select } from "@mui/material";

function LocalForm() {
  return (
    <AppForm>
      <Typography variant={"subtitle1"} sx={{ mt: 4 }}>
        Cadastro
      </Typography>
      <StyledLabel>CEP</StyledLabel>
      <Input type="text" name="cep" />
      <StyledLabel>Rua</StyledLabel>
      <Input type="text" name="rua" />
      <StyledLabel>Bairro</StyledLabel>
      <Input type="text" name="bairro" />
      <StyledLabel>Cidade</StyledLabel>
      <Input type="text" name="cidade" />
      <StyledLabel>UF</StyledLabel>
      <Input type="text" name="uf" />
      <StyledLabel>Empresa</StyledLabel>
      <Select size="small" sx={{ mt: 2 }}></Select>
      <StyledLabel>Responsável</StyledLabel>
      <Select size="small" sx={{ mt: 2 }}></Select>
    </AppForm>
  );
}

export default LocalForm;
