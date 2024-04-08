import React, { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import LineChart from "../components/Dashboard/LineChart";
import BarChart from "../components/Dashboard/BarChart";
import TrainingContext from "../context/TrainingContext";
import ToggleChart from "../components/Dashboard/ToggleChart";
import MonthChartSelector from "../components/Dashboard/MonthChartSelector";
import TotalStudentsRegistered from "../components/Dashboard/TotalStudentsRegistered";
import TotalTrainingsCreated from "../components/Dashboard/TotalTrainingsCreated";

const Dashboard = () => {
  const currentMonth = new Date().getMonth() + 1;

  const [isBarActive, setIsBarActive] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  const { studentsCountByModality, fetchStudentsCountPerDayByModality } =
    useContext(TrainingContext);

  useEffect(() => {
    fetchStudentsCountPerDayByModality(selectedMonth);
  }, [selectedMonth]);

  return (
    <Layout>
      <div className="p-10 flex xl:flex-row flex-col xl:gap-x-10 gap-y-5">
        <div className="flex flex-col justify-center items-start w-1/2 gap-y-2">
          <div className="flex justify-center items-center w-full gap-x-2">
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
        <div className="flex gap-x-2">
          <TotalStudentsRegistered />
          <TotalTrainingsCreated />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
