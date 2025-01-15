import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Box, Collapse } from "@mui/material";
import defaultAvatar from "../../assets/default_avatar.jpg";

import TableRow from "@mui/material/TableRow";
import React, { useState } from "react";
import { relationshipEmergencyContact } from "../../utils/relationshipEmergencyContact";

import { useNavigate } from "react-router-dom";
import ModalDelete from "../ModalDelete";
import { differenceInYears } from "date-fns";
import studentService from "../../services/studentService";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useStudentStore } from "../../store/useStudentStore";

const StudentRow = ({ student }) => {
  const [open, setOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();
  const { getStudents } = useStudentStore();

  const handleDeleteClick = async (id) => {
    await studentService.deleteStudent(id);
    getStudents();
  };

  const handleSelectStudent = (student) => {
    navigate(`/alunos/${student.id}`, { state: { studentData: student } });
  };

  const handleEditStudent = (student) => {
    navigate("/alunos/registro", {
      state: { studentData: student, editStudent: true },
    });
  };

  const today = new Date();

  const age = differenceInYears(today, student.birthDate);

  console.log("student", student);

  return (
    <>
      <TableRow
        key={student.name}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        onClick={() => setOpen(!open)}
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
        <TableCell align="left">{student.phone}</TableCell>
        <TableCell align="left">{student.email}</TableCell>
        <TableCell align="left">{age}</TableCell>

        <TableCell>
          <VisibilityIcon
            className="cursor-pointer hover:text-orange"
            onClick={() => handleSelectStudent(student)}
          />
        </TableCell>
      </TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box className="h-auto flex justify-start items-center gap-x-10 p-4">
            <div className="w-16 h-16">
              <img
                src={defaultAvatar}
                alt="Preview"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="flex flex-wrap w-full gap-x-10">
              <div className="w-32">
                <h1 className="font-bold">Faixa</h1>
                <span>
                  {student.belt.description ?? "Não informada"}{" "}
                  {student.degree.description
                    ? student.degree.description + " graus"
                    : ""}
                </span>
              </div>
              
              <div className="w-32">
                <h1 className="font-bold">Peso</h1>
                <span>{student.weight ? student.weight + " kg" : "-"}</span>
              </div>
              <div className="w-32">
                <h1 className="font-bold">Gênero</h1>
                <span>{student.gender === "M" ? "Masculino" : "Feminino"}</span>
              </div>
              <div className="w-64">
                <h1 className="font-bold">Endereço</h1>
                <span>{student.address ?? "-"}</span>
              </div>
              <div className="flex flex-col w-64">
                <h1 className="font-bold">Contato de Emergência</h1>
                <div>
                  <span>
                    {student.emergencyContact ?? ""}
                    {student.relationship
                      ? ` - ${
                          relationshipEmergencyContact.find(
                            (item) => item.value === student.relationship
                          )?.description
                        }`
                      : ""}
                  </span>
                  <span>{student.emergencyPhone ?? "-"}</span>
                </div>
              </div>
            </div>
          </Box>
        </Collapse>
      </TableCell>
      <TableRow></TableRow>
      <ModalDelete
        data={student}
        modalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        fetch={getStudents}
        handleDelete={handleDeleteClick}
        question={`Deseja excluir o treino ${student.name}?`}
      />
    </>
  );
};

export default StudentRow;
