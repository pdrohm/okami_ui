import { toast } from "react-toastify";
import httpClient from "../utils/httpClient";

const authService = {
  loginUser: async (userData) => {
    try {
      const response = await httpClient.post("/auth/login", userData);

      localStorage.setItem("user", JSON.stringify(response));

      toast.success("Login realizado com sucesso");

      return response.data;
    } catch (error) {
      toast.error("Erro ao realizar login");

      console.error("Erro ao realizar login:", error.request.response.message);
      throw error;
    }
  },

  createUser: async (userData) => {
    try {
      const response = await httpClient.post("/auth/register", userData);

      toast.success("Usuario criado com sucesso");
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);

      console.error("Erro ao cadastrar usuario:", error);
      throw error;
    }
  },
};

export default authService;
