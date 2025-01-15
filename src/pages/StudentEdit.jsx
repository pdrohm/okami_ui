import React from "react";
import Layout from "../components/Layout";
import StudentForm from "../components/StudentForm/StudentForm";
import { useNavigate } from "react-router-dom";
import { useStudentStore } from "../store/useStudentStore";

const EditStudent = ({ studentData }) => {
  const { editStudent } = useStudentStore();

  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    if (data.document) {
      data.document = data.document.replace(/\D/g, "");
    }
    if (data.birthDate) {
      const date = new Date(data.birthDate);
      data.birthDate = date.toISOString();
    }

    await editStudent(data);
    navigate("/alunos");
  };

  return <StudentForm initialValues={studentData} onSubmit={handleSubmit} />;
};

export default EditStudent;
