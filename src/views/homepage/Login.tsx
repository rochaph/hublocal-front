import React from "react";
import Input from "@mui/material/Input";
import { useNavigate } from "react-router";
import StyledHomeForm from "../../shared/styleds/StyledHomeForm";
import StyledLabel from "../../shared/styleds/StyledLabel";
import StyledSubmit from "../../shared/styleds/StyledSubmit";

function Login() {
  const navigate = useNavigate();

  return (
    <StyledHomeForm
      onSubmit={(e) => {
        e.preventDefault();
        navigate("/app");
      }}
    >
      <StyledLabel sx={{ mt: 2 }}> Login </StyledLabel>
      <Input type={"text"} />
      <StyledLabel sx={{ mt: 2 }}> Senha </StyledLabel>
      <Input type={"password"} />
      <StyledSubmit> Entrar </StyledSubmit>
    </StyledHomeForm>
  );
}

export default Login;
