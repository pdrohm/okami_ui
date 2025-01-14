import axios from "axios";
import StorageService from "../services/storageService";
import authService from "../services/authService";

const baseURL = import.meta.env.VITE_API_URL;

const httpClient = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Adiciona o token no cabeçalho de todas as requisições
httpClient.interceptors.request.use(
  async (config) => {
    const token = await StorageService.getItem("userToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Lida com erros de resposta
httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Verifica se a resposta foi 401 e se já não tentou atualizar o token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Marca que o retry já foi realizado

      try {
        const refreshedToken = await authService.refreshToken();

        if (refreshedToken?.access_token) {
          // Atualiza o token no StorageService
          await StorageService.setItem("userToken", refreshedToken.access_token);

          // Atualiza o cabeçalho da requisição original
          originalRequest.headers.Authorization = `Bearer ${refreshedToken.access_token}`;

          // Reexecuta a requisição original com o novo token
          return httpClient(originalRequest);
        }
      } catch (refreshError) {
        console.error("Erro ao atualizar o token:", refreshError);

        // Remove o token antigo e trata o erro
        await StorageService.deleteItem("userToken");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default httpClient;