import { create } from 'zustand';
import trainingService from '../services/trainingService';

export const useTrainingStore = create((set) => ({
  trainings: [],
  attendancesByTraining: [],
  studentsCountByModality: {
    muaythai: [],
    outro: [],
    jiujitsu: [],
    yoga: [],
  },

  fetchTrainings: async () => {
    try {
      const trainingsFetched = await trainingService.getAllTrainings();
      set({ trainings: trainingsFetched });
    } catch (error) {
      console.error('Erro ao buscar treinos:', error);
    }
  },

  editTraining: async (id, trainingData) => {
    try {
      const updatedTraining = await trainingService.updateTraining(id, trainingData);
      set((state) => ({
        trainings: state.trainings.map((training) =>
          training.id === id ? updatedTraining : training
        ),
      }));
    } catch (error) {
      console.error('Erro ao editar treino:', error);
    }
  },

  markAttendance: async (code, trainingId) => {
    try {
      await trainingService.markAttendance(code, trainingId);
      useTrainingStore.getState().fetchAttendancesByTraining(trainingId);
    } catch (error) {
      console.error('Erro ao marcar presença do aluno:', error);
    }
  },

  fetchAttendancesByTraining: async (trainingId, date = null) => {
    try {
      const attendances = await trainingService.getAttendancesByTraining(trainingId, date);
      set({ attendancesByTraining: attendances });
    } catch (error) {
      console.error('Erro ao buscar presenças:', error);
    }
  },

  fetchStudentsCountPerDayByModality: async (month) => {
    try {
      const studentsPerDay = await trainingService.getStudentsCountPerDayByModality(month);
      set({ studentsCountByModality: studentsPerDay });
    } catch (error) {
      console.error('Erro ao buscar dados de modalidade:', error);
    }
  },

  getTopStudentsByTraining: async () => {
    try {
      return await trainingService.getTopStudents();
    } catch (error) {
      console.error('Erro ao buscar alunos de destaque:', error);
    }
  },

  getAttendancesByStudent: async (studentId) => {
    try {
      return await trainingService.getAttendancesByStudent(studentId);
    } catch (error) {
      console.error('Erro ao buscar presenças do aluno:', error);
    }
  },
}));