import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const MyAccount = ({ user }) => {
  return (
    <>
      <div className="flex gap-x-3 ">
        <div className="flex text-orange ">
          <AccountCircleIcon fontSize="large" />
        </div>
        <h1 className="text-4xl">Minha Conta</h1>
      </div>
      <div className="flex w-full justify-center">
        <div className="bg-whiter text-black w-1/3  rounded-md flex p-5 justify-between flex-row">
          <div className="w-1/2 flex flex-col">
            <div>
              <h1 className="font-bold">Nome</h1>
              <span>{user.name}</span>
            </div>
            <div>
              <h1 className="font-bold">Usuario</h1>
              <span>{user.username}</span>
            </div>
          </div>
          <div className="w-1/2 flex flex-col">
            <div>
              <h1 className="font-bold">Email</h1>
              <span>{user.email}</span>
            </div>
            {user.profile && (
              <div>
                <h1 className="font-bold">Modalidade</h1>
                <span>{user.profile.name}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyAccount;
