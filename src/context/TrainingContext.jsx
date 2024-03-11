import React, { createContext, useState, useEffect } from "react";
import trainingService from "../services/trainingService";

const TrainingContext = createContext();

export const TrainingProvider = ({ children }) => {
  const [trainings, setTrainings] = useState([]);


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
      const updatedTraining = await trainingService.updateTraining(id, trainingData);
      const updatedTrainings = trainings.map(training =>
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
      await fetchTrainings(); 
    } catch (error) {
      console.error("Erro ao marcar presença do aluno:", error);
    }
  };

  useEffect(() => {
    if (token) {
    fetchTrainings()}
  }, [token]);

  return (
    <TrainingContext.Provider value={{ trainings, fetchTrainings, editTraining, checkStudent, markAttendance }}>
      {children}
    </TrainingContext.Provider>
  );
};

export default TrainingContext;
