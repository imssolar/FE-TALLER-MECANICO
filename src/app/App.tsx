import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/auth.store";
import { Providers } from "./providers";
import { PrivateRoute } from "@/components/auth/PrivateRoute";
import { DefaultLayout } from "@/components/layout/DefaultLayout";
import SignIn from "@/pages/auth/SignIn";
import Dashboard from "@/pages/dashboard/Dashboard";
import Buses from "@/pages/buses/Buses";
import Empleados from "@/pages/empleados/Empleados";
import OrdenesTrabajo from "@/pages/ordenes-trabajo/OrdenesTrabajo";

function AppRoutes() {
  const loadFromStorage = useAuthStore((s) => s.loadFromStorage);

  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  return (
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
        <Route path="/ordenes-trabajo" element={<OrdenesTrabajo />} />
      </Route>

      <Route path="*" element={<Navigate to="/auth/sign-in" />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Providers>
        <AppRoutes />
      </Providers>
    </BrowserRouter>
  );
}
