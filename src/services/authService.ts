import { toast } from "react-toastify";
import httpClient from "../utils/httpClient";

const authService = {
  loginUser: async (userData: any) => {
    try {
      console.log('userData:', userData);
      const response = await httpClient.post("/auth/login", userData);

      console.log('response:', response);

      localStorage.setItem("user", JSON.stringify(response.data.access_token));

      toast.success("Login realizado com sucesso");

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
};

export default authService;