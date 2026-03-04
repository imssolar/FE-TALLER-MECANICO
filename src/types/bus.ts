import type { Modelo } from "./modelo";
import type { Terminal } from "./terminal";

export type { Modelo, Terminal };

export interface Bus {
  idBus: number;
  patenteB: string;
  marcaB: string;
  motorB: string;
  anioFabB: number;
  transmisionB: string;
  kmB: number;
  zonaB: string;
  operativaB: boolean;
  activoB: boolean;
  mantencionB: boolean;
  operacionB: boolean;
  abastecimientoB: boolean;
  noControladaB: boolean;
  operativaPatio: boolean;
  nroNeumaticosB: number;
  nroBaterias: number;
  fechaEmergencia: string | null;
  obsEmergenciaB: string | null;
  proyRep: string | null;
  fechaRevisionTecnica: string | null;
  fechaRevisionGases: string | null;
  terminal: Terminal;
  modelo: Modelo;
}

export interface CreateBusDto {
  idBus: number;
  idTerminal: number;
  idModelo: number;
  patenteB?: string;
  marcaB?: string;
  motorB?: string;
  anioFabB?: number;
  transmisionB?: string;
  kmB?: number;
  zonaB?: string;
  nroNeumaticosB?: number;
  nroBaterias?: number;
}

export interface UpdateBusDto {
  idTerminal?: number;
  idModelo?: number;
  patenteB?: string;
  marcaB?: string;
  motorB?: string;
  anioFabB?: number;
  transmisionB?: string;
  kmB?: number;
  zonaB?: string;
  nroNeumaticosB?: number;
  nroBaterias?: number;
}

export interface BusEstadisticas {
  totalBuses: number;
  operativos: number;
  enMantencion: number;
  inactivos: number;
}
