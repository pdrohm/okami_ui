import React from "react";
import Layout from "../components/Layout";
import StudentForm from "../components/StudentForm/StudentForm";

const EditStudent = ({ studentData }) => {
  const handleSubmit = (data) => {
    console.log("Dados Atualizados:", data);
    // Lógica para salvar os dados editados
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