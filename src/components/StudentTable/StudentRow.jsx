import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Box, Collapse } from "@mui/material";
import defaultAvatar from "../../assets/default_avatar.jpg";

import TableRow from "@mui/material/TableRow";
import React, { useContext, useState } from "react";
import { relationEmergencyContact } from "../../utils/relationEmergencyContact";

import { useNavigate } from "react-router-dom";
import ModalDelete from "../ModalDelete";
import { differenceInYears } from "date-fns";
import StudentContext from "../../context/StudentContext";
import studentService from "../../services/studentService";

const StudentRow = ({ student }) => {
  const [open, setOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const { fetchStudents } = useContext(StudentContext);

  const handleDeleteClick = async (id) => {
    await studentService.deleteStudent(id);
    fetchStudents();
  };


  const navigate = useNavigate();

  const handleEditStudent = (student) => {
    navigate("/alunos/registro", { state: { studentData: student } });
  };

  const today = new Date();

  const age = differenceInYears(today, student.birthday);

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
        <TableCell align="left">{student.number}</TableCell>
        <TableCell align="left">{student.email}</TableCell>
        <TableCell align="left">{age}</TableCell>
        <TableCell align="left">
          <EditIcon
            className="cursor-pointer hover:text-orange"
            onClick={() => handleEditStudent(student)}
          />
          <DeleteForeverIcon
            className="cursor-pointer hover:text-orange"
            onClick={() => setModalOpen(true)}
          />
        </TableCell>
      </TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box className="h-24 flex justify-start items-center  box-student">
            <div className="w-16 container-data ml-20">
              <img
                src={defaultAvatar}
                alt="Preview"
                className="w-full h-full rounded-full"
              />
            </div>
            <div className="flex px-20 justify-center items-center">
              <div className="w-32 container-data ml-10">
                <h1>Faixa</h1>
                <div className="flex gap-x-1">
                  <span>{student.belt_description ?? "Nao informada"}</span>
                  <span>
                    {student.degree_description
                      ? student.degree_description + " graus"
                      : null}
                  </span>
                </div>
              </div>
              <div className="w-20 container-data">
                <h1>Peso</h1>
                <span>{student.weight ? student.weight + " kg" : "-"}</span>
              </div>
              <div className="w-28 container-data">
                <h1>Gênero</h1>
                <span>{student.gender == "M" ? "Masculino" : "Feminino"}</span>
              </div>
              <div className="w-64">
                <h1 className="font-bold">Endereço</h1>
                <span>{student.address ?? "-"}</span>
              </div>
              <div className="flex flex-col container-data">
                <h1 className="font-bold">Contato emergência</h1>
                <div className="flex flex-col justify-start items-start">
                  <span>
                    {student.emergency_contact ?? ""}
                    {student.relation
                      ? ` - ${
                          relationEmergencyContact.find(
                            (item) => item.value === student.relation
                          )?.description
                        }`
                      : ""}
                  </span>
                  <span>{student.emergency_contact_number ?? "-"}</span>
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
        fetch={fetchStudents}
        handleDelete={handleDeleteClick}
        question={`Deseja excluir o treino ${student.name}?`}

      />
    </>
  );
};

export default StudentRow;
