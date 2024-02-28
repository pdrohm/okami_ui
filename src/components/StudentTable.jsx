import React, { useContext, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function StudentsTable({ students }) {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell align="left">Contato</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Idade</TableCell>
              <TableCell align="left">Graduacao</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow
                key={student.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="student">
                  {student.name}
                </TableCell>
                <TableCell align="left">{student.calories}</TableCell>
                <TableCell align="left">{student.email}</TableCell>
                <TableCell align="left">{student.birthday}</TableCell>
                <TableCell align="left">{student.belt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
