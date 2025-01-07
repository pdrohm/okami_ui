import { create } from "zustand";
import studentService from "../services/studentService";

export const useStudentStore = create((set) => ({
  students: [],
  fetchStudents: async () => {
    try {
      const { data } = await studentService.getAllStudents();
      set({ students: data });
    } catch (error) {
      console.error("Erro ao buscar estudantes:", error);
    }
  },
  createStudent: async (student) => {
    try {
      const newStudent = await studentService.createStudent(student);
      set((state) => ({ students: [...state.students, newStudent] }));
    } catch (error) {
      console.error("Erro ao criar estudante:", error);
    }
  }
}));
