import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const GetBack = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center" >
      <ArrowBackIcon sx={{ fontSize: 32 }} className="text-green cursor-pointer" onClick={() => navigate(-1)}/>
    </div>
  );
};

export default GetBack;
