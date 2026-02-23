import { Navigate } from "react-router";
import { useAuthStore } from "@/stores/auth.store";

export function PrivateRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/auth/sign-in" />;
}
