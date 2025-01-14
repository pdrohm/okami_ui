import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import LockIcon from "@mui/icons-material/Lock";
import UnlockIcon from "@mui/icons-material/LockOpen";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AttendancesTable from "../components/Class/AttendancesTable";
import { useClassStore } from "../store/useClassStore";
import { useCheckinStore } from "../store/useCheckinStore";
import { useGlobalSettings } from "../store/useGlobalSettings";
import StudentInfoCard from "../components/Class/StudentInfoCard";
import { useStudentStore } from "../store/useStudentStore";

const Checkin = () => {
  const { watch, setValue, register, reset, getValues } = useForm({
    defaultValues: {
      checkInCode: "",
    },
  });

  const { getStudentByPassword } = useStudentStore();

  const {
    classes,
    getClassesByModality,
    getAttendancesByClass,
    getModalities,
    modalities,
    getClasses,
    markAttendance,
  } = useClassStore();

  const {
    selectedModality,
    selectedClass,
    setSelectedModality,
    setSelectedClass,
  } = useCheckinStore();

  const { showLeftPanel, toggleLeftPanel, setShowLeftPanel } =
    useGlobalSettings();

  const [studentInfo, setStudentInfo] = useState(null);
  const [locked, setLocked] = useState(!!selectedModality && !!selectedClass);

  const handleModalityChange = async (option) => {
    setSelectedModality(option);
    setSelectedClass(null);
    if (option) {
      await getClassesByModality(option.value);
    }
  };

  const handleClassChange = (option) => {
    setSelectedClass(option);
    if (option) {
      getAttendancesByClass(option.value);
    }
  };

  const handleLock = () => {
    if (locked) {
      setSelectedModality(null);
      setSelectedClass(null);
      setShowLeftPanel(true);
      setLocked(false);
    } else {
      setLocked(true);
      setShowLeftPanel(false);
    }
  };

  const handleCheckin = async (code) => {
    if (code.length === 4) {
      try {
        setStudentInfo(null);
        const userInfo = await getStudentByPassword(code);

        if (!userInfo) {
          throw new Error("Estudante não encontrado");
        }

        setStudentInfo(userInfo);
      } catch (error) {
        console.error("Erro ao verificar a presença:", error.message || error);
        setValue("checkInCode", "");
      }
    }
  };

  const handleMarkAttendance = async () => {
    if (studentInfo && selectedClass) {
      try {
        await markAttendance(studentInfo.id, selectedClass.value);
        setStudentInfo(null);
        reset({ checkInCode: "" });
      } catch (error) {
        console.error("Erro ao marcar presença:", error);
      }
    }
  };

  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if (!selectedModality || !selectedClass) return;

      const isNumber = /^[0-9]$/.test(e.key);
      if (isNumber) {
        const currentCode = getValues("checkInCode");
        const newCode = (currentCode + e.key).slice(0, 4);
        setValue("checkInCode", newCode);
        handleCheckin(newCode);
      }

      if (e.key === "Backspace") {
        setValue("checkInCode", "");
        setStudentInfo(null);
      }

      if (e.key === "Enter" && studentInfo) {
        handleMarkAttendance();
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => {
      window.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, [studentInfo, selectedClass, selectedModality]);

  useEffect(() => {
    getModalities();
    getClasses();
    getAttendancesByClass(selectedClass?.value);
  }, []);

  return (
    <div
      className={`flex justify-center ${
        showLeftPanel ? "bg-white" : "bg-green items-center"
      } h-screen w-screen`}
    >
      <div
        className={`${
          showLeftPanel
            ? "bg-white w-full rounded-md"
            : "bg-white p-5 rounded-md w-2/3"
        }`}
      >
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
                value={selectedModality}
                className="w-full mt-1"
                placeholder="Selecione uma modalidade"
                isSearchable
                isDisabled={locked}
              />
            </div>

            <div className="flex items-center gap-x-2">
              <label htmlFor="classes">Treino:</label>
              <Select
                options={classes.map((singleClass) => ({
                  value: singleClass.id,
                  label: singleClass.name,
                }))}
                onChange={handleClassChange}
                value={selectedClass}
                className="w-full mt-1"
                placeholder="Selecione um treino"
                isSearchable
                isDisabled={!selectedModality || locked}
              />
            </div>

            <button
              type="button"
              onClick={handleLock}
              className="text-gray-500 hover:text-gray-700"
            >
              {locked ? <LockIcon /> : <UnlockIcon />}
            </button>

            <button
              type="button"
              onClick={toggleLeftPanel}
              className="text-gray-500 hover:text-gray-700"
            >
              {showLeftPanel ? <MenuIcon /> : <CloseIcon />}
            </button>
          </form>
        </div>

        <div className="flex flex-col items-center justify-center gap-y-10">
          {selectedModality && selectedClass && (
            <input
              {...register("checkInCode")}
              type="text"
              className="h-20 w-1/3 rounded-lg bg-orange text-center text-3xl text-white"
              maxLength={4}
              readOnly
            />
          )}
        </div>

        {studentInfo && (
          <StudentInfoCard
            handleMarkAttendance={handleMarkAttendance}
            studentInfo={studentInfo}
            setStudentInfo={setStudentInfo}
          />
        )}

        <AttendancesTable />
      </div>
    </div>
  );
};

export default Checkin;
