import api from "./api";
import { API_ENDPOINTS } from "@/config/endpoints";
import type { Terminal, CreateTerminalDto, UpdateTerminalDto } from "@/types/terminal";

export const terminalService = {
  getAll: async (): Promise<Terminal[]> => {
    const response = await api.get<Terminal[]>(API_ENDPOINTS.terminales.base);
    return response.data;
  },

  getById: async (id: number): Promise<Terminal> => {
    const response = await api.get<Terminal>(API_ENDPOINTS.terminales.byId(id));
    return response.data;
  },

  create: async (data: CreateTerminalDto): Promise<Terminal> => {
    const response = await api.post<Terminal>(API_ENDPOINTS.terminales.base, data);
    return response.data;
  },

  update: async (id: number, data: UpdateTerminalDto): Promise<Terminal> => {
    const response = await api.patch<Terminal>(API_ENDPOINTS.terminales.byId(id), data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(API_ENDPOINTS.terminales.byId(id));
  },
};
