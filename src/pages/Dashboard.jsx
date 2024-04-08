import React, { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import LineChart from "../components/Dashboard/LineChart";
import BarChart from "../components/Dashboard/BarChart";
import TrainingContext from "../context/TrainingContext";
import ToggleChart from "../components/Dashboard/ToggleChart";
import MonthChartSelector from "../components/Dashboard/MonthChartSelector";

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
      <div className="p-10">
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
      </div>
    </Layout>
  );
};

export default Dashboard;
