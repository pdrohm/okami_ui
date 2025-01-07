import React from "react";
import Layout from "../components/Layout";
import StudentForm from "../components/StudentForm/StudentForm";
import { useStudentStore } from "../store/useStudentStore";
import { useNavigate } from "react-router-dom";

const StudentRegister = () => {
  const {createStudent} = useStudentStore();
    const navigate = useNavigate();
  

  const handleSubmit = async (data) => {
    if (data.birthDate) {
      const date = new Date(data.birthDate);
      data.birthDate = date.toISOString();
    }
  
    await createStudent(data);
    navigate("/students");
  };

  return (
    <Layout>
      <div className="p-10">
        <h1 className="text-4xl mb-6">Cadastro de Aluno</h1>
        <StudentForm onSubmit={handleSubmit} />
      </div>
    </Layout>
  );
};

export default StudentRegister;