import { toast } from "react-toastify";
import httpClient from "../utils/httpClient";

const authService = {
  loginUser: async (userData) => {
    try {
      const response = await httpClient.post("/auth/login", userData);
      toast.success("Login realizado com sucesso");

      return response.data;
    } catch (error) {
      toast.error("Erro ao realizar login");

      console.error("Erro ao realizar login:", error);
      throw error;
    }
  },
};

export default authService;
