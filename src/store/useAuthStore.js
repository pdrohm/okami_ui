import { create } from "zustand";
import { persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";
import authService from "../services/authService";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      login: async (username, password) => {
        try {
          const response = await authService.loginUser(username, password);
          const decodedToken = jwtDecode(response.access_token);
          localStorage.setItem("token", response.access_token);
          set({ user: decodedToken });
        } catch (error) {
          console.error("Erro durante o login:", error);
          throw error;
        }
      },
      logout: () => {
        localStorage.removeItem("token");
        set({ user: null });
      },
      initializeUser: () => {
        const token = localStorage.getItem("token");
        if (token) {
          const decodedToken = jwtDecode(token);
          set({ user: decodedToken });
        }
      },
    }),
    {
      name: "auth-storage",
      getStorage: () => localStorage,
    }
  )
);
