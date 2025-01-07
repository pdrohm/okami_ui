import { toast } from "react-toastify";
import httpClient from "../utils/httpClient";
import { Student } from "../types/types";


const studentService = {
  getAllStudents: async (): Promise<Student[]> => {
    try {
      const response = await httpClient.get<Student[]>("/students");
      return response.data;
    } catch (error: any) {
      console.error("Erro ao obter todos os alunos:", error);
      throw error;
    }
  },

  getStudentById: async (id: number): Promise<Student> => {
    try {
      const response = await httpClient.get<Student>(`/students/${id}`);
      return response.data;
    } catch (error: any) {
      console.error("Erro ao obter aluno por ID:", error);
      throw error;
    }
  },

  createStudent: async (studentData: Student): Promise<Student> => {
    try {
      console.log("studentData", studentData);

      const response = await httpClient.post<Student>("/students", studentData);
      toast.success("Aluno cadastrado com sucesso");

      return response.data;
    } catch (error: any) {
      console.error("Erro ao criar aluno:", error);
      toast.error("Erro ao cadastrar aluno");
      throw error;
    }
  },

  updateStudent: async (id: number, studentData: Partial<Student>): Promise<Student> => {
    try {
      const response = await httpClient.put<Student>(`/students/${id}`, studentData);
      return response.data;
    } catch (error: any) {
      console.error("Erro ao atualizar aluno:", error);
      toast.error("Erro ao editar aluno");
      throw error;
    }
  },

  deleteStudent: async (id: number): Promise<void> => {
    try {
      await httpClient.delete(`/students/${id}`);
      toast.success("Aluno excluído com sucesso");
    } catch (error: any) {
      console.error("Erro ao excluir aluno:", error);
      throw error;
    }
  },
};

export default studentService;