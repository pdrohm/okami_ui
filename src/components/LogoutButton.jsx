import React from "react";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <ExitToAppIcon
      className="cursor-pointer hover:text-orange-light"
      onClick={() => handleLogout()}
    />
  );
};

export default LogoutButton;
