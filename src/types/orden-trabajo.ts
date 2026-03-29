export type TipoOt = "CORRECTIVA" | "PREVENTIVA";

export const TIPO_OT_LABELS: Record<TipoOt, string> = {
  CORRECTIVA: "Correctiva",
  PREVENTIVA: "Preventiva",
};

export interface OrdenTrabajo {
  id: number;
  idTerminal: number;
  nombreTerminal: string;
  tipoOt: TipoOt | null;
  nroOtManager: number | null;
  idBus: number | null;
  patenteB: string | null;
  km: number | null;
  ppu: string | null;
  idConductor: number | null;
  nombreCompletoConductor: string | null;
  fechaHoraIngreso: string | null;
  fechaHoraSalida: string | null;
  trabajoARealizar: string | null;
  obsTrabMecanico: string | null;
  obsTrabElectrico: string | null;
  idJefeTurnoPatio: number | null;
  nombreCompletoJefeTurnoPatio: string | null;
  horaJefeTurnoPatio: string | null;
  idJefeTurnoMant: number | null;
  nombreCompletoJefeTurnoMant: string | null;
  horaJefeTurnoMant: string | null;
  idSupervCalidad: number | null;
  nombreCompletoSupervCalidad: string | null;
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
