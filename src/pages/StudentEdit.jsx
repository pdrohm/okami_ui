import React from "react";
import Layout from "../components/Layout";
import StudentForm from "../components/StudentForm/StudentForm";
import { useNavigate } from 'react-router-dom';
import { useStudentStore } from "../store/useStudentStore";

const EditStudent = ({ studentData }) => {
  const {editStudent} = useStudentStore();

  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    if (data.document) {
      data.document = data.document.replace(/\D/g, "");
    }
    if (data.birthDate) {
      const date = new Date(data.birthDate);
      data.birthDate = date.toISOString();
    }
    
    console.log("data", data);
    await editStudent(data);
    navigate("/alunos");
  };

  return (
    <Layout>
      <div className="p-10">
        <h1 className="text-4xl mb-6">Editar Aluno</h1>
        <StudentForm initialValues={studentData} onSubmit={handleSubmit} />
      </div>
    </Layout>
  );
};

export default EditStudent;