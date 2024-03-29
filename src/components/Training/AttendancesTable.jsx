import React, { useContext } from "react";
import { format } from "date-fns";
import TrainingContext from "../../context/TrainingContext";

const AttendancesTable = () => {
  const { attendancesByTraining } = useContext(TrainingContext);
  console.log(attendancesByTraining);

  return (
    attendancesByTraining &&
    attendancesByTraining.length > 0 && (
      <div className="flex justify-center items-center flex-col">
        <h1 className="font-semibold uppercase my-5">
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
            {attendancesByTraining.map((attendance) => (
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
