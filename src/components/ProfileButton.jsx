import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

const ProfileButton = () => {
  const navigate = useNavigate();

  const handleClickProfile = () => {
    navigate("/conta");
  };

  return (
    <>
      <AccountCircleIcon
        className="hover:text-orange-light cursor-pointer"
        sx={{ fontSize: 32 }}
        onClick={handleClickProfile}
      />
    </>
  );
};

export default ProfileButton;
