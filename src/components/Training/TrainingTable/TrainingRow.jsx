import React, { useContext, useState } from "react";
import TableCell from "@mui/material/TableCell";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";


import TableRow from "@mui/material/TableRow";

import TrainingContext from "../../../context/TrainingContext";


import { useNavigate } from "react-router-dom";
import ModalDelete from "../../ModalDelete";
import { differenceInYears } from "date-fns";
import trainingService from "../../../services/trainingService";

const TrainingRow = ({ training }) => {
  const [open, setOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const { fetchTrainings } = useContext(TrainingContext);

  const navigate = useNavigate();



  const handleDeleteClick = async (id) => {
    await trainingService.deleteTraining(id);
    fetchTrainings();
  };

  const handleEditTraining = (training) => {
    navigate("/treino/registro", { state: { trainingData: training } });

  }

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
            onClick={() => handleEditTraining(training)}
          />
          <DeleteForeverIcon
            className="cursor-pointer hover:text-orange"
            onClick={() => setModalOpen(true)}
          />
        </TableCell>
      </TableRow>
     
      <ModalDelete
        data={training}
        modalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        fetch={fetchTrainings}
        handleDelete={handleDeleteClick}
        question={`Deseja excluir o treino ${training.training_name}?`}
      />

    </>
  );
};

export default TrainingRow;
