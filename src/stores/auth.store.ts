import { create } from "zustand";
import { STORAGE_KEYS } from "@/constants/session";

interface AuthState {
  token: string | null;
  userName: string | null;
  isAuthenticated: boolean;
  setAuth: (token: string, userName: string) => void;
  logout: () => void;
}

const storedToken = localStorage.getItem(STORAGE_KEYS.TOKEN);
const storedUserName = localStorage.getItem(STORAGE_KEYS.USER_NAME);

export const useAuthStore = create<AuthState>((set) => ({
  token: storedToken,
  userName: storedUserName,
  isAuthenticated: !!storedToken,

  setAuth: (token, userName) => {
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    localStorage.setItem(STORAGE_KEYS.USER_NAME, userName);
    localStorage.setItem(STORAGE_KEYS.SESSION_START, Date.now().toString());
    set({ token, userName, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_NAME);
    localStorage.removeItem(STORAGE_KEYS.SESSION_START);
    set({ token: null, userName: null, isAuthenticated: false });
  },
}));
