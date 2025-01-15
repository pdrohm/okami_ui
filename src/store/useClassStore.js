import { create } from "zustand";
import classService from "../services/classService";
import dayjs from "dayjs";

export const useClassStore = create((set) => ({
  classes: [],
  attendancesByClass: [],
  modalities: [],
  studentsCountByModality: {
    muaythai: [],
    outro: [],
    jiujitsu: [],
    yoga: [],
  },

  getClasses: async () => {
    try {
      const { data } = await classService.getAllClasses();
      set({ classes: data });
    } catch (error) {
      console.error('Erro ao buscar aulas:', error);
      throw error;
    }
  },
  getClassesByModality: (modalityId) => {
    const allClasses = useClassStore.getState().classes;
    const filteredClasses = allClasses.filter(
      (classItem) => classItem.modality.id === modalityId
    );
    set({ classes: filteredClasses });
  },

  createClass: async (classData) => {
    const newClass = await classService.createClass(classData);
    set((state) => ({ classes: [...state.classes, newClass] }));
  },

  editClass: async (id, classData) => {
    const updatedClass = await classService.updateClass(id, classData);
    set((state) => ({
      classes: state.classes.map((classItem) =>
        classItem.id === id ? updatedClass : classItem
      ),
    }));
  },

  markAttendance: async (password, classId) => {
    await classService.markAttendance(password, classId);
    useClassStore.getState().getAttendancesByClass(classId);
  },

  getModalities: async () => {
    const { data } = await classService.getModalities();
    set({ modalities: data });
  },

  getAttendancesByClass: async (classId, date) => {
    try{
      const formattedDate = date ? dayjs(date).format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD');
      const attendances = await classService.getAttendancesByClass(classId, formattedDate);
      set({ attendancesByClass: attendances });
    } catch (error) {
      console.error('Erro ao buscar aulas:', error);
      set({ attendancesByClass: [] });
    }
  },

  setAttendancesByClass: (attendances) => {
    set({ attendancesByClass: attendances });
  },

  getStudentsCountPerDayByModality: async (month) => {
    const studentsPerDay = await classService.getStudentsCountPerDayByModality(month);
    set({ studentsCountByModality: studentsPerDay });
  },

  getTopStudentsByClass: async () => {
    return await classService.getTopStudents();
  },

  getAttendancesByStudent: async (studentId) => {
    return await classService.getAttendancesByStudent(studentId);
  },
}));
