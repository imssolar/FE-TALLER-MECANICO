import { useNavigate } from "react-router";
import { useAuthStore } from "@/stores/auth.store";
import { authService } from "@/services/auth.service";

export function useAuth() {
  const navigate = useNavigate();
  const { setAuth, logout: storeLogout } = useAuthStore();

  const signIn = async (username: string, password: string) => {
    const data = await authService.signIn(username, password);
    setAuth(data.access_token, username);
    navigate("/");
  };

  const logout = () => {
    authService.logout().catch(() => {});
    storeLogout();
    navigate("/auth/sign-in");
  };

  const refreshToken = async () => {
    const newToken = await authService.refreshToken();
    const userName = useAuthStore.getState().userName ?? "";
    setAuth(newToken, userName);
  };

  return { signIn, logout, refreshToken };
}
