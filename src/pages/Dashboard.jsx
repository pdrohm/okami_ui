import React, { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import LineChart from "../components/Dashboard/LineChart";
import BarChart from "../components/Dashboard/BarChart";
import TrainingContext from "../context/TrainingContext";
import ToggleChart from "../components/Dashboard/ToggleChart";

const Dashboard = () => {
  const [isBarActive, setIsBarActive] = useState(true);

  const { studentsCountByModality, fetchStudentsCountPerDayByModality } =
    useContext(TrainingContext);

  useEffect(() => {
    const currentMonth = new Date().getMonth() + 1;
    fetchStudentsCountPerDayByModality(currentMonth);
  }, []);

  return (
    <Layout>
      <div className="p-10">
        <div className="flex flex-col justify-center items-start w-1/2 gap-y-2">
          <div className="flex justify-center items-center w-full">
            <ToggleChart
              isBarActive={isBarActive}
              setIsBarActive={setIsBarActive}
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
