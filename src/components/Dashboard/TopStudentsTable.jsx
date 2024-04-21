import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const TopStudentsTable = ({ modality, students }) => {
  const columns = [
    { field: "name", headerName: "Nome", width: 200 },
    { field: "attendance_count", headerName: "Presenças", width: 180 },
  ];

  const rows = students.map((student, index) => ({
    id: `${modality}-${index}`,
    modality,
    ...student,
  }));

  return (
    <div>
      <h2 className=" border-[1px] border-b-0 mt-4 uppercase flex justify-center items-center font-semibold py-4 rounded-t-md text-black bg-orange">
        {modality}
      </h2>
      <DataGrid
        className="w-full"
        rows={rows}
        columns={columns}
        pageSize={5}
        hideFooter
      />
    </div>
  );
};

export default TopStudentsTable;
