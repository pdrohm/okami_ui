import React from "react";
import Layout from "../components/Layout";
import StudentForm from "../components/StudentForm/StudentForm";
import { useStudentStore } from "../store/useStudentStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const StudentRegister = () => {
  const { createStudent } = useStudentStore();
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    if (data.document) {
      data.document = data.document.replace(/\D/g, "");
    }
    if (data.birthDate) {
      const date = new Date(data.birthDate);
      data.birthDate = date.toISOString();
    }

    try {
      await createStudent(data);
      navigate("/alunos");
    } catch (error) {
      console.error("Erro ao criar aluno:", error);
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-4xl mb-6">Cadastro de Aluno</h1>
      <StudentForm onSubmit={handleSubmit} />
    </div>
  );
};

export default StudentRegister;
