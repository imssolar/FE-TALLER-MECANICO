import api from "./api";
import { API_ENDPOINTS } from "@/config/endpoints";
import type { Bus, CreateBusDto, UpdateBusDto, BusEstadisticas } from "@/types/bus";

export const busService = {
  getAll: async (): Promise<Bus[]> => {
    const response = await api.get<Bus[]>(API_ENDPOINTS.buses.base);
    return response.data;
  },

  getById: async (id: number): Promise<Bus> => {
    const response = await api.get<Bus>(API_ENDPOINTS.buses.byId(id));
    return response.data;
  },

  create: async (data: CreateBusDto): Promise<Bus> => {
    const response = await api.post<Bus>(API_ENDPOINTS.buses.base, data);
    return response.data;
  },

  update: async (id: number, data: UpdateBusDto): Promise<Bus> => {
    const response = await api.patch<Bus>(API_ENDPOINTS.buses.byId(id), data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(API_ENDPOINTS.buses.byId(id));
  },

  getEstadisticas: async (): Promise<BusEstadisticas> => {
    const response = await api.get<BusEstadisticas>(API_ENDPOINTS.buses.estadisticas);
    return response.data;
  },
};
