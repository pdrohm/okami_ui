import React, { useEffect } from "react";
import Layout from "../components/Layout";
import StudentForm from "../components/StudentForm/StudentForm";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { useLocation } from "react-router-dom";
import ClassForm from "../components/Class/ClassForm";
import GetBack from "../components/GetBack";
import { useClassStore } from "../store/useClassStore";

const CreateClass = () => {
  const location = useLocation();
  const { classData } = location.state || {};
  const { getModalities } = useClassStore();

  useEffect(() => {
    getModalities();
  }, []);

  return (
    <div className="p-10 flex flex-col gap-y-10 justify-center items-center w-screen">
      <div className="flex gap-x-2 w-full">
        <GetBack />

        <div className="flex justify-center items-end text-orange">
          <PersonAddAlt1Icon fontSize="large" />
        </div>
        <h1 className="text-4xl">Criar novo treino</h1>
      </div>
      <ClassForm classData={classData} />
    </div>
  );
};

export default CreateClass;
