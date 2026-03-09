const BASE_URL = import.meta.env.VITE_API_URL;

export const API_ENDPOINTS = {
  auth: {
    signIn: `${BASE_URL}/auth/sign-in`,
    signUp: `${BASE_URL}/auth/sign-up`,
    refreshToken: `${BASE_URL}/auth/refresh-token`,
    logout: `${BASE_URL}/auth/logout`,
  },
  buses: {
    base: `${BASE_URL}/buses`,
    byId: (id: number) => `${BASE_URL}/buses/${id}`,
    estadisticas: `${BASE_URL}/buses/estadisticas`,
  },
  empleados: {
    base: `${BASE_URL}/empleados`,
    byId: (id: number) => `${BASE_URL}/empleados/${id}`,
    byCargo: (cargo: string) => `${BASE_URL}/empleados/cargo/${cargo}`,
  },
  ordenesTrabajo: {
    base: `${BASE_URL}/ordenes-trabajo`,
    byId: (id: number) => `${BASE_URL}/ordenes-trabajo/${id}`,
    byBus: (idBus: number) => `${BASE_URL}/ordenes-trabajo/bus/${idBus}`,
    byTerminal: (idTerminal: number) => `${BASE_URL}/ordenes-trabajo/terminal/${idTerminal}`,
  },
  terminales: {
    base: `${BASE_URL}/terminal`,
    byId: (id: number) => `${BASE_URL}/terminal/${id}`,
  },
  modelos: {
    base: `${BASE_URL}/modelos`,
    byId: (id: number) => `${BASE_URL}/modelos/${id}`,
  },
  rutas: {
    base: `${BASE_URL}/rutas`,
    byId: (id: number) => `${BASE_URL}/rutas/${id}`,
  },
} as const;
