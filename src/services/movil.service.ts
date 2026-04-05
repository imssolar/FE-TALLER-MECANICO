import api from "@/services/api";
import { API_ENDPOINTS } from "@/config/endpoints";
import type { Movil } from "@/types/movil";

export const movilService = {
  getAll: async (): Promise<Movil[]> =>
    (await api.get(API_ENDPOINTS.moviles.base)).data,

  getById: async (id: number): Promise<Movil> =>
    (await api.get(API_ENDPOINTS.moviles.byId(id))).data,
};
