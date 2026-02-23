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
  },
  ordenesTrabajo: {
    base: `${BASE_URL}/ordenes-trabajo`,
    byId: (id: number) => `${BASE_URL}/ordenes-trabajo/${id}`,
  },
  terminales: {
    base: `${BASE_URL}/terminales`,
    byId: (id: number) => `${BASE_URL}/terminales/${id}`,
  },
  modelos: {
    base: `${BASE_URL}/modelos`,
    byId: (id: number) => `${BASE_URL}/modelos/${id}`,
  },
} as const;
