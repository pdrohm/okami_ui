import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const AttendanceDataGrid = ({ rows, columns }) => {
  // Processa os dados dinamicamente se necessário (ex.: adiciona IDs, formatações)
  const processedRows = React.useMemo(() => {
    return rows.map((row, index) => ({
      ...row,
      id: row.id || index + 1, // Adiciona um ID se não existir
    }));
  }, [rows]);

  return (
    <div className="h-96 w-full">
      <DataGrid
        rows={processedRows}
        columns={columns}
        components={{ Toolbar: GridToolbar }}
        pageSizeOptions={[10, 25, 50]}
      />
    </div>
  );
};

export default AttendanceDataGrid;