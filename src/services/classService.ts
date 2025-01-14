import { toast } from "react-toastify";
import httpClient from "../utils/httpClient";
import { Attendance, Class, TopStudent } from "../types/types";

const classService = {
  getAllClasses: async (): Promise<Class[]> => {
    try {
      const response = await httpClient.get<Class[]>("/classes");
      return response.data;
    } catch (error: any) {
      console.error("Erro ao obter todas as aulas:", error);
      throw error;
    }
  },

  getClassById: async (id: number): Promise<Class> => {
    try {
      const response = await httpClient.get<Class>(`/classes/${id}`);
      return response.data;
    } catch (error: any) {
      console.error("Erro ao obter aula por ID:", error);
      throw error;
    }
  },

  createClass: async (classData: Omit<Class, "id">): Promise<Class> => {
    try {
      const response = await httpClient.post<Class>("/classes", classData);
      toast.success("Aula cadastrada com sucesso");
      return response.data;
    } catch (error: any) {
      console.error("Erro ao criar aula:", error);
      toast.error("Erro ao cadastrar aula");
      throw error;
    }
  },

  updateClass: async (id: number, classData: Partial<Class>): Promise<Class> => {
    try {
      const response = await httpClient.put<Class>(`/classes/${id}`, classData);
      return response.data;
    } catch (error: any) {
      console.error("Erro ao atualizar aula:", error);
      throw error;
    }
  },

  deleteClass: async (id: number): Promise<void> => {
    try {
      await httpClient.delete(`/classes/${id}`);
      toast.success("Aula excluída com sucesso");
    } catch (error: any) {
      console.error("Erro ao excluir aula:", error);
      throw error;
    }
  },

  getAttendancesByClass: async (classId: number, date: string | null = null): Promise<Attendance[]> => {
    try {
      let url = `/classes/${classId}/attendances`;
      if (date) {
        url += `?date=${date}`;
      }

      const response = await httpClient.get<Attendance[]>(url);
      return response.data;
    } catch (error: any) {
      console.error("Erro ao obter presenças da aula:", error);
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

  markAttendance: async (code: string, classId: number): Promise<Attendance> => {
    console.log("service", code, classId);
    try {
      const response = await httpClient.post<Attendance>("/students/{id}/check-in", { code, class_id: classId });
      toast.success("Presença marcada com sucesso");
      return response.data;
    } catch (error: any) {
      console.error("Erro ao marcar presença do aluno:", error);
      throw error;
    }
  },

  getClassDays: async (): Promise<string[]> => {
    try {
      const response = await httpClient.get<string[]>(`/classes/classes-days`);
      return response.data;
    } catch (error: any) {
      console.error("Error fetching class dates:", error);
      throw error;
    }
  },

  getStudentsCountPerDayByModality: async (month: string): Promise<Record<string, number>> => {
    try {
      const response = await httpClient.get<Record<string, number>>(
        `/classes/students-count-modality/${month}`
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
      const response = await httpClient.get<Attendance[]>(`/classes/student-attendances/${studentId}`);
      return response.data;
    } catch (error: any) {
      console.error("Erro ao obter presenças do aluno:", error);
      throw error;
    }
  },

  getModalities: async (): Promise<string[]> => {
    try {
      const response = await httpClient.get<string[]>(`/modalities`);
      return response.data;
    } catch (error: any) {
      console.error("Error fetching modalities:", error);
      throw error;
    }
  }
};

export default classService;