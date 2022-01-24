import { createClient } from "../client.service";
import { AxiosInstance, AxiosResponse } from "axios";
import { Empresa, Responsavel } from "../../typings/entities";

export class EmpresaService {
  private client: AxiosInstance;

  constructor() {
    this.client = createClient();
  }

  listAllEmpresas(
    page: number,
    limit: number
  ): Promise<AxiosResponse<{ empresas: Empresa[]; total: number }>> {
    return this.client.get(`/empresa?page=${page}&limit=${limit}`);
  }

  listAllEmpresasWithoutOffset(): Promise<
    AxiosResponse<{ empresas: Empresa[]; total: number }>
  > {
    return this.client.get(`/empresa`);
  }

  getById(id: number): Promise<
    AxiosResponse<
      Omit<Empresa, "responsaveis"> & {
        responsaveis: (Responsavel & { id: number })[];
      }
    >
  > {
    return this.client.get(`/empresa/${id}`);
  }

  getResponsaveis(
    id: number
  ): Promise<AxiosResponse<(Responsavel & { id: number })[]>> {
    return this.client.get(`/empresa/responsaveis/${id}`);
  }

  updateEmpresa(id: number, data: Empresa): Promise<AxiosResponse<void>> {
    return this.client.patch(`/empresa/${id}`, data);
  }

  createEmpresa(data: Empresa): Promise<AxiosResponse<void>> {
    return this.client.post("/empresa", data);
  }

  deleteEmpresa(id: number): Promise<AxiosResponse<void>> {
    return this.client.delete(`/empresa/${id}`);
  }
}
