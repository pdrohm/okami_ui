import { toast } from "react-toastify";
import httpClient from "../utils/httpClient";
import StorageService from "./storageService";

const authService = {
  loginUser: async (userData: any) => {
    try {
      const response = await httpClient.post("/auth/login", userData);
      return response.data;
    } catch (error: any) {
      toast.error("Erro ao realizar login");
      console.error("Erro ao realizar login:", error?.response?.data?.message || "Erro desconhecido");
      throw error;
    }
  },

  createUser: async (userData: any) => {
    try {
      const response = await httpClient.post("/auth/register", userData);

      toast.success("Usuário criado com sucesso");
      return response.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Erro ao criar usuário");
      console.error("Erro ao cadastrar usuário:", error);
      throw error;
    }
  },

  refreshToken: async () => {
    try {
      const refreshToken = await StorageService.getItem("userRefreshToken");
      const response = await httpClient.post("/auth/refresh-token", {refresh_token: refreshToken});

      await StorageService.setItem("userToken", JSON.stringify(response.data.access_token));

      return response.data;
    } catch (error: any) {
      console.error("Erro ao atualizar token:", error);
      throw error;
    }
  }
};

export default authService;