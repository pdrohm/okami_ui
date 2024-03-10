import React from "react";
import { useNavigate } from "react-router-dom";

const AddMemberButton = ({title, urlNavigate}) => {
  const navigate = useNavigate();


  const handleNavigate = () => {
    navigate(urlNavigate);
  };

  return (
    <button
      className="flex justify-center items-center bg-orange px-5 rounded-md cursor-pointer hover:border-[1px] hover:border-black hover:text-whiter"
      onClick={handleNavigate}
    >
      {title}
    </button>
  );
};

export default AddMemberButton;
