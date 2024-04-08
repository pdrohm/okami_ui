import React, { useContext } from "react";
import StudentContext from "../../context/StudentContext";
import { useNavigate } from "react-router-dom";

const TotalStudentsRegistered = () => {
  const { students } = useContext(StudentContext);
  const navigate = useNavigate();

  return (
    <div
      className="bg-whiter rounded-md border w-48 h-24 p-4 flex flex-col justify-center items-center cursor-pointer"
      onClick={() => navigate("/alunos")}
    >
      <span className="text-4xl text-orange">{students.length ?? 0}</span>
      <span className="text-sm text-gray-400 text-center">
        Alunos cadastrados
      </span>
    </div>
  );
};

export default TotalStudentsRegistered;
