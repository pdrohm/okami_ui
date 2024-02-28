// studentService.js

import httpClient from "../utils/httpClient";

const studentService = {
  getAllStudents: async () => {
    try {
      const response = await httpClient.get("/students");
      return response.data;
    } catch (error) {
      console.error("Erro ao obter todos os estudantes:", error);
      throw error;
    }
  },

  getStudentById: async (id) => {
    try {
      const response = await httpClient.get(`/students/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao obter estudante por ID:", error);
      throw error;
    }
  },

  createStudent: async (studentData) => {
    try {
      const response = await httpClient.post("/students", studentData);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar estudante:", error);
      throw error;
    }
  },

  updateStudent: async (id, studentData) => {
    try {
      const response = await httpClient.put(`/students/${id}`, studentData);
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar estudante:", error);
      throw error;
    }
  },

  deleteStudent: async (id) => {
    try {
      const response = await httpClient.delete(`/students/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao excluir estudante:", error);
      throw error;
    }
  },
};

export default studentService;
