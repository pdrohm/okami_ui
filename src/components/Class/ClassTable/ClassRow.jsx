import React, { useState } from "react";
import TableCell from "@mui/material/TableCell";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import VisibilityIcon from "@mui/icons-material/Visibility";

import TableRow from "@mui/material/TableRow";

import { useNavigate } from "react-router-dom";
import ModalDelete from "../../ModalDelete";
import { differenceInYears } from "date-fns";
import classService from "../../../services/classService";
import { useClassStore } from "../../../store/useClassStore";

const ClassRow = ({ singleClass }) => {
  console.log("singleClass", singleClass);
  const [isModalOpen, setModalOpen] = useState(false);

  const { getClasses } = useClassStore();

  const navigate = useNavigate();

  const handleDeleteClick = async (id) => {
    await classService.deleteClass(id);
    getClasses();
  };

  const handleEditClass = (classe) => {
    navigate("/treino/registro", { state: { classData: classe } });
  };

  const handleSelectClass = (classe) => {
    navigate(`/treino/${classe.id}`, { state: { classData: classe } });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      <TableRow
        key={singleClass.name}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="Class" align="center">
          {singleClass.name}
        </TableCell>
        <TableCell align="left">{singleClass.modality.name}</TableCell>
        <TableCell align="left">
          {`${formatTime(singleClass.startHour)} - ${formatTime(singleClass.endHour)}`}
        </TableCell>
        <TableCell sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <EditIcon
            className="cursor-pointer hover:text-orange"
            onClick={() => handleEditClass(singleClass)}
          />
          <DeleteForeverIcon
            className="cursor-pointer hover:text-orange"
            onClick={() => setModalOpen(true)}
          />
          <VisibilityIcon
            className="cursor-pointer hover:text-orange"
            onClick={() => handleSelectClass(singleClass)}
          />
        </TableCell>
      </TableRow>

      <ModalDelete
        data={singleClass}
        modalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        fetch={getClasses}
        handleDelete={handleDeleteClick}
        question={`Deseja excluir o treino ${singleClass.name}?`}
      />
    </>
  );
};

export default ClassRow;
