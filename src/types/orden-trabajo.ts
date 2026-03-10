import type { Terminal } from "./terminal";
import type { Bus } from "./bus";
import type { Empleado } from "./empleado";

export type TipoOt = "CORRECTIVA" | "PREVENTIVA";

export const TIPO_OT_LABELS: Record<TipoOt, string> = {
  CORRECTIVA: "Correctiva",
  PREVENTIVA: "Preventiva",
};

export interface OrdenTrabajo {
  id: number;
  terminal: Terminal | null;
  tipoOt: TipoOt | null;
  nroOtManager: number | null;
  bus: Bus | null;
  km: number | null;
  ppu: string | null;
  conductor: Empleado | null;
  fechaHoraIngreso: string | null;
  fechaHoraSalida: string | null;
  trabajoARealizar: string | null;
  obsTrabMecanico: string | null;
  obsTrabElectrico: string | null;
  jefeTurnoPatio: Empleado | null;
  horaJefeTurnoPatio: string | null;
  jefeTurnoMant: Empleado | null;
  horaJefeTurnoMant: string | null;
  supervCalidad: Empleado | null;
  horaSupervCalidad: string | null;
  obsControlCalidad: string | null;
  repAutoriza: string | null;
  repRetira: string | null;
  repBodega: string | null;
  itemFalla: string | null;
}

export interface CreateOrdenTrabajoDto {
  id: number;
  idTerminal?: number;
  tipoOt?: TipoOt;
  nroOtManager?: number;
  idBus?: number;
  km?: number;
  ppu?: string;
  idConductor?: number;
  fechaHoraIngreso?: string;
  fechaHoraSalida?: string;
  trabajoARealizar?: string;
  obsTrabMecanico?: string;
  obsTrabElectrico?: string;
  idJefeTurnoPatio?: number;
  horaJefeTurnoPatio?: string;
  idJefeTurnoMant?: number;
  horaJefeTurnoMant?: string;
  idSupervCalidad?: number;
  horaSupervCalidad?: string;
  obsControlCalidad?: string;
  repAutoriza?: string;
  repRetira?: string;
  repBodega?: string;
  itemFalla?: string;
}

export interface UpdateOrdenTrabajoDto {
  idTerminal?: number;
  tipoOt?: TipoOt;
  nroOtManager?: number;
  idBus?: number;
  km?: number;
  ppu?: string;
  idConductor?: number;
  fechaHoraIngreso?: string;
  fechaHoraSalida?: string;
  trabajoARealizar?: string;
  obsTrabMecanico?: string;
  obsTrabElectrico?: string;
  idJefeTurnoPatio?: number;
  horaJefeTurnoPatio?: string;
  idJefeTurnoMant?: number;
  horaJefeTurnoMant?: string;
  idSupervCalidad?: number;
  horaSupervCalidad?: string;
  obsControlCalidad?: string;
  repAutoriza?: string;
  repRetira?: string;
  repBodega?: string;
  itemFalla?: string;
}
