import React, { useState, useContext, useRef, useEffect } from "react";
import Layout from "../components/Layout";
import TrainingContext from "../context/TrainingContext";
import StudentContext from "../context/StudentContext";
import trainingService from "../services/trainingService";
import AttendancesTable from "../components/Training/AttendancesTable";

const Checkin = () => {
  const [modality, setModality] = useState("jiujitsu");
  const [training, setTraining] = useState("");
  const [studentInfo, setStudentInfo] = useState(null);

  const {
    trainings,
    fetchAttendancesByTraining,
    setAttendancesByTraining,
    markAttendance,
  } = useContext(TrainingContext);
  const inputRef = useRef(null);

  const { name, email, belt_description, degree_description, birthday } =
    studentInfo || {};

  const handleModalityChange = (e) => {
    setModality(e.target.value);
    setAttendancesByTraining(null);
  };

  const handleTrainingChange = (e) => {
    const trainingId = e.target.value;
    setTraining(trainingId);
    fetchAttendancesByTraining(trainingId);
  };

  const handleCheckin = async (code) => {
    if (code.length === 4) {
      try {
        setStudentInfo(null);
        const userInfo = await trainingService.checkAttendance(code);
        setStudentInfo(userInfo);
      } catch (error) {
        console.error("Erro ao verificar a presença:", error);
      }
    }
  };

  const handleMarkAttendance = async (code) => {
    if (studentInfo) {
      try {
        await markAttendance(code, training);

        setStudentInfo(null);
      } catch {}
    }
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      await handleMarkAttendance(e.target.value);
      setStudentInfo(null);
    }
  };

  console.log(`trainings`, trainings);
  console.log(`modality`, modality);

  return (
    <Layout>
      <div className="p-10">
        <div className="flex items-center justify-center gap-x-4 ">
          <div>
            <label htmlFor="modality">Modalidade:</label>
            <select
              id="modality"
              value={modality}
              onChange={handleModalityChange}
              className="student-form-input"
            >
              <option value="jiujitsu">Jiu Jitsu</option>
              <option value="yoga">Yoga</option>
              <option value="muaythai">Muay Thai</option>
            </select>
          </div>

          <div>
            <label htmlFor="training">Treino:</label>
            <select
              id="training"
              value={training}
              onChange={handleTrainingChange}
              className="student-form-input"
            >
              <option value="">Selecione um treino</option>
              {trainings
                .filter((training) => training.modality == modality)
                .map((training) => (
                  <option key={training.id} value={training.id}>
                    {training.training_name}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-y-10">
        <input
          type="text"
          ref={inputRef}
          className={`h-20 w-1/3 rounded-lg bg-${
            training ? "orange" : "orange-dark"
          } text-center text-3xl text-white`}
          maxLength={4}
          disabled={!training}
          placeholder={`${training ? "" : "SELECIONE O TREINO"}`}
          onChange={(e) => handleCheckin(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      {studentInfo && (
        <div className="my-5 flex items-center justify-center">
          <div className="flex w-1/4 flex-col items-center rounded-md bg-orange-light text-white">
            <span> {name}</span>
            <span>
              Faixa {belt_description} {degree_description} graus
            </span>
          </div>
        </div>
      )}
      <AttendancesTable trainingName={"teste"} />
    </Layout>
  );
};

export default Checkin;
