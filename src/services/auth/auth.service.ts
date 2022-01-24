import { createClient } from "../client.service";
import { AxiosInstance } from "axios";

export class AuthService {
  private client: AxiosInstance;

  constructor() {
    this.client = createClient();
  }

  register(login: string, senha: string, senha_confirmacao: string) {
    return this.client.post("/auth/register", {
      login,
      senha,
      senha_confirmacao,
    });
  }

  login(login: string, senha: string) {
    return this.client.post("/auth/login", {
      login,
      senha,
    });
  }
}
