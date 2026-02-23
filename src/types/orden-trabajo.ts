export interface OrdenTrabajo {
  idOrdenTrabajo: number;
  descripcionOt: string;
  fechaInicio: string;
  fechaFin: string | null;
  estadoOt: string;
  activoOt: boolean;
}
