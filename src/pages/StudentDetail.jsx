import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Calendar from "../components/Calendar";
import AttendanceDataGrid from "../components/AttendanceDataGrid";
import dayjs from "dayjs";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import EditStudent from "./StudentEdit";

const StudentDetail = () => {
  const location = useLocation();
  const { studentData } = location.state || {};
  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [isEditing, setIsEditing] = useState(false);

  const filteredCheckIns = studentData?.checkIns?.filter((checkIn) => {
    const checkInDate = dayjs(checkIn.createdAt).format("YYYY-MM-DD");
    return checkInDate === selectedDate;
  }) || [];

  const columns = [
    { field: "className", headerName: "Aula", flex: 1 },
    { field: "classSchedule", headerName: "Horário da Aula", flex: 1 },
    { field: "checkInTime", headerName: "Check-In Time", flex: 1 },
  ];

  const rows = filteredCheckIns.map((checkIn, index) => ({
    id: index + 1,
    className: checkIn.class?.name || "N/A",
    classSchedule: `${dayjs(checkIn.class?.startHour).format("HH:mm")} - ${dayjs(
      checkIn.class?.endHour
    ).format("HH:mm")}`,
    checkInTime: dayjs(checkIn.createdAt).format("HH:mm:ss DD/MM/YYYY"),
  }));

  console.log('studentData', studentData);

  return (
    <div className="flex flex-col gap-y-6 p-6 w-screen">
      <h1 className="text-4xl">{studentData?.name || "Detalhes do Aluno"}</h1>
      <div className="flex items-start gap-x-4">
        <div className="flex-1">
          <Calendar
            setDate={(date) => setSelectedDate(dayjs(date).format("YYYY-MM-DD"))}
            daysWithClasses={studentData?.checkIns?.map((checkIn) =>
              dayjs(checkIn.createdAt).format("YYYY-MM-DD")
            )}
          />
        </div>
        <div className="flex-1">
          <div className="w-2/3">
          <AttendanceDataGrid rows={rows} columns={columns} />

          </div>
        </div>
      </div>
      <div className="mt-6 md:w-2/3 mx-auto">
        <div
          className="flex items-center justify-between cursor-pointer bg-gray-100 p-4 rounded-lg shadow-md"
          onClick={() => setIsEditing((prev) => !prev)}
        >
          <h2 className="text-xl font-semibold">Editar Dados</h2>
          {isEditing ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </div>
        {isEditing && (
          <div className="mt-4 bg-white p-4 rounded-lg shadow-lg">
            <EditStudent studentData={studentData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDetail;