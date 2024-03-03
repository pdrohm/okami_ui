import React, { useContext, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import StudentRow from "./StudentRow";

export default function StudentsTable({ students }) {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Nome</TableCell>
              <TableCell align="left">Contato</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Idade</TableCell>
              <TableCell align="left">Acoes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <StudentRow key={student.id} student={student} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
