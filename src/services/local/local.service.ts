import { AxiosInstance, AxiosResponse } from "axios";
import { createClient } from "../client.service";
import { Local } from "../../typings/entities";

export class LocalService {
  private client: AxiosInstance;

  constructor() {
    this.client = createClient();
  }

  listAllLocais(
    page: number,
    limit: number
  ): Promise<AxiosResponse<{ locais: Local[]; total: number }>> {
    return this.client.get(`/local?page=${page}&limit=${limit}`);
  }

  getLocalById(
    id: number
  ): Promise<AxiosResponse<Local & { empresaId: number }>> {
    return this.client.get(`/local/${id}`);
  }

  updateLocal(id: number, data: Local): Promise<AxiosResponse<void>> {
    return this.client.patch(`local/${id}`, data);
  }

  createLocal(data: Local): Promise<AxiosResponse<void>> {
    return this.client.post("/local", data);
  }

  deleteLocal(id: number): Promise<AxiosResponse<void>> {
    return this.client.delete(`/local/${id}`);
  }
}
