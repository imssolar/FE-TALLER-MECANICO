import api from "./api";
import { API_ENDPOINTS } from "@/config/endpoints";
import type { Cofpatio, CreateCofpatioDto, UpdateCofpatioDto } from "@/types/cofpatio";

export const cofpatioService = {
  getAll: async (): Promise<Cofpatio[]> => {
    const response = await api.get<Cofpatio[]>(API_ENDPOINTS.cofpatio.base);
    return response.data;
  },

  getById: async (id: number): Promise<Cofpatio> => {
    const response = await api.get<Cofpatio>(API_ENDPOINTS.cofpatio.byId(id));
    return response.data;
  },

  getByBus: async (idBus: number): Promise<Cofpatio[]> => {
    const response = await api.get<Cofpatio[]>(API_ENDPOINTS.cofpatio.byBus(idBus));
    return response.data;
  },

  create: async (data: CreateCofpatioDto): Promise<Cofpatio> => {
    const response = await api.post<Cofpatio>(API_ENDPOINTS.cofpatio.base, data);
    return response.data;
  },

  update: async (id: number, data: UpdateCofpatioDto): Promise<Cofpatio> => {
    const response = await api.patch<Cofpatio>(API_ENDPOINTS.cofpatio.byId(id), data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(API_ENDPOINTS.cofpatio.byId(id));
  },
};
