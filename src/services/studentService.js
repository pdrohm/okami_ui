// studentService.js

import { toast } from "react-toastify";
import httpClient from "../utils/httpClient";

const studentService = {
  getAllStudents: async () => {
    try {
      const response = await httpClient.get("/students");
      return response.data;
    } catch (error) {
      console.error("Erro ao obter todos os alunos:", error);
      throw error;
    }
  },

  getStudentById: async (id) => {
    try {
      const response = await httpClient.get(`/students/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao obter aluno por ID:", error);
      throw error;
    }
  },

  createStudent: async (studentData) => {
    try {
      const response = await httpClient.post("/students", studentData);
      toast.success("Aluno cadastrado com sucesso");

      return response.data;
    } catch (error) {
      console.error("Erro ao criar aluno:", error);
      toast.error("Erro ao cadastrar aluno");
      throw error;
    }
  },

  updateStudent: async (id, studentData) => {
    try {
      const response = await httpClient.put(`/students/${id}`, studentData);
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar aluno:", error);
      toast.error("Erro ao editar aluno");

      throw error;
    }
  },

  deleteStudent: async (id) => {
    try {
      const response = await httpClient.delete(`/students/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao excluir aluno:", error);
      throw error;
    }
  },
};

export default studentService;
