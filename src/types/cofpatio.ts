export interface Cofpatio {
  id: number;
  idBus: number | null;
  patenteB: string | null;
  km: number | null;
  fechaHora: string | null;
  fechaHoraOperativa: string | null;
  lugarPanne: string | null;
  cofPatio: string | null;
  nroCp: string | null;
  combustible: boolean | null;
  idEmpleadoConductor: number | null;
  nombreCompletoConductor: string | null;
  falla: string | null;
  tipoFalla: string | null;
  ubicacion: string | null;
  ubicacion2: string | null;
  ubicacionTerreno: string | null;
  cabezal: string | null;
  horaReal: string | null;
  trabajoTerreno: string | null;
  obsTerreno: string | null;
  operativaTerreno: boolean | null;
  idEmpleadoMecanico: number | null;
  nombreCompletoMecanico: string | null;
  grua: boolean | null;
  horaLevantamiento: string | null;
  tiempoDetencion: string | null;
  idEmpleadoResponsable: number | null;
  nombreCompletoResponsable: string | null;
  aceiteMotor: number | null;
  aceiteTrans: number | null;
  aceiteDir: number | null;
  refrigerante: number | null;
  codigoPanne: number | null;
  idEmpleadoResponsableCierre: number | null;
  nombreCompletoResponsableCierre: string | null;
  idIntranet: number | null;
}

export interface CreateCofpatioDto {
  idBus?: number;
  km?: number;
  fechaHora?: string;
  fechaHoraOperativa?: string;
  lugarPanne?: string;
  cofPatio?: string;
  nroCp?: string;
  combustible?: boolean;
  idEmpleadoConductor?: number;
  falla?: string;
  tipoFalla?: string;
  ubicacion?: string;
  ubicacion2?: string;
  ubicacionTerreno?: string;
  cabezal?: string;
  horaReal?: string;
  trabajoTerreno?: string;
  obsTerreno?: string;
  operativaTerreno?: boolean;
  idEmpleadoMecanico?: number;
  grua?: boolean;
  horaLevantamiento?: string;
  tiempoDetencion?: string;
  idEmpleadoResponsable?: number;
  aceiteMotor?: number;
  aceiteTrans?: number;
  aceiteDir?: number;
  refrigerante?: number;
  codigoPanne?: number;
  idEmpleadoResponsableCierre?: number;
  idIntranet?: number;
}

export interface UpdateCofpatioDto extends Partial<CreateCofpatioDto> {}

export const TIPO_FALLA_COFPATIO_LABELS: Record<string, string> = {
  MECANICA: "Mecánica",
  ELECTRICA: "Eléctrica",
  CARROCERIA: "Carrocería",
  NEUMATICOS: "Neumáticos",
  COMBUSTIBLE: "Combustible",
  OTRO: "Otro",
};
