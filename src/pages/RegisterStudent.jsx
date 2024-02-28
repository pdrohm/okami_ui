import React from "react";
import Layout from "../components/Layout";
import StudentForm from "../components/StudentForm/StudentForm";

const RegisterStudent = () => {
  return (
    <Layout>
      <div className="p-5 flex flex-col gap-y-10 justify-center items-center">
        <h1 className="text-4xl w-full">Cadastro de aluno</h1>
        <StudentForm />
      </div>
    </Layout>
  );
};

export default RegisterStudent;
