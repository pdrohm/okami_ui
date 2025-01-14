import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";

import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";
import ClassTable from "../components/Class/ClassTable/ClassTable";
import AddMemberButton from "../components/AddMemberButton";
import { useClassStore } from "../store/useClassStore";

const Classes = () => {
  const { classes, getClasses } = useClassStore();

  useEffect(() => {
    getClasses();
  }, []);

  return (
    <div className="p-10 flex flex-col gap-y-10 w-screen h-screen">
      <div className="flex gap-x-3 ">
        <div className="flex justify-center items-end text-orange">
          <SportsKabaddiIcon fontSize="large" />
        </div>
        <h1 className="text-4xl">Treinos</h1>
        <AddMemberButton title="Criar treino" urlNavigate="/treino/registro" />
      </div>

      <ClassTable classes={classes} />
    </div>
  );
};

export default Classes;
