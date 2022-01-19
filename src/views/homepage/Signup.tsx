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
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert } from "@mui/material";
import { register as registerUsuario } from "../../services/auth/auth.service";

interface IFormInput {
  login: string;
  senha: string;
  senha_confirmacao: string;
}

const schema = yup
  .object({
    login: yup.string().min(6, "Login deve conter pelo menos 6 caracteres."),
    senha: yup.string().min(8, "Senha deve conter pelo menos 8 caracteres."),
    senha_confirmacao: yup
      .string()
      .test(
        "passwords-match",
        "As senhas não coincidem",
        (value, context) => context.parent.senha === value
      ),
  })
  .required();

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
  } = useForm<IFormInput>({ resolver: yupResolver(schema) });

  useEffect(() => {
    setErrors(Object.entries(errors).length !== 0);
  });

  function handleRegister(data: IFormInput) {
    setIsLoading(true);
    registerUsuario(data.login, data.senha, data.senha_confirmacao)
      .then(({ data }: AxiosResponse<{ auth_token: string }>) => {
        dispatch(authenticate(data.auth_token));
        setIsLoading(false);
        navigate("/app");
      })
      .catch((e: AxiosError) => {
        if (e.response?.status) {
          handleApiError(e.response.status, e.response.data);
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
        data-testid="login-form"
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
            Login inválido.
            <p> {errors.login?.message} </p>
            <p>{errors.senha?.message} </p>
            <p>{errors.senha_confirmacao?.message}</p>
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
