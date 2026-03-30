import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { PrivateRoute } from "@/components/auth/PrivateRoute";
import { DefaultLayout } from "@/components/layout/DefaultLayout";
import { Providers } from "./providers";
import SignIn from "@/pages/auth/SignIn";
import Dashboard from "@/pages/dashboard/Dashboard";
import Buses from "@/pages/buses/Buses";
import Empleados from "@/pages/empleados/Empleados";
import OrdenesTrabajo from "@/pages/ordenes-trabajo/OrdenesTrabajo";
import Modelos from "@/pages/modelos/Modelos";
import Terminales from "@/pages/terminales/Terminales";
import Rutas from "@/pages/rutas/Rutas";
import TorreControl from "@/pages/torre-control/TorreControl";
import Cofpatio from "@/pages/cofpatio/Cofpatio";
import OrdenesTrabajoProg from "@/pages/orden-trabajo-prog/OrdenesTrabajoProg";

export default function App() {
  return (
    <BrowserRouter>
      <Providers>
        <Routes>
          <Route path="/auth/sign-in" element={<SignIn />} />

          <Route
            element={
              <PrivateRoute>
                <DefaultLayout />
              </PrivateRoute>
            }
          >
            <Route path="/" element={<Dashboard />} />
            <Route path="/buses" element={<Buses />} />
            <Route path="/empleados" element={<Empleados />} />
            <Route path="/torre-control" element={<TorreControl />} />
            <Route path="/cofpatio" element={<Cofpatio />} />
            <Route path="/ordenes-trabajo" element={<OrdenesTrabajo />} />
            <Route path="/ordenes-trabajo-prog" element={<OrdenesTrabajoProg />} />
            <Route path="/catalogos/modelos" element={<Modelos />} />
            <Route path="/catalogos/terminales" element={<Terminales />} />
            <Route path="/catalogos/rutas" element={<Rutas />} />
          </Route>

          <Route path="*" element={<Navigate to="/auth/sign-in" />} />
        </Routes>
      </Providers>
    </BrowserRouter>
  );
}
