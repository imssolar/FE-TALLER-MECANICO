export interface OrdenTrabajoProg {
  id: number;
  idTerminal: number | null;
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
  item: string | null;
  formato: string | null;
}

export interface CreateOrdenTrabajoProgDto {
  idTerminal?: number;
  nroOtManager?: number;
  idBus?: number;
  km?: number;
  ppu?: string;
  idConductor?: number;
  fechaHoraIngreso?: string;
  fechaHoraSalida?: string;
  trabajoARealizar?: string;
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
  item?: string;
  formato?: string;
}

export interface UpdateOrdenTrabajoProgDto {
  idTerminal?: number;
  nroOtManager?: number;
  idBus?: number;
  km?: number;
  ppu?: string;
  idConductor?: number;
  fechaHoraIngreso?: string;
  fechaHoraSalida?: string;
  trabajoARealizar?: string;
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
  item?: string;
  formato?: string;
}
