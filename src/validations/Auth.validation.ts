import * as yup from "yup";

export const LoginValidation = yup
  .object({
    login: yup.string().min(6, "Login deve conter pelo menos 6 caracteres."),
    senha: yup.string().min(8, "Senha deve conter pelo menos 8 caracteres."),
  })
  .required();

export const SignUpValidation = yup
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
