import api from "./api";
import { API_ENDPOINTS } from "@/config/endpoints";
import type { Modelo, CreateModeloDto, UpdateModeloDto } from "@/types/modelo";

export const modeloService = {
  getAll: async (): Promise<Modelo[]> => {
    const response = await api.get<Modelo[]>(API_ENDPOINTS.modelos.base);
    return response.data;
  },

  getById: async (id: number): Promise<Modelo> => {
    const response = await api.get<Modelo>(API_ENDPOINTS.modelos.byId(id));
    return response.data;
  },

  create: async (data: CreateModeloDto): Promise<Modelo> => {
    const response = await api.post<Modelo>(API_ENDPOINTS.modelos.base, data);
    return response.data;
  },

  update: async (id: number, data: UpdateModeloDto): Promise<Modelo> => {
    const response = await api.patch<Modelo>(API_ENDPOINTS.modelos.byId(id), data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(API_ENDPOINTS.modelos.byId(id));
  },
};
