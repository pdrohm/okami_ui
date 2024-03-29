import React, { createContext, useState, useEffect } from "react";
import trainingService from "../services/trainingService";

const TrainingContext = createContext();

export const TrainingProvider = ({ children }) => {
  const [trainings, setTrainings] = useState([]);
  const [attendancesByTraining, setAttendancesByTraining] = useState([]);

  const token = localStorage.getItem("token");

  const fetchTrainings = async () => {
    try {
      const trainingsFetched = await trainingService.getAllTrainings();
      setTrainings(trainingsFetched);
    } catch (error) {
      console.error("Erro ao buscar treinos:", error);
    }
  };

  const editTraining = async (id, trainingData) => {
    try {
      const updatedTraining = await trainingService.updateTraining(
        id,
        trainingData
      );
      const updatedTrainings = trainings.map((training) =>
        training.id === id ? updatedTraining : training
      );
      setTrainings(updatedTrainings);
    } catch (error) {
      console.error("Erro ao editar treino:", error);
    }
  };

  const checkStudent = async (code) => {
    try {
      return await trainingService.checkAttendance(code);
    } catch (error) {
      console.error("Erro ao verificar presença do aluno:", error);
    }
  };

  const markAttendance = async (code, training_id) => {
    try {
      await trainingService.markAttendance(code, training_id);
      fetchAttendancesByTraining(training_id);
    } catch (error) {
      console.error("Erro ao marcar presença do aluno:", error);
    }
  };

  const fetchAttendancesByTraining = async (training_id) => {
    try {
      const attendances = await trainingService.getAttendancesByTraining(
        training_id
      );
      setAttendancesByTraining(attendances);
    } catch (error) {
      console.error("Erro ao buscar as presenças do treino:", error);
    }
  };

  console.log("attendancesByTraining", attendancesByTraining);

  useEffect(() => {
    if (token) {
      fetchTrainings();
    }
  }, [token]);

  return (
    <TrainingContext.Provider
      value={{
        trainings,
        fetchTrainings,
        editTraining,
        checkStudent,
        markAttendance,
        attendancesByTraining,
        setAttendancesByTraining,
        fetchAttendancesByTraining,
      }}
    >
      {children}
    </TrainingContext.Provider>
  );
};

export default TrainingContext;
