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
  torreControl: {
    base: `${BASE_URL}/torre-control`,
    byId: (id: number) => `${BASE_URL}/torre-control/${id}`,
    byBus: (idBus: number) => `${BASE_URL}/torre-control/bus/${idBus}`,
    abiertos: `${BASE_URL}/torre-control/abiertos`,
    cerrados: `${BASE_URL}/torre-control/cerrados`,
  },
  cofpatio: {
    base: `${BASE_URL}/cofpatio`,
    byId: (id: number) => `${BASE_URL}/cofpatio/${id}`,
    byBus: (idBus: number) => `${BASE_URL}/cofpatio/bus/${idBus}`,
  },
  ordenesTrabajoProg: {
    base: `${BASE_URL}/ordenes-trabajo-prog`,
    byId: (id: number) => `${BASE_URL}/ordenes-trabajo-prog/${id}`,
    byBus: (idBus: number) => `${BASE_URL}/ordenes-trabajo-prog/bus/${idBus}`,
    byTerminal: (idTerminal: number) => `${BASE_URL}/ordenes-trabajo-prog/terminal/${idTerminal}`,
  },
  ordenesTrabajoMovil: {
    base: `${BASE_URL}/ordenes-trabajo-movil`,
    byId: (id: number) => `${BASE_URL}/ordenes-trabajo-movil/${id}`,
    byTerminal: (idTerminal: number) => `${BASE_URL}/ordenes-trabajo-movil/terminal/${idTerminal}`,
  },
  moviles: {
    base: `${BASE_URL}/moviles`,
    byId: (id: number) => `${BASE_URL}/moviles/${id}`,
  },
} as const;
