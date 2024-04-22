import React, { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import StudentForm from "../components/StudentForm/StudentForm";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { useLocation } from "react-router-dom";
import GetBack from "../components/GetBack";
import StudentAttendance from "../components/StudentForm/StudentAttendance";
import TrainingContext from "../context/TrainingContext";
import Calendar from "../components/Calendar";
import dayjs from "dayjs";

const RegisterStudent = () => {
  const location = useLocation();
  const { studentData, editStudent } = location.state || {};
  const { getAttendancesByStudent } = useContext(TrainingContext);

  const [attendancesByStudent, setAttendancesByStudent] = useState([]);
  const [date, setDate] = useState(dayjs(new Date().toDateString()).format("YYYY-MM-DD"));
  const [filteredCheckins, setFilteredCheckins] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 


  const title = editStudent ? studentData.name : "Cadastro de aluno";

  const fetchAttendancesByStudent = async () => {
    setIsLoading(true); 
    try {
      const response = await getAttendancesByStudent(studentData.id);
      setAttendancesByStudent(response);
    } finally {
      setIsLoading(false);  
    }
  }

  const handleChangeDate = () => {
    const filteredAttendances = attendancesByStudent.filter((checkin) => {
      const checkinDate = dayjs(
        new Date(checkin.checkin_time).toDateString()
      ).format("YYYY-MM-DD");

      return checkinDate == date;
    });
    setFilteredCheckins(filteredAttendances);

  }

  useEffect(() => {
    if (studentData && studentData.id) {
      fetchAttendancesByStudent();
    }
  }, [studentData]);
  
  useEffect(() => {
    if (!isLoading) {
      handleChangeDate();  
    }
  }, [date, isLoading]);  


  return (
    <Layout>
      <div className="p-10 flex flex-col gap-y-10 justify-center items-center">
        <div className="flex gap-x-2 w-full">
          <GetBack />
          <div className="flex justify-center items-end text-orange">
            <PersonAddAlt1Icon fontSize="large" />
          </div>
          <h1 className="text-4xl">{title}</h1>
        </div>
        <StudentForm studentData={studentData} />

        {editStudent && attendancesByStudent && (
          <div className="flex gap-x-3 mt-10 justify-center items-start flex-col lg:flex-row">
            <Calendar setDate={setDate} />
            <div className="flex flex-col items-center">
              <h1 className="text-xl text-orange font-bold">
                CHECKINS PELA DATA
              </h1>

              <StudentAttendance attendancesByStudent={filteredCheckins} />
            </div>
            <div className="flex flex-col items-center">
              <h1 className="text-xl text-orange font-bold">
                ÚLTIMOS CHECKINS
              </h1>

              <StudentAttendance attendancesByStudent={attendancesByStudent} />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default RegisterStudent;
