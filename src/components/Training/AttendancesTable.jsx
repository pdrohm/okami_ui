import React, { useContext } from "react";
import { format } from "date-fns";
import TrainingContext from "../../context/TrainingContext";
import { isToday } from "date-fns";

const AttendancesTable = () => {
  const { attendancesByTraining } = useContext(TrainingContext);

  const todayAttendances = attendancesByTraining
    ? attendancesByTraining.filter(
        (attendance) =>
          attendance.checkin_time && isToday(new Date(attendance.checkin_time))
      )
    : [];

  return (
    todayAttendances.length > 0 && (
      <div className="flex flex-col items-center justify-center">
        <h1 className="my-5 font-semibold uppercase">
          {attendancesByTraining[0].training_name} -{" "}
          {attendancesByTraining[0].checkin_time
            ? format(
                new Date(attendancesByTraining[0].checkin_time),
                "dd/MM/yy"
              )
            : ""}
        </h1>

        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Aluno </th>
              <th className="px-4 py-2">Check-in </th>
            </tr>
          </thead>
          <tbody>
            {todayAttendances.map((attendance) => (
              <tr key={attendance.attendance_id}>
                <td className="border px-4 py-2 text-center">
                  {attendance.student_name}
                </td>
                <td className="border px-4 py-2 text-center">
                  {format(new Date(attendance.checkin_time), "HH:mm")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  );
};

export default AttendancesTable;
