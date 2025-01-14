import { create } from "zustand";
import { persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";
import authService from "../services/authService";
import StorageService from "../services/storageService";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      login: async (username, password) => {
        try {
          const response = await authService.loginUser(username, password);
          const decodedToken = jwtDecode(response.access_token);
          await StorageService.setItem("userToken", response.access_token);
          await StorageService.setItem("userRefreshToken", response.refresh_token);

          set({ user: decodedToken });
        } catch (error) {
          console.error("Erro durante o login:", error);
          throw error;
        }
      },
      logout: () => {
       StorageService.deleteItem("userToken");
       StorageService.deleteItem("userToken");


        set({ user: null });
      },
      initializeUser: () => {
        const token = StorageService.getItem("userToken");
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
