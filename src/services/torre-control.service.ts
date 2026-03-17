import api from "./api";
import { API_ENDPOINTS } from "@/config/endpoints";
import type { TorreControl, CreateTorreControlDto, UpdateTorreControlDto } from "@/types/torre-control";

export const torreControlService = {
  getAll: async (): Promise<TorreControl[]> => {
    const response = await api.get<TorreControl[]>(API_ENDPOINTS.torreControl.base);
    return response.data;
  },

  getById: async (id: number): Promise<TorreControl> => {
    const response = await api.get<TorreControl>(API_ENDPOINTS.torreControl.byId(id));
    return response.data;
  },

  getAbiertos: async (): Promise<TorreControl[]> => {
    const response = await api.get<TorreControl[]>(API_ENDPOINTS.torreControl.abiertos);
    return response.data;
  },

  getCerrados: async (): Promise<TorreControl[]> => {
    const response = await api.get<TorreControl[]>(API_ENDPOINTS.torreControl.cerrados);
    return response.data;
  },

  getByBus: async (idBus: number): Promise<TorreControl[]> => {
    const response = await api.get<TorreControl[]>(API_ENDPOINTS.torreControl.byBus(idBus));
    return response.data;
  },

  create: async (data: CreateTorreControlDto): Promise<TorreControl> => {
    const response = await api.post<TorreControl>(API_ENDPOINTS.torreControl.base, data);
    return response.data;
  },

  update: async (id: number, data: UpdateTorreControlDto): Promise<TorreControl> => {
    const response = await api.patch<TorreControl>(API_ENDPOINTS.torreControl.byId(id), data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(API_ENDPOINTS.torreControl.byId(id));
  },
};
