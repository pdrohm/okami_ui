import { toast } from "react-toastify";
import httpClient from "../utils/httpClient";
import { Attendance, Training, TopStudent } from "../types/types";

const trainingService = {
  getAllTrainings: async (): Promise<Training[]> => {
    try {
      const response = await httpClient.get<Training[]>("/training");
      return response.data;
    } catch (error: any) {
      console.error("Erro ao obter todos os treinos:", error);
      throw error;
    }
  },

  getTrainingById: async (id: number): Promise<Training> => {
    try {
      const response = await httpClient.get<Training>(`/training/${id}`);
      return response.data;
    } catch (error: any) {
      console.error("Erro ao obter treino por ID:", error);
      throw error;
    }
  },

  createTraining: async (trainingData: Omit<Training, "id">): Promise<Training> => {
    try {
      const response = await httpClient.post<Training>("/training", trainingData);
      toast.success("Treino cadastrado com sucesso");
      return response.data;
    } catch (error: any) {
      console.error("Erro ao criar treino:", error);
      toast.error("Erro ao cadastrar treino");
      throw error;
    }
  },

  updateTraining: async (id: number, trainingData: Partial<Training>): Promise<Training> => {
    try {
      const response = await httpClient.put<Training>(`/training/${id}`, trainingData);
      return response.data;
    } catch (error: any) {
      console.error("Erro ao atualizar treino:", error);
      throw error;
    }
  },

  deleteTraining: async (id: number): Promise<void> => {
    try {
      await httpClient.delete(`/training/${id}`);
      toast.success("Treino excluído com sucesso");
    } catch (error: any) {
      console.error("Erro ao excluir treino:", error);
      throw error;
    }
  },

  getAttendancesByTraining: async (trainingId: number, date: string | null = null): Promise<Attendance[]> => {
    try {
      let url = `/training/${trainingId}/attendances`;
      if (date) {
        url += `?date=${date}`;
      }

      const response = await httpClient.get<Attendance[]>(url);
      return response.data;
    } catch (error: any) {
      console.error("Erro ao obter presenças do treino:", error);
      throw error;
    }
  },

  checkAttendance: async (code: string): Promise<Attendance> => {
    try {
      const response = await httpClient.post<Attendance>("/attendance/check", { code });
      return response.data;
    } catch (error: any) {
      console.error("Erro ao verificar presença do aluno:", error);
      throw error;
    }
  },

  markAttendance: async (code: string, trainingId: number): Promise<Attendance> => {
    console.log("service", code, trainingId);
    try {
      const response = await httpClient.post<Attendance>("/attendance", { code, training_id: trainingId });
      toast.success("Presença marcada com sucesso");
      return response.data;
    } catch (error: any) {
      console.error("Erro ao marcar presença do aluno:", error);
      throw error;
    }
  },

  getTrainingDays: async (): Promise<string[]> => {
    try {
      const response = await httpClient.get<string[]>(`/training/training-days`);
      return response.data;
    } catch (error: any) {
      console.error("Error fetching training dates:", error);
      throw error;
    }
  },

  getStudentsCountPerDayByModality: async (month: string): Promise<Record<string, number>> => {
    try {
      const response = await httpClient.get<Record<string, number>>(
        `/training/students-count-modality/${month}`
      );
      return response.data;
    } catch (error: any) {
      console.error("Error fetching student counts by modality:", error);
      throw error;
    }
  },

  getTopStudents: async (): Promise<TopStudent[]> => {
    try {
      const response = await httpClient.get<TopStudent[]>(`/attendance/top-students`);
      return response.data;
    } catch (error: any) {
      console.error("Error fetching top students:", error);
      throw error;
    }
  },

  getAttendancesByStudent: async (studentId: number): Promise<Attendance[]> => {
    try {
      const response = await httpClient.get<Attendance[]>(`/training/student-attendances/${studentId}`);
      console.log("AQUI", response.data);
      return response.data;
    } catch (error: any) {
      console.error("Erro ao obter presenças do aluno:", error);
      throw error;
    }
  },
};

export default trainingService;