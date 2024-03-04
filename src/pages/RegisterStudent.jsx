import React from "react";
import Layout from "../components/Layout";
import StudentForm from "../components/StudentForm/StudentForm";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { useLocation } from "react-router-dom";

const RegisterStudent = () => {
  const location = useLocation();
  console.log(`location`, location);
  const { studentData } = location.state;

  return (
    <Layout>
      <div className="p-10 flex flex-col gap-y-10 justify-center items-center">
        <div className="flex gap-x-2 w-full">
          <div className="flex justify-center items-end text-orange">
            <PersonAddAlt1Icon fontSize="large" />
          </div>
          <h1 className="text-4xl">Cadastro de aluno</h1>
        </div>
        <StudentForm studentData={studentData} />
      </div>
    </Layout>
  );
};

export default RegisterStudent;
