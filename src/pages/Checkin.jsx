import React, { useState, useRef, useEffect } from "react";
import Layout from "../components/Layout";

import classService from "../services/classService";
import AttendancesTable from "../components/Class/AttendancesTable";
import { useClassStore } from "../store/useClassStore";

const Checkin = () => {
  const [modality, setModality] = useState("jiujitsu");
  const [classe, setClass] = useState("");
  const [studentInfo, setStudentInfo] = useState(null);

  const {
    classes,
    getAttendancesByClass,
    setAttendancesByClass,
    markAttendance,
  } = useClassStore();
  const inputRef = useRef(null);

  const { name, email, belt_description, degree_description, birthDate } =
    studentInfo || {};

  const handleModalityChange = (e) => {
    setModality(e.target.value);
    setAttendancesByClass(null);
  };

  const handleClassChange = (e) => {
    const classId = e.target.value;
    setClass(classId);
    getAttendancesByClass(classId);
  };

  const handleCheckin = async (code) => {
    if (code.length === 4) {
      try {
        setStudentInfo(null);
        const userInfo = await classService.checkAttendance(code);
        setStudentInfo(userInfo);
      } catch (error) {
        console.error("Erro ao verificar a presença:", error);
      }
    }
  };

  const handleMarkAttendance = async (code) => {
    if (studentInfo) {
      try {
        await markAttendance(code, classe);

        setStudentInfo(null);
      } catch (error){
        console.log(error)
      }
    }
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      await handleMarkAttendance(e.target.value);
      setStudentInfo(null);
    }
  };

  console.log(`classes`, classes);
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
            <label htmlFor="classes">Treino:</label>
            <select
              id="classes"
              value={classe}
              onChange={handleClassChange}
              className="student-form-input"
            >
              <option value="">Selecione um treino</option>
              {classes
                .filter((singleClass) => singleClass.modality == modality)
                .map((singleClass) => (
                  <option key={singleClass.id} value={singleClass.id}>
                    {singleClass.name}
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
            classes ? "orange" : "orange-dark"
          } text-center text-3xl text-white`}
          maxLength={4}
          disabled={!classes}
          placeholder={`${classes ? "" : "SELECIONE O TREINO"}`}
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
      <AttendancesTable className={"teste"} />
    </Layout>
  );
};

export default Checkin;
