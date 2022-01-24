import React, { useEffect, useState } from "react";
import Input from "@mui/material/Input";
import { useNavigate } from "react-router";
import HomeForm from "../../shared/components/HomeForm";
import StyledLabel from "../../shared/styleds/StyledLabel";
import StyledSubmit from "../../shared/styleds/StyledSubmit";
import Box from "@mui/material/Box";
import { useAppDispatch } from "../../store/hooks";
import { authenticate } from "../../store/auth/auth.slice";
import { AxiosResponse, AxiosError } from "axios";
import LoadingCircle from "../../shared/components/LoadingCircle";
import { FieldError, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert } from "@mui/material";
import { AuthService } from "../../services/auth/auth.service";
import { SignUpValidation } from "../../validations/Auth.validation";

interface IFormInput {
  login: string;
  senha: string;
  senha_confirmacao: string;
}

function Signup() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [hasErrors, setErrors] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(SignUpValidation) });
  const authService = new AuthService();

  useEffect(() => {
    setErrors(Object.entries(errors).length !== 0);
  });

  function handleRegister(data: IFormInput) {
    setIsLoading(true);
    authService
      .register(data.login, data.senha, data.senha_confirmacao)
      .then(({ data }: AxiosResponse<{ auth_token: string }>) => {
        dispatch(authenticate(data.auth_token));
        setIsLoading(false);
        navigate("/app");
      })
      .catch((e: AxiosError) => {
        if (e.response?.status) {
          handleApiError(e.response.status, e.response.data);
        } else {
          setApiError("Ocorreu um erro, contate o administrador do sistema.");
        }
        setIsLoading(false);
      });
  }

  function handleApiError(status: number, data?: { message: string }) {
    if (status) {
      switch (status) {
        case 400:
          if (data && data.message.includes("in use")) {
            setApiError("O login já está sendo utilizado.");
          } else {
            setApiError("Credenciais inválidas");
          }
          break;
        default:
          setApiError("Ocorreu um erro, contate o administrador do sistema.");
          break;
      }
    }
  }

  return (
    <Box>
      <LoadingCircle open={isLoading} />
      <HomeForm
        data-testid="signup-form"
        onSubmit={handleSubmit(handleRegister)}
        onChange={() => setApiError("")}
      >
        {!!apiError && (
          <Alert sx={{ mb: 2 }} severity="error">
            {apiError}
          </Alert>
        )}
        {hasErrors && (
          <Alert severity="error">
            Dados inválidos.
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
        <Input type="password" {...register("senha", { required: true })} />
        <StyledLabel error={!!errors.senha_confirmacao} sx={{ mt: 2 }}>
          Confirmar senha
        </StyledLabel>
        <Input
          type="password"
          {...register("senha_confirmacao", { required: true })}
          sx={{ mb: 4 }}
        />
        <StyledSubmit> Cadastrar </StyledSubmit>
      </HomeForm>
    </Box>
  );
}

export default Signup;
