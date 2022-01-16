import React from "react";
import StyledHomeForm from "../../shared/styleds/StyledHomeForm";
import Input from "@mui/material/Input";
import StyledLabel from "../../shared/styleds/StyledLabel";
import StyledSubmit from "../../shared/styleds/StyledSubmit";

function Signup() {
  return (
    <StyledHomeForm>
      <StyledLabel sx={{ mt: 2 }}> Login </StyledLabel>
      <Input type={"text"} />
      <StyledLabel sx={{ mt: 2 }}> Senha </StyledLabel>
      <Input type={"password"} />
      <StyledLabel sx={{ mt: 2 }}> Confirmar senha </StyledLabel>
      <Input type={"password"} />
      <StyledSubmit>Cadastrar</StyledSubmit>
    </StyledHomeForm>
  );
}

export default Signup;
