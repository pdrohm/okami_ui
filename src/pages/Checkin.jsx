import React, { useState, useContext, useRef } from "react";
import Layout from "../components/Layout";
import TrainingContext from "../context/TrainingContext";
import StudentContext from "../context/StudentContext";
import trainingService from "../services/trainingService";

const Checkin = () => {
  const [modality, setModality] = useState("jiujitsu");
  const [training, setTraining] = useState("");
  const [studentInfo, setStudentInfo] = useState(null);


  const { trainings } = useContext(TrainingContext);
  const { students } = useContext(StudentContext);
  const [participantes, setParticipantes] = useState([]);
  const inputRef = useRef(null);



  const handleModalityChange = (e) => {
    setModality(e.target.value);
  };

  const handleTrainingChange = (e) => {
    setTraining(e.target.value);
  };

  const handleCheckin = async (code, training_id) => {
    if (code.length === 4) {
      try {
        const userInfo = await trainingService.checkAttendance(code);
        setStudentInfo(userInfo);
      } catch (error) {
        console.error("Erro ao verificar a presença:", error);
      }
    }
  };

  const handleSelectFocus = () => {
    inputRef.current.focus();
  };

  const handleMarkAttendance = () => {
    if (studentInfo) {
      console.log("Presença marcada!");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleMarkAttendance();
    }
  };

  

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
              onClick={handleSelectFocus}
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
              onClick={handleSelectFocus}
            >
              <option value="">Selecione um treino</option>
              {trainings
                .filter((training) => training.modality === modality)
                .map((training) => (
                  <option key={training.id} value={training.id}>
                    {training.training_name}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center flex-col gap-y-10">
        <input
          type="text"
          ref={inputRef}
          className={`w-1/3 h-20 rounded-lg bg-${training ? 'orange' : 'orange-dark'} text-white text-6xl text-center`}
          maxLength={4}
          disabled={!training}
          placeholder={`${training ? '' : 'SELECIONE O TREINO'}`}
          onChange={(e) => handleCheckin(e.target.value)}
          onKeyDown={handleKeyDown}

        />
         <div className={`w-1/3 h-20 rounded-lg bg-${training ? 'green' : 'orange-dark'} text-white text-6xl text-center`}>

</div>
      </div>
     
    </Layout>
  );
};

export default Checkin;
