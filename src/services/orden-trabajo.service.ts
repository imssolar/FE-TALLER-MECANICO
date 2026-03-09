import api from "./api";
import { API_ENDPOINTS } from "@/config/endpoints";
import type {
  OrdenTrabajo,
  CreateOrdenTrabajoDto,
  UpdateOrdenTrabajoDto,
} from "@/types/orden-trabajo";

export const ordenTrabajoService = {
  getAll: async (): Promise<OrdenTrabajo[]> => {
    const response = await api.get<OrdenTrabajo[]>(API_ENDPOINTS.ordenesTrabajo.base);
    return response.data;
  },

  getById: async (id: number): Promise<OrdenTrabajo> => {
    const response = await api.get<OrdenTrabajo>(API_ENDPOINTS.ordenesTrabajo.byId(id));
    return response.data;
  },

  getByBus: async (idBus: number): Promise<OrdenTrabajo[]> => {
    const response = await api.get<OrdenTrabajo[]>(API_ENDPOINTS.ordenesTrabajo.byBus(idBus));
    return response.data;
  },

  getByTerminal: async (idTerminal: number): Promise<OrdenTrabajo[]> => {
    const response = await api.get<OrdenTrabajo[]>(API_ENDPOINTS.ordenesTrabajo.byTerminal(idTerminal));
    return response.data;
  },

  create: async (data: CreateOrdenTrabajoDto): Promise<OrdenTrabajo> => {
    const response = await api.post<OrdenTrabajo>(API_ENDPOINTS.ordenesTrabajo.base, data);
    return response.data;
  },

  update: async (id: number, data: UpdateOrdenTrabajoDto): Promise<OrdenTrabajo> => {
    const response = await api.patch<OrdenTrabajo>(API_ENDPOINTS.ordenesTrabajo.byId(id), data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(API_ENDPOINTS.ordenesTrabajo.byId(id));
  },
};
