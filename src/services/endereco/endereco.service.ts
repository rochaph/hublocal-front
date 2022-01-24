import Axios, { AxiosInstance, AxiosResponse } from "axios";

export type EnderecoAPI = {
  bairro: string;
  cep: string;
  complemento: string;
  ddd: string;
  gia: string;
  ibge: string;
  localidade: string;
  logradouro: string;
  siafi: string;
  uf: string;
};

export class EnderecoService {
  private client: AxiosInstance;

  constructor() {
    this.client = Axios.create({
      baseURL: "https://viacep.com.br/ws",
    });
  }

  getEnderecoByCep(cep: string): Promise<AxiosResponse<EnderecoAPI>> {
    return this.client.get(`/${cep}/json`);
  }
}
