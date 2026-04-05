export interface OrdenTrabajoMovil {
  id: number;
  tipoOtm: string | null;
  idTerminal: number | null;
  nroOtManager: number | null;
  idMovil: number | null;
  patenteMovil: string | null;
  km: number | null;
  ppu: string | null;
  idConductor: number | null;
  nombreCompletoConductor: string | null;
  fechaHoraIngreso: string | null;
  fechaHoraSalida: string | null;
  trabajoARealizar: string | null;
  obsRecepcion: string | null;
  idResponsable: number | null;
  nombreCompletoResponsable: string | null;
  horaResponsable: string | null;
  idRespTecnico: number | null;
  nombreCompletoRespTecnico: string | null;
  horaTecnico: string | null;
  idRespRecepciona: number | null;
  nombreCompletoRespRecepciona: string | null;
  horaRecepcion: string | null;
  obsTecnicas: string | null;
  autoriza: string | null;
  retira: string | null;
  bodega: string | null;
  formato: string | null;
}

export interface CreateOrdenTrabajoMovilDto {
  id: number;
  tipoOtm?: string;
  idTerminal?: number;
  nroOtManager?: number;
  idMovil?: number;
  km?: number;
  ppu?: string;
  idConductor?: number;
  fechaHoraIngreso?: string;
  fechaHoraSalida?: string;
  trabajoARealizar?: string;
  obsRecepcion?: string;
  idResponsable?: number;
  horaResponsable?: string;
  idRespTecnico?: number;
  horaTecnico?: string;
  idRespRecepciona?: number;
  horaRecepcion?: string;
  obsTecnicas?: string;
  autoriza?: string;
  retira?: string;
  bodega?: string;
  formato?: string;
}

export interface UpdateOrdenTrabajoMovilDto {
  tipoOtm?: string;
  idTerminal?: number;
  nroOtManager?: number;
  idMovil?: number;
  km?: number;
  ppu?: string;
  idConductor?: number;
  fechaHoraIngreso?: string;
  fechaHoraSalida?: string;
  trabajoARealizar?: string;
  obsRecepcion?: string;
  idResponsable?: number;
  horaResponsable?: string;
  idRespTecnico?: number;
  horaTecnico?: string;
  idRespRecepciona?: number;
  horaRecepcion?: string;
  obsTecnicas?: string;
  autoriza?: string;
  retira?: string;
  bodega?: string;
  formato?: string;
}
