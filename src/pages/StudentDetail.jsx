import React from "react";
import Layout from "../components/Layout";
import { useLocation } from "react-router-dom";

const StudentDetail = () => {
  const location = useLocation();
  const { studentData } = location.state || {};

  console.log(studentData);
  return (
    <div className="flex flex-col w-full h-full">
      <div></div>
    </div>
  );
};

export default StudentDetail;
