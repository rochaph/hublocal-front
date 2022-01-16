import React from "react";
import AppForm from "../../shared/components/AppForm";
import StyledLabel from "../../shared/styleds/StyledLabel";
import { Input, Select } from "@mui/material";

function LocalForm({ mode }: { mode: "update" | "create" }) {
  return (
    <AppForm mode={mode}>
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
