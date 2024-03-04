import React from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import UserRegisterForm from "./UserRegisterForm";

const AddUser = () => {
  return (
    <div className="flex gap-x-3 my-20 flex-col">
      <div className="flex items-end gap-x-3">
        <div className="flex text-orange ">
          <PersonAddIcon fontSize="large" />
        </div>
        <h1 className="text-4xl">Adicionar Usuario</h1>
      </div>

      <div className="flex w-full justify-center">
        <div className="bg-whiter w-1/3 ">
          <UserRegisterForm />
        </div>
      </div>
    </div>
  );
};

export default AddUser;
