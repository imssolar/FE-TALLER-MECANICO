export interface TorreControl {
  id: number;
  idBus: number;
  patenteB: string | null;
  falla: string | null;
  tipoFalla: string | null;
  idEmpleadoMecanico: number | null;
  nombreCompletoMecanico: string | null;
  idEmpleadoElectrico: number | null;
  nombreCompletoElectrico: string | null;
  status: string | null;
  cerrado: boolean | null;
}

export interface CreateTorreControlDto {
  idBus: number;
  falla?: string;
  tipoFalla?: string;
  idEmpleadoMecanico?: number;
  idEmpleadoElectrico?: number;
  status?: string;
  cerrado?: boolean;
}

export interface UpdateTorreControlDto {
  idBus?: number;
  falla?: string;
  tipoFalla?: string;
  idEmpleadoMecanico?: number;
  idEmpleadoElectrico?: number;
  status?: string;
  cerrado?: boolean;
}

export const STATUS_LABELS: Record<string, string> = {
  ABIERTO: "Abierto",
  EN_PROCESO: "En proceso",
  CERRADO: "Cerrado",
};

export const TIPO_EMERGENCIA_LABELS: Record<string, string> = {
  MECANICA: "Mecánica",
  ELECTRICA: "Eléctrica",
  CARROCERIA: "Carrocería",
  NEUMATICOS: "Neumáticos",
  OTRO: "Otro",
};
