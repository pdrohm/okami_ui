import React, { createContext, useState, useEffect } from "react";
import studentService from "../services/studentService";

const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    const studentsFetched = await studentService.getAllStudents();
    setStudents(studentsFetched);
  };

  useEffect(() => {
    fetchStudents();
  }, []);
  return (
    <StudentContext.Provider value={{ students, fetchStudents }}>
      {children}
    </StudentContext.Provider>
  );
};

export default StudentContext;
