import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ClassRow from "./ClassRow";

export default function ClassTable({ classes }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Treino</TableCell>
            <TableCell align="left">Modalidade</TableCell>
            <TableCell align="left">Horário</TableCell>
            <TableCell align="right">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {classes.map((singleClass) => (
            <ClassRow key={singleClass.id} singleClass={singleClass} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
