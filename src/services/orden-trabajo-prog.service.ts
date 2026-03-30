import { api } from "@/services/api";
import { API_ENDPOINTS } from "@/config/endpoints";
import {
  OrdenTrabajoProg,
  CreateOrdenTrabajoProgDto,
  UpdateOrdenTrabajoProgDto,
} from "@/types/orden-trabajo-prog";

export const ordenTrabajoProgService = {
  findAll: async (): Promise<OrdenTrabajoProg[]> =>
    (await api.get(API_ENDPOINTS.ordenesTrabajoProg.base)).data,

  findById: async (id: number): Promise<OrdenTrabajoProg> =>
    (await api.get(API_ENDPOINTS.ordenesTrabajoProg.byId(id))).data,

  findByBus: async (idBus: number): Promise<OrdenTrabajoProg[]> =>
    (await api.get(API_ENDPOINTS.ordenesTrabajoProg.byBus(idBus))).data,

  findByTerminal: async (idTerminal: number): Promise<OrdenTrabajoProg[]> =>
    (await api.get(API_ENDPOINTS.ordenesTrabajoProg.byTerminal(idTerminal))).data,

  create: async (dto: CreateOrdenTrabajoProgDto): Promise<OrdenTrabajoProg> =>
    (await api.post(API_ENDPOINTS.ordenesTrabajoProg.base, dto)).data,

  update: async (id: number, dto: UpdateOrdenTrabajoProgDto): Promise<OrdenTrabajoProg> =>
    (await api.patch(API_ENDPOINTS.ordenesTrabajoProg.byId(id), dto)).data,

  delete: async (id: number): Promise<void> =>
    (await api.delete(API_ENDPOINTS.ordenesTrabajoProg.byId(id))).data,
};
