import React from "react";
import Input from "@mui/material/Input";
import { useNavigate } from "react-router";
import HomeForm from "../../shared/components/HomeForm";
import StyledLabel from "../../shared/styleds/StyledLabel";
import StyledSubmit from "../../shared/styleds/StyledSubmit";
import Box from "@mui/material/Box";

function Login() {
  const navigate = useNavigate();

  return (
    <Box>
      <HomeForm
        data-testid="login-form"
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
      </HomeForm>
    </Box>
  );
}

export default Login;
