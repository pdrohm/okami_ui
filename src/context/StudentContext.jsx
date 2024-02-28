import React, { createContext, useState, useEffect } from "react";
import studentService from "../services/studentService";

const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState([]);

  console.log(`students`, students);

  useEffect(() => {
    console.log(`passou aqui`);
    fetchStudents()
      .then((data) => setStudents(data))
      .catch((error) => console.error("Error fetching students:", error));
  }, []);

  const fetchStudents = async () => {
    const studentsFetched = await studentService.getAllStudents();

    return studentsFetched;
  };

  return (
    <StudentContext.Provider value={{ students }}>
      {children}
    </StudentContext.Provider>
  );
};

export default StudentContext;
