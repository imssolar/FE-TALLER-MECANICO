import api from "./api";
import { API_ENDPOINTS } from "@/config/endpoints";
import type { Empleado, CargoEmpleado, CreateEmpleadoDto, UpdateEmpleadoDto } from "@/types/empleado";

export const empleadoService = {
  getAll: async (): Promise<Empleado[]> => {
    const response = await api.get<Empleado[]>(API_ENDPOINTS.empleados.base);
    return response.data;
  },

  getById: async (id: number): Promise<Empleado> => {
    const response = await api.get<Empleado>(API_ENDPOINTS.empleados.byId(id));
    return response.data;
  },

  create: async (data: CreateEmpleadoDto): Promise<Empleado> => {
    const response = await api.post<Empleado>(API_ENDPOINTS.empleados.base, data);
    return response.data;
  },

  update: async (id: number, data: UpdateEmpleadoDto): Promise<Empleado> => {
    const response = await api.patch<Empleado>(API_ENDPOINTS.empleados.byId(id), data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(API_ENDPOINTS.empleados.byId(id));
  },

  getByCargo: async (cargo: CargoEmpleado): Promise<Empleado[]> => {
    const response = await api.get<Empleado[]>(API_ENDPOINTS.empleados.byCargo(cargo));
    return response.data;
  },
};
