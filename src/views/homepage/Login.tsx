import React from "react";
import Input from "@mui/material/Input";
import { useNavigate } from "react-router";
import HomeForm from "../../shared/components/HomeForm";
import StyledLabel from "../../shared/styleds/StyledLabel";
import StyledSubmit from "../../shared/styleds/StyledSubmit";
import Box from "@mui/material/Box";
import { AuthService } from "../../services/auth/auth.service";
import { useAppDispatch } from "../../store/hooks";
import { authenticate } from "../../store/auth/auth.slice";
import { AxiosResponse } from "axios";
import LoadingCircle from "../../shared/components/LoadingCircle";
import { FieldError, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styled from "styled-components";
import { Alert } from "@mui/material";
import { LoginValidation } from "../../validations/Auth.validation";

interface IFormInput {
  login: string;
  senha: string;
}

const ErrorText = styled.p`
  color: red;
`;

function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = React.useState(false);
  const [invalidCredentials, setInvalidCredentials] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(LoginValidation) });
  const authService = new AuthService();

  function handleLogin(data: IFormInput) {
    setIsLoading(true);
    authService
      .login(data.login, data.senha)
      .then(({ data }: AxiosResponse<{ access_token: string }>) => {
        dispatch(authenticate(data.access_token));
        setIsLoading(false);
        navigate("/app");
      })
      .catch(() => {
        setInvalidCredentials(true);
        setIsLoading(false);
      });
  }

  return (
    <Box>
      <LoadingCircle open={isLoading} />
      <HomeForm
        data-testid="login-form"
        onSubmit={handleSubmit(handleLogin)}
        onChange={() => setInvalidCredentials(false)}
      >
        {invalidCredentials && (
          <Alert sx={{ mb: 2 }} severity="error">
            Credenciais inválidas
          </Alert>
        )}
        {(!!errors.login || errors.senha) && (
          <Alert severity="error">
            Login inválido.
            {Object.values(errors).map((error, index) => (
              <p key={index}>{(error as FieldError).message}</p>
            ))}
          </Alert>
        )}
        <StyledLabel error={!!errors.login} sx={{ mt: 2 }}>
          Login
        </StyledLabel>
        <Input {...register("login")} />
        <StyledLabel error={!!errors.senha} sx={{ mtt: 2 }}>
          Senha
        </StyledLabel>
        <Input
          type="password"
          {...register("senha", { required: true })}
          sx={{ mb: 4 }}
        />
        <StyledSubmit> Entrar </StyledSubmit>
      </HomeForm>
    </Box>
  );
}

export default Login;
