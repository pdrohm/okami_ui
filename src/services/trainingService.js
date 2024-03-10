// trainingService.js

import { toast } from "react-toastify";
import httpClient from "../utils/httpClient";

const trainingService = {
  getAllTrainings: async () => {
    try {
      const response = await httpClient.get("/training");
      return response.data;
    } catch (error) {
      console.error("Erro ao obter todos os treinos:", error);
      throw error;
    }
  },

  getTrainingById: async (id) => {
    try {
      const response = await httpClient.get(`/training/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao obter treino por ID:", error);
      throw error;
    }
  },

  createTraining: async (trainingData) => {
    try {
      const response = await httpClient.post("/training", trainingData);
      console.log('response', response)
      toast.success("Treino cadastrado com sucesso");

      return response.data;
    } catch (error) {
      console.error("Erro ao criar treino:", error);
      toast.error("Erro ao cadastrar treino");
      throw error;
    }
  },

  updateTraining: async (id, trainingData) => {
    try {
      const response = await httpClient.put(`/training/${id}`, trainingData);
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar treino:", error);
      throw error;
    }
  },

  deleteTraining: async (id) => {
    try {
      const response = await httpClient.delete(`/training/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao excluir treino:", error);
      throw error;
    }
  },

  checkAttendance: async (code) => {
    try {
      const response = await httpClient.post("/attendance/check", { code });
      return response.data;
    } catch (error) {
      console.error("Erro ao verificar presença do aluno:", error);
      throw error;
    }
  },

  markAttendance: async (code, training_id) => {
    try {
      const response = await httpClient.post("/attendance", { code, training_id });
      toast.success("Presença marcada com sucesso");
      return response.data;
    } catch (error) {
      console.error("Erro ao marcar presença do aluno:", error);
      throw error;
    }
  },
};

export default trainingService;
