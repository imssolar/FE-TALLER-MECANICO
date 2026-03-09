import type { Terminal } from "./terminal";
import type { Bus } from "./bus";

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
  conductor: string | null;
  fechaHoraIngreso: string | null;
  fechaHoraSalida: string | null;
  trabajoARealizar: string | null;
  obsTrabMecanico: string | null;
  obsTrabElectrico: string | null;
  jefeTurnoPatio: string | null;
  horaJefeTurnoPatio: string | null;
  jefeTurnoMant: string | null;
  horaJefeTurnoMant: string | null;
  supervCalidad: string | null;
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
  conductor?: string;
  fechaHoraIngreso?: string;
  fechaHoraSalida?: string;
  trabajoARealizar?: string;
  obsTrabMecanico?: string;
  obsTrabElectrico?: string;
  jefeTurnoPatio?: string;
  horaJefeTurnoPatio?: string;
  jefeTurnoMant?: string;
  horaJefeTurnoMant?: string;
  supervCalidad?: string;
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
  conductor?: string;
  fechaHoraIngreso?: string;
  fechaHoraSalida?: string;
  trabajoARealizar?: string;
  obsTrabMecanico?: string;
  obsTrabElectrico?: string;
  jefeTurnoPatio?: string;
  horaJefeTurnoPatio?: string;
  jefeTurnoMant?: string;
  horaJefeTurnoMant?: string;
  supervCalidad?: string;
  horaSupervCalidad?: string;
  obsControlCalidad?: string;
  repAutoriza?: string;
  repRetira?: string;
  repBodega?: string;
  itemFalla?: string;
}
