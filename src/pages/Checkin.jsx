import React, { useRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import LockIcon from "@mui/icons-material/Lock";
import UnlockIcon from "@mui/icons-material/LockOpen";
import AttendancesTable from "../components/Class/AttendancesTable";
import { useClassStore } from "../store/useClassStore";
import { useStudentStore } from "../store/useStudentStore";
import StudentInfoCard from "../components/Class/StudentInfoCard";

const Checkin = () => {
  const { watch, setValue, register, reset, getValues } = useForm({
    defaultValues: {
      modalityId: localStorage.getItem("selectedModality") || "",
      classId: localStorage.getItem("selectedClass") || "",
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

  const { getStudentByPassword } = useStudentStore();

  const [studentInfo, setStudentInfo] = useState(null);
  const [modalityLocked, setModalityLocked] = useState(
    !!localStorage.getItem("selectedModality")
  );
  const [classLocked, setClassLocked] = useState(
    !!localStorage.getItem("selectedClass")
  );

  const selectedModality = watch("modalityId");
  const selectedClass = watch("classId");

  // Lida com a mudança de modalidade
  const handleModalityChange = async (option) => {
    const modalityId = option?.value || "";
    setValue("modalityId", modalityId);
    setValue("classId", "");
    setAttendancesByClass(null);

    if (modalityId) {
      try {
        await getClassesByModality(modalityId);
      } catch (error) {
        console.error("Erro ao buscar classes pela modalidade:", error);
      }
    }
  };

  // Lida com a mudança de treino
  const handleClassChange = (option) => {
    const classId = option?.value || "";
    setValue("classId", classId);
    setAttendancesByClass(null);

    if (classId) {
      getAttendancesByClass(classId);
    }
  };

  // Salva modalidade no localStorage
  const lockModality = () => {
    if (modalityLocked) {
      localStorage.removeItem("selectedModality");
      setModalityLocked(false);
    } else {
      localStorage.setItem("selectedModality", selectedModality);
      setModalityLocked(true);
    }
  };

  // Salva treino no localStorage
  const lockClass = () => {
    if (classLocked) {
      localStorage.removeItem("selectedClass");
      setClassLocked(false);
    } else {
      localStorage.setItem("selectedClass", selectedClass);
      setClassLocked(true);
    }
  };

  // Lida com o check-in do código
  const handleCheckin = async (code) => {
    if (code.length === 4) {
      try {
        setStudentInfo(null); // Limpa estado anterior
        const userInfo = await getStudentByPassword(code);

        if (!userInfo) {
          throw new Error("Estudante não encontrado");
        }

        setStudentInfo(userInfo);
      } catch (error) {
        console.error("Erro ao verificar a presença:", error.message || error);
        setValue("checkInCode", ""); // Limpa o campo de input
      }
    }
  };

  // Marca a presença ao pressionar Enter
  const handleMarkAttendance = async () => {
    if (studentInfo && selectedClass) {
      try {
        await markAttendance(studentInfo.id, selectedClass);
        setStudentInfo(null);
        reset({ checkInCode: "" });
      } catch (error) {
        console.error("Erro ao marcar presença:", error);
      }
    }
  };

  // Evento global para capturar números e Enter
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      const isNumber = /^[0-9]$/.test(e.key);

      if (isNumber) {
        const currentCode = getValues("checkInCode");
        const newCode = (currentCode + e.key).slice(0, 4); // Limita a 4 caracteres
        setValue("checkInCode", newCode);
        handleCheckin(newCode);
      }

      if (e.key === "Enter" && studentInfo) {
        handleMarkAttendance();
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => {
      window.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, [studentInfo, selectedClass]);

  useEffect(() => {
    getModalities();
    getClasses();
    setAttendancesByClass(null);
  }, []);

  return (
    <>
      <div className="p-10">
        <form className="flex items-center justify-center gap-x-4">
          <div className="flex items-center gap-x-2">
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
              isDisabled={modalityLocked}
            />
            <button
              type="button"
              onClick={lockModality}
              className="text-gray-500 hover:text-gray-700"
            >
              {modalityLocked ? <LockIcon /> : <UnlockIcon />}
            </button>
            <input {...register("modalityId")} type="hidden" />
          </div>

          <div className="flex items-center gap-x-2">
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
              isDisabled={!selectedModality || classLocked}
            />
            <button
              type="button"
              onClick={lockClass}
              className="text-gray-500 hover:text-gray-700"
            >
              {classLocked ? <LockIcon /> : <UnlockIcon />}
            </button>
            <input {...register("classId")} type="hidden" />
          </div>
        </form>
      </div>

      <div className="flex flex-col items-center justify-center gap-y-10">
        <input
          {...register("checkInCode")}
          type="text"
          className="h-20 w-1/3 rounded-lg bg-orange text-center text-3xl text-white"
          maxLength={4}
          readOnly
        />
      </div>

      {studentInfo && (
        <StudentInfoCard
          handleMarkAttendance={handleMarkAttendance}
          studentInfo={studentInfo}
          setStudentInfo={setStudentInfo}
        />
      )}

      <AttendancesTable />
    </>
  );
};

export default Checkin;