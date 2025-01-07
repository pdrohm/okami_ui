import { toast } from "react-toastify";
import axios from "axios";

const cepService = {
  fetchAddressByCep: async (cep: string) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

      if (response.data.erro) {
        throw new Error("CEP não encontrado");
      }

      toast.success("Endereço encontrado com sucesso");
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Erro ao buscar endereço");
        console.error("Erro ao buscar endereço pelo CEP:", error.response?.data || error.message);
      } else {
        toast.error("Erro desconhecido ao buscar endereço");
        console.error("Erro desconhecido ao buscar endereço:", error);
      }
      throw error;
    }
  },
};

export default cepService;