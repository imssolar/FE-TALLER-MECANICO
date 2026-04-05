import api from "@/services/api";
import { API_ENDPOINTS } from "@/config/endpoints";
import type {
  OrdenTrabajoMovil,
  CreateOrdenTrabajoMovilDto,
  UpdateOrdenTrabajoMovilDto,
} from "@/types/orden-trabajo-movil";

export const ordenTrabajoMovilService = {
  findAll: async (): Promise<OrdenTrabajoMovil[]> =>
    (await api.get(API_ENDPOINTS.ordenesTrabajoMovil.base)).data,

  findById: async (id: number): Promise<OrdenTrabajoMovil> =>
    (await api.get(API_ENDPOINTS.ordenesTrabajoMovil.byId(id))).data,

  findByTerminal: async (idTerminal: number): Promise<OrdenTrabajoMovil[]> =>
    (await api.get(API_ENDPOINTS.ordenesTrabajoMovil.byTerminal(idTerminal))).data,

  create: async (dto: CreateOrdenTrabajoMovilDto): Promise<OrdenTrabajoMovil> =>
    (await api.post(API_ENDPOINTS.ordenesTrabajoMovil.base, dto)).data,

  update: async (id: number, dto: UpdateOrdenTrabajoMovilDto): Promise<OrdenTrabajoMovil> =>
    (await api.patch(API_ENDPOINTS.ordenesTrabajoMovil.byId(id), dto)).data,

  delete: async (id: number): Promise<void> =>
    (await api.delete(API_ENDPOINTS.ordenesTrabajoMovil.byId(id))).data,
};
