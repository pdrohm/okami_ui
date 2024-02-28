import React from "react";
import { useNavigate } from "react-router-dom";

const AddMemberButton = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/alunos/registro");
  };

  return (
    <div
      className="flex justify-center items-center bg-orange px-5 rounded-md cursor-pointer hover:border-[1px] hover:border-black hover:text-whiter"
      onClick={handleNavigate}
    >
      Adicionar Aluno
    </div>
  );
};

export default AddMemberButton;
