import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import LineChart from "../components/Dashboard/LineChart";
import BarChart from "../components/Dashboard/BarChart";
import ToggleChart from "../components/Dashboard/ToggleChart";
import MonthChartSelector from "../components/Dashboard/MonthChartSelector";
import TotalStudentsRegistered from "../components/Dashboard/TotalStudentsRegistered";
import TopStudentsTable from "../components/Dashboard/TopStudentsTable";
import { useStudentStore } from "../store/useStudentStore";
import { useClassStore } from "../store/useClassStore";
import TotalClassesCreated from "../components/Dashboard/TotalClassesCreated";

const Dashboard = () => {
  const currentMonth = new Date().getMonth() + 1;

  const [isBarActive, setIsBarActive] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [topStudents, setTopStudents] = useState();

  const {
    studentsCountByModality,
    getStudentsCountPerDayByModality,
    getTopStudentsByClass
  } = useClassStore();

  const fetchTopStudents = async () => {
    const students = await getTopStudentsByClass();
    setTopStudents(students);
  };

  useEffect(() => {
    getStudentsCountPerDayByModality(selectedMonth);
  }, [selectedMonth]);

  useEffect(() => {
    fetchTopStudents();
  }, []);

  console.log("aaa", topStudents);

  return (
      <div className="p-10 flex xl:flex-row flex-col xl:gap-x-10 gap-y-5">
        <div className="flex flex-col justify-center items-start w-1/2 gap-y-2">
          <div className="flex justify-center items-center gap-x-2">
            <ToggleChart
              isBarActive={isBarActive}
              setIsBarActive={setIsBarActive}
            />
            <MonthChartSelector
              selectedMonth={selectedMonth}
              setSelectedMonth={setSelectedMonth}
            />
          </div>

          {isBarActive ? (
            <BarChart studentsCountByModality={studentsCountByModality} />
          ) : (
            <LineChart studentsCountByModality={studentsCountByModality} />
          )}
        </div>
        <div className="flex   flex-col ">
          <div className="flex gap-x-2">
            <TotalStudentsRegistered />
            <TotalClassesCreated />
          </div>
          <div>
            {topStudents &&
              Object.entries(topStudents).map(([modality, students]) => (
                <TopStudentsTable
                  key={modality}
                  modality={modality}
                  students={students}
                />
              ))}
          </div>
        </div>
      </div>
 
  );
};

export default Dashboard;
