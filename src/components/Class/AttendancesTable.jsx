import React from "react";
import { format } from "date-fns";
import { useClassStore } from "../../store/useClassStore";

const AttendancesTable = () => {
  const { attendancesByClass } = useClassStore();

  if (!attendancesByClass || attendancesByClass.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1 className="my-5 font-semibold uppercase">
          Nenhuma presença encontrada
        </h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="my-5 font-semibold uppercase">
        {attendancesByClass[0]?.className || "Aula"} -{" "}
        {attendancesByClass[0]?.checkInTime
          ? format(new Date(attendancesByClass[0].checkInTime), "dd/MM/yyyy")
          : ""}
      </h1>

      <table className="table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2 border border-gray-300">Aluno</th>
            <th className="px-4 py-2 border border-gray-300">Check-in</th>
          </tr>
        </thead>
        <tbody>
          {attendancesByClass.map((attendance) => (
            <tr key={attendance.attendanceId || attendance.id}>
              <td className="border px-4 py-2 text-center">
                {attendance.name || attendance.name}
              </td>
              <td className="border px-4 py-2 text-center">
                {attendance.checkInTime
                  ? format(new Date(attendance.checkInTime), "HH:mm")
                  : "Não registrado"}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td className="border px-4 py-2 text-center font-semibold">
              Total de Alunos
            </td>
            <td className="border px-4 py-2 text-center font-semibold">
              {attendancesByClass.length}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default AttendancesTable;
