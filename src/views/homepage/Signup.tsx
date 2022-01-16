import React from "react";
import HomeForm from "../../shared/components/HomeForm";
import Input from "@mui/material/Input";
import StyledLabel from "../../shared/styleds/StyledLabel";
import StyledSubmit from "../../shared/styleds/StyledSubmit";

function Signup() {
  return (
    <HomeForm>
      <StyledLabel sx={{ mt: 2 }}> Login </StyledLabel>
      <Input type={"text"} />
      <StyledLabel sx={{ mt: 2 }}> Senha </StyledLabel>
      <Input type={"password"} />
      <StyledLabel sx={{ mt: 2 }}> Confirmar senha </StyledLabel>
      <Input type={"password"} />
      <StyledSubmit>Cadastrar</StyledSubmit>
    </HomeForm>
  );
}

export default Signup;
