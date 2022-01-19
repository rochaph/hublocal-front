import { createClient } from "../client.service";
import { AxiosInstance } from "axios";

const client: AxiosInstance = createClient();

export const register = (
  login: string,
  senha: string,
  senha_confirmacao: string
) => {
  return client.post("/auth/register", {
    login,
    senha,
    senha_confirmacao,
  });
};

export const login = (login: string, senha: string) => {
  return client.post("/auth/login", {
    login,
    senha,
  });
};

export default { register, login };
