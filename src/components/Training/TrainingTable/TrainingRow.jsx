import TableCell from "@mui/material/TableCell";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";


import TableRow from "@mui/material/TableRow";
import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import ModalDelete from "../../ModalDelete";
import { differenceInYears } from "date-fns";

const TrainingRow = ({ training }) => {
  console.log(training)
  const [open, setOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();



  const today = new Date();

  const age = differenceInYears(today, training.birthday);

  return (
    <>
      <TableRow
        key={training.name}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
       
        <TableCell component="th" scope="training" align="center">
          {training.training_name}
        </TableCell>
        <TableCell align="left">{training.modality}</TableCell>
        <TableCell align="left">
          <EditIcon
            className="cursor-pointer hover:text-orange"
            onClick={() => handleEditStudent(training)}
          />
          <DeleteForeverIcon
            className="cursor-pointer hover:text-orange"
            onClick={() => setModalOpen(true)}
          />
        </TableCell>
      </TableRow>
     
      <ModalDelete
        student={training}
        modalOpen={isModalOpen}
        setModalOpen={setModalOpen}
      />
    </>
  );
};

export default TrainingRow;
