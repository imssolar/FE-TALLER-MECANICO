export interface Ruta {
  idRuta: number;
  ruta: string;
}

export interface CreateRutaDto {
  ruta: string;
}

export interface UpdateRutaDto {
  ruta?: string;
}
