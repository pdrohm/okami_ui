import React, { useContext } from "react";
import Layout from "../components/Layout";
import StudentContext from "../context/StudentContext";
import StudentTable from "../components/StudentTable";

const Students = () => {
  return (
    <Layout>
      <h1>Alunos</h1>
      <div>
        <StudentTable />
      </div>
    </Layout>
  );
};

export default Students;
