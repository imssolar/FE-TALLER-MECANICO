export type CargoEmpleado = "CONDUCTOR" | "MECANICO" | "ADMINISTRATIVO" | "JEFE_TERMINAL";
export type Talla = "XS" | "S" | "M" | "L" | "XL" | "XXL";
export type EstadoCivil = "SOLTERO" | "CASADO" | "DIVORCIADO" | "VIUDO";
export type Escolaridad = "BASICA" | "MEDIA" | "TECNICA" | "UNIVERSITARIA" | "POSTGRADO";
export type Parentesco = "PADRE" | "MADRE" | "HERMANO" | "HERMANA" | "CONYUGE" | "HIJO" | "HIJA" | "OTRO";
export type LicenciaConducir = "A1" | "A2" | "A3" | "A4" | "A5" | "D" | "E" | "F";

export interface Empleado {
  id: number;
  rut: string;
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  nombreCompleto: string;
  cargo: CargoEmpleado;
  telefono: string | null;
  activo: boolean;
  fechaIngreso: string | null;
  licenciaConducir: string | null;
  fechaVencimientoLicencia: string | null;
  talla: Talla | null;
  calzado: number | null;
  fechaNacimiento: string | null;
  estadoCivil: EstadoCivil | null;
  hijos: number | null;
  direccion: string | null;
  comuna: string | null;
  ciudad: string | null;
  telefono2: string | null;
  escolaridad: Escolaridad | null;
  nacionalidad: string | null;
  tipoVisa: string | null;
  contactoEmergencia: string | null;
  fonoContactoEmergencia: string | null;
  parentesco: Parentesco | null;
  exTrabajador: boolean;
  observaciones: string | null;
  costo: number | null;
  taller: string | null;
}

export interface CreateEmpleadoDto {
  rut: string;
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  cargo: CargoEmpleado;
  telefono?: string;
  fechaIngreso: string;
  activo?: boolean;
  licenciaConducir?: LicenciaConducir;
  fechaVencimientoLicencia?: string;
  talla?: Talla;
  calzado?: number;
  fechaNacimiento?: string;
  estadoCivil?: EstadoCivil;
  hijos?: number;
  direccion?: string;
  telefono2?: string;
  escolaridad?: Escolaridad;
  contactoEmergencia?: string;
  fonoContactoEmergencia?: string;
  parentesco?: Parentesco;
  exTrabajador?: boolean;
  observaciones?: string;
  costo?: number;
}

export interface UpdateEmpleadoDto {
  rut?: string;
  nombres?: string;
  apellidoPaterno?: string;
  apellidoMaterno?: string;
  cargo?: CargoEmpleado;
  telefono?: string;
  fechaIngreso?: string;
  activo?: boolean;
  licenciaConducir?: LicenciaConducir;
  fechaVencimientoLicencia?: string;
  talla?: Talla;
  calzado?: number;
  fechaNacimiento?: string;
  estadoCivil?: EstadoCivil;
  hijos?: number;
  direccion?: string;
  telefono2?: string;
  escolaridad?: Escolaridad;
  contactoEmergencia?: string;
  fonoContactoEmergencia?: string;
  parentesco?: Parentesco;
  exTrabajador?: boolean;
  observaciones?: string;
  costo?: number;
}

export const CARGO_LABELS: Record<CargoEmpleado, string> = {
  CONDUCTOR: "Conductor",
  MECANICO: "Mecánico",
  ADMINISTRATIVO: "Administrativo",
  JEFE_TERMINAL: "Jefe de Terminal",
};

export const TALLA_OPTIONS: Talla[] = ["XS", "S", "M", "L", "XL", "XXL"];

export const ESTADO_CIVIL_LABELS: Record<EstadoCivil, string> = {
  SOLTERO: "Soltero",
  CASADO: "Casado",
  DIVORCIADO: "Divorciado",
  VIUDO: "Viudo",
};

export const ESCOLARIDAD_LABELS: Record<Escolaridad, string> = {
  BASICA: "Básica",
  MEDIA: "Media",
  TECNICA: "Técnica",
  UNIVERSITARIA: "Universitaria",
  POSTGRADO: "Postgrado",
};

export const PARENTESCO_LABELS: Record<Parentesco, string> = {
  PADRE: "Padre",
  MADRE: "Madre",
  HERMANO: "Hermano",
  HERMANA: "Hermana",
  CONYUGE: "Cónyuge",
  HIJO: "Hijo",
  HIJA: "Hija",
  OTRO: "Otro",
};

export const LICENCIA_CONDUCIR_LABELS: Record<LicenciaConducir, string> = {
  A1: "A1 - Taxis (ya no se otorga)",
  A2: "A2 - Taxis, ambulancias, transporte 10-17 pasajeros",
  A3: "A3 - Transporte público/privado sin límite de capacidad",
  A4: "A4 - Transporte de carga > 3.500 kg",
  A5: "A5 - Carga articulada > 3.500 kg",
  D: "D - Maquinaria automotriz",
  E: "E - Vehículos de tracción animal",
  F: "F - Vehículos de emergencia",
};
