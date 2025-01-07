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
}

export default beltService;