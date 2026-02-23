import { create } from "zustand";
import { STORAGE_KEYS } from "@/constants/session";

interface AuthState {
  token: string | null;
  userName: string | null;
  isAuthenticated: boolean;
  setAuth: (token: string, userName: string) => void;
  logout: () => void;
  loadFromStorage: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  userName: null,
  isAuthenticated: false,

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

  loadFromStorage: () => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    const userName = localStorage.getItem(STORAGE_KEYS.USER_NAME);
    if (token) {
      set({ token, userName, isAuthenticated: true });
    }
  },
}));
