import React from "react";
import AppForm from "../../shared/components/AppForm";
import StyledLabel from "../../shared/styleds/StyledLabel";
import { Checkbox, Input, InputLabel, Select } from "@mui/material";
import Box from "@mui/material/Box";
import styled from "styled-components";

const StyledBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  margin-top: 2em;
`;

function ResponsavelForm({ mode }: { mode: "update" | "create" }) {
  return (
    <AppForm mode={mode}>
      <StyledLabel>Nome</StyledLabel>
      <Input type="text" name="nome" />
      <StyledLabel>Telefone</StyledLabel>
      <Input type="text" name="telefone" />
      <StyledLabel>Empresa</StyledLabel>
      <Select size="small" sx={{ mt: 2 }}></Select>
      <StyledBox>
        <InputLabel>Responsável principal</InputLabel>
        <Checkbox />
      </StyledBox>
    </AppForm>
  );
}

export default ResponsavelForm;
