export interface Modelo {
  id: number;
  modelo: string;
  kmDiario: number;
  observaciones: string;
}

export interface CreateModeloDto {
  modelo: string;
  kmDiario?: number;
  observaciones?: string;
}

export interface UpdateModeloDto {
  modelo?: string;
  kmDiario?: number;
  observaciones?: string;
}
