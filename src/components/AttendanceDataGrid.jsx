import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { format } from "date-fns";

const AttendanceDataGrid = ({ attendancesByClass }) => {
  const dataWithIds = React.useMemo(() => {
    return attendancesByClass
      .map((row, index) => ({
        ...row,
        id: index + 1,
        checkin_time: format(new Date(row.checkin_time), "HH:mm dd/MM/yyyy"),
      }))
      .sort((a, b) => new Date(b.checkin_time) - new Date(a.checkin_time));
  }, [attendancesByClass]);

  const columns = [
    { field: "student_name", headerName: "Aluno", flex: 1 },
    { field: "belt_description", headerName: "Faixa", flex: 1 },
    { field: "checkin_time", headerName: "Checkin", flex: 1 },
  ];

  return (
    <div className="h-96 w-1/2">
      <DataGrid
        rows={dataWithIds}
        columns={columns}
        components={{ Toolbar: GridToolbar }}
        pageSizeOptions={[10, 25, 50]}
      />
    </div>
  );
};

export default AttendanceDataGrid;
