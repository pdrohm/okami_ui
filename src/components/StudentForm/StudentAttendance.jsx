import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { format } from "date-fns";

const columns = [
  { field: "name", headerName: "Treino", flex: 1 },
  { field: "checkin_time", headerName: "Checkin", flex: 1 },
];

const StudentAttendance = ({ attendancesByStudent }) => {
  const rows = React.useMemo(() => {
    return attendancesByStudent
      .map((row, index) => ({
        ...row,
        id: index,
        checkin_time: format(new Date(row.checkin_time), "HH:mm dd/MM/yyyy"),
      }))
      .sort((a, b) => new Date(b.checkin_time) - new Date(a.checkin_time));
  }, [attendancesByStudent]);

  return (
    <div className="min-h-96">
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
            ...rows.initialState,
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10, 25]}
        rowsPerPageOptions={[5, 10, 15]}
      />
    </div>
  );
};

export default StudentAttendance;
