import React, { useContext } from "react";
import TrainingContext from "../../context/TrainingContext";
import { useNavigate } from "react-router-dom";

const TotalTrainingsCreated = () => {
  const { trainings } = useContext(TrainingContext);
  const navigate = useNavigate();

  return (
    <div
      className="bg-whiter rounded-md border w-48 h-24 p-4 flex flex-col justify-center items-center cursor-pointer"
      onClick={() => navigate("/treino")}
    >
      <span className="text-4xl text-orange">{trainings.length ?? 0}</span>
      <span className="text-sm text-gray-400 text-center">
        Treinos cadastrados
      </span>
    </div>
  );
};

export default TotalTrainingsCreated;
