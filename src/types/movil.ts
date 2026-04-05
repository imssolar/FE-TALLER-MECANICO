export interface Movil {
  id: number;
  patente: string;
  marca: string | null;
  modelo: string | null;
  responsable: string | null;
  anoFabricacion: number | null;
  operativa: boolean;
  km: number | null;
  fechaRevisionTecnica: string | null;
  fechaRevisionGases: string | null;
}
