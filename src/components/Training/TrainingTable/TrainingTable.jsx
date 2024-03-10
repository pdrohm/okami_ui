import React, { useContext, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TrainingRow from "./TrainingRow";

export default function TrainingTable({ trainings }) {

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Treino</TableCell>
              <TableCell align="left">Modalidade</TableCell>
              <TableCell align="left">Acoes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trainings.map((training) => (
              <TrainingRow key={training.id} training={training} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
