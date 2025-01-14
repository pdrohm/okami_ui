import React, { useRef, useEffect } from "react";
import Layout from "../components/Layout";
import { useForm } from "react-hook-form";
import Select from "react-select";
import AttendancesTable from "../components/Class/AttendancesTable";
import { useClassStore } from "../store/useClassStore";
import classService from "../services/classService";
import { useStudentStore } from "../store/useStudentStore";

const Checkin = () => {
  const { watch, setValue, register, reset } = useForm({
    defaultValues: {
      modalityId: "",
      classId: "",
      checkInCode: "",
    },
  });

  const {
    classes,
    getClassesByModality,
    getAttendancesByClass,
    setAttendancesByClass,
    markAttendance,
    getModalities,
    modalities,
    getClasses,
  } = useClassStore();

  const { getStudentByPassword, student } = useStudentStore();

  const [studentInfo, setStudentInfo] = React.useState(null);
  const inputRef = useRef(null);

  const selectedModality = watch("modalityId");
  const selectedClass = watch("classId");

  const handleModalityChange = async (option) => {
    const modalityId = option?.value || "";
    setValue("modalityId", modalityId);
    setValue("classId", ""); // Reseta o campo de treino
    setAttendancesByClass(null);

    if (modalityId) {
      try {
        await getClassesByModality(modalityId);
      } catch (error) {
        console.error("Erro ao buscar classes pela modalidade:", error);
      }
    }
  };

  const handleClassChange = (option) => {
    const classId = option?.value || "";
    setValue("classId", classId);

    if (classId) {
      getAttendancesByClass(classId);
    }
  };

  const handleCheckin = async (code) => {
    if (code.length === 4) {
      try {
        setStudentInfo(null);
        const userInfo = await getStudentByPassword(code);
        setStudentInfo(userInfo);
      } catch (error) {
        console.error("Erro ao verificar a presença:", error);
      }
    }
  };

  const handleMarkAttendance = async (code) => {
    if (studentInfo && selectedClass) {
      try {
        await markAttendance(code, selectedClass);
        setStudentInfo(null);
        reset({ checkInCode: "" });
      } catch (error) {
        console.error("Erro ao marcar presença:", error);
      }
    }
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      await handleMarkAttendance(e.target.value);
    }
  };

  useEffect(() => {
    getModalities();
    getClasses();
  }, []);

  return (
    <>
      <div className="p-10">
        <form className="flex items-center justify-center gap-x-4">
          <div>
            <label htmlFor="modalityId">Modalidade:</label>
            <Select
              options={modalities.map((modality) => ({
                value: modality.id,
                label: modality.name,
              }))}
              onChange={handleModalityChange}
              className="w-full mt-1"
              placeholder="Selecione uma modalidade"
              isSearchable
            />
            <input {...register("modalityId")} type="hidden" />
          </div>

          <div>
            <label htmlFor="classes">Treino:</label>
            <Select
              options={classes.map((singleClass) => ({
                value: singleClass.id,
                label: singleClass.name,
              }))}
              onChange={handleClassChange}
              className="w-full mt-1"
              placeholder="Selecione um treino"
              isSearchable
              isDisabled={!selectedModality}
            />
            <input {...register("classId")} type="hidden" />
          </div>
        </form>
      </div>

      <div className="flex flex-col items-center justify-center gap-y-10">
        <input
          {...register("checkInCode")}
          type="text"
          ref={inputRef}
          className={`h-20 w-1/3 rounded-lg bg-${
            selectedClass ? "orange" : "orange-dark"
          } text-center text-3xl text-white`}
          maxLength={4}
          disabled={!selectedClass}
          placeholder={`${selectedClass ? "" : "SELECIONE O TREINO"}`}
          onChange={(e) => handleCheckin(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      {studentInfo && (
        <div className="my-5 flex items-center justify-center">
          <div className="flex w-1/4 flex-col items-center rounded-md bg-orange-light text-white">
            <span>{studentInfo.name}</span>
            <span>
              Faixa {studentInfo.belt_description}
              {studentInfo.degree_description} graus
            </span>
            <div className="flex mt-4 gap-x-4">
              <button
                className="px-4 py-2 bg-green-500 rounded-lg text-white"
                onClick={() => handleMarkAttendance(studentInfo.id)}
              >
                Check
              </button>
              <button
                className="px-4 py-2 bg-red-500 rounded-lg text-white"
                onClick={() => setStudentInfo(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <AttendancesTable className="teste" />
    </>
  );
};

export default Checkin;
