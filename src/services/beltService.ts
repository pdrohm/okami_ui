import { toast } from "react-toastify";
import httpClient from "../utils/httpClient";
import { Belt } from "../types/types";

const beltService = {
    getBelts: async (): Promise<Belt[]> => {
        try {
          const response = await httpClient.get<Belt[]>("/belts");
          return response.data;
        } catch (error: any) {
          console.error("Erro ao obter todos as faixas:", error);
          throw error;
        }
      },
      getDegrees: async (beltId: number): Promise<Belt[]> => {
        try {
          const response = await httpClient.get<Belt[]>(`/degrees`);
          return response.data;
        } catch (error: any) {
          console.error("Erro ao obter todos os graus da faixa:", error);
          throw error;
        }
      }
}

export default beltService;