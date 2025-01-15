import React, { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import SportsMmaIcon from "@mui/icons-material/SportsMma";
import AttendanceDataGrid from "../components/AttendanceDataGrid";
import GetBack from "../components/GetBack";
import Calendar from "../components/Calendar";
import dayjs from "dayjs";
import { useClassStore } from "../store/useClassStore";
import { cleanLeadingZeros } from "@mui/x-date-pickers/internals/hooks/useField/useField.utils";

const ClassDetail = () => {
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD")); // Inicializado com hoje
  const location = useLocation();
  const { classData } = location.state || {};

  const { getAttendancesByClass, attendancesByClass, daysWithClasses } =
    useClassStore();

  const iconComponent = useMemo(() => {
    switch (classData?.modality) {
      case "jiujitsu":
        return <SportsKabaddiIcon fontSize="large" />;
      case "yoga":
        return <SelfImprovementIcon fontSize="large" />;
      case "muaythai":
        return <SportsMmaIcon fontSize="large" />;
      default:
        return <SportsKabaddiIcon fontSize="large" />;
    }
  }, [classData?.modality]);

  console.log('attendancesByClass', attendancesByClass);

  // Processa os dados para o DataGrid
  const dataWithIds = useMemo(() => {
    return attendancesByClass?.map((row, index) => ({
      id: index + 1,
      name: row.name,
      checkInTime: dayjs(row.checkInTime).format("HH:mm DD/MM/YYYY"),
    }));
  }, [attendancesByClass]);

  const columns = [
    { field: "name", headerName: "Aluno", flex: 1 },
    { field: "checkInTime", headerName: "Check-in", flex: 1, valueGetter: ({ value }) => dayjs(value).format("HH:mm DD/MM/YYYY") },
  ];

  useEffect(() => {
    if (classData && date) {
      getAttendancesByClass(classData.id, date);
    }
  }, [classData, date]);

  return (
    <div className="flex flex-col gap-y-10 p-10 w-screen">
      <div className="flex gap-x-3 ">
        <GetBack />
        <div className="flex items-end justify-center text-orange">
          {iconComponent}
        </div>
        <h1 className="text-4xl">{classData?.name || "Class Details"}</h1>
      </div>
      <div className="flex items-center justify-center gap-x-4">
        <div className="flex flex-1">
          <Calendar setDate={setDate} daysWithClasses={daysWithClasses} />
        </div>
        <div className="flex flex-1">
          <AttendanceDataGrid rows={dataWithIds} columns={columns} />
        </div>
      </div>
    </div>
  );
};

export default ClassDetail;
