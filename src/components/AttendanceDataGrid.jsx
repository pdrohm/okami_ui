import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { format } from "date-fns";

const AttendanceDataGrid = ({ attendancesByTraining }) => {
  // Format checkin_time and sort the data in descending order
  const dataWithIds = React.useMemo(() => {
    return attendancesByTraining
      .map((row, index) => ({
        ...row,
        id: index + 1,
        checkin_time: format(new Date(row.checkin_time), "HH:mm dd/MM/yyyy"),
      }))
      .sort((a, b) => new Date(b.checkin_time) - new Date(a.checkin_time));
  }, [attendancesByTraining]);

  const columns = [
    { field: "student_name", headerName: "Aluno", flex: 1 },
    { field: "belt_description", headerName: "Faixa", flex: 1 },
    { field: "degree_description", headerName: "Grau", flex: 1 },
    { field: "checkin_time", headerName: "Checkin", flex: 1 },
  ];

  return (
    <div className="w-full">
      <DataGrid
        rows={dataWithIds}
        columns={columns}
        components={{ Toolbar: GridToolbar }}
      />
    </div>
  );
};

export default AttendanceDataGrid;
