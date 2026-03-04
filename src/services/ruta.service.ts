import api from "./api";
import { API_ENDPOINTS } from "@/config/endpoints";
import type { Ruta, CreateRutaDto, UpdateRutaDto } from "@/types/ruta";

export const rutaService = {
  getAll: async (): Promise<Ruta[]> => {
    const response = await api.get<Ruta[]>(API_ENDPOINTS.rutas.base);
    return response.data;
  },

  getById: async (id: number): Promise<Ruta> => {
    const response = await api.get<Ruta>(API_ENDPOINTS.rutas.byId(id));
    return response.data;
  },

  create: async (data: CreateRutaDto): Promise<Ruta> => {
    const response = await api.post<Ruta>(API_ENDPOINTS.rutas.base, data);
    return response.data;
  },

  update: async (id: number, data: UpdateRutaDto): Promise<Ruta> => {
    const response = await api.patch<Ruta>(API_ENDPOINTS.rutas.byId(id), data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(API_ENDPOINTS.rutas.byId(id));
  },
};
