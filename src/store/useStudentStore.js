import { create } from "zustand";
import studentService from "../services/studentService";

export const useStudentStore = create((set) => ({
  students: [],
  getStudents: async () => {
    try {
      const { data } = await studentService.getAllStudents();
      set({ students: data });
    } catch (error) {
      console.error("Erro ao buscar estudantes:", error);
    }
  },
  getStudentByPassword: async (password) => {
    try {
      const student = await studentService.getStudentByPassword(password);
      return student;
    } catch (error) {
      console.error("Erro ao buscar estudante por senha:", error);
    }
  },
  createStudent: async (student) => {
    try {
      const newStudent = await studentService.createStudent(student);
      set((state) => ({ students: [...state.students, newStudent] }));
    } catch (error) {
      console.error("Erro ao criar estudante:", error);
      throw error;
    }
  },
  editStudent: async (student) => {
    try {
      const editedStudent = await studentService.editStudent(student);
      set((state) => ({ students: [...state.students, editedStudent] }));
    } catch (error) {
      console.error("Erro ao editar estudante:", error);
    }
  },
}));
