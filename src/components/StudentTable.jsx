import React, { useContext, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Box, Collapse } from "@mui/material";

const Row = ({ student }) => {
  console.log(student);
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow
        key={student.name}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="student">
          {student.name}
        </TableCell>
        <TableCell align="left">{student.address}</TableCell>
        <TableCell align="left">{student.email}</TableCell>
        <TableCell align="left">{student.birthday}</TableCell>
        <TableCell align="left">{student.belt}</TableCell>
      </TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box>{student.name}</Box>
        </Collapse>
      </TableCell>
      <TableRow></TableRow>
    </>
  );
};

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
              <TableCell align="left">Graduacao</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <Row key={student.id} student={student} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
