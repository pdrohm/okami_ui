import React, { useContext, useEffect } from "react";
import Layout from "../components/Layout";
import { useLocation } from "react-router-dom";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";

import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import SportsMmaIcon from "@mui/icons-material/SportsMma";
import TrainingContext from "../context/TrainingContext";
import AttendanceDataGrid from "../components/AttendanceDataGrid";
import GetBack from "../components/GetBack";
import Calendar from "../components/Calendar";
import { useState } from "react";
import dayjs from "dayjs";

const TrainingDetail = () => {
  const [date, setDate] = useState(dayjs(new Date()));

  const location = useLocation();
  const { trainingData } = location.state || {};

  const { attendancesByTraining, fetchAttendancesByTraining } =
    useContext(TrainingContext);

  let iconComponent;
  switch (trainingData?.modality) {
    case "jiujitsu":
      iconComponent = <SportsKabaddiIcon fontSize="large" />;
      break;
    case "yoga":
      iconComponent = <SelfImprovementIcon fontSize="large" />;
      break;
    case "muaythai":
      iconComponent = <SportsMmaIcon fontSize="large" />;
      break;
    default:
      iconComponent = <SportsKabaddiIcon fontSize="large" />;
  }

  useEffect(() => {
    if (trainingData && date) {
      fetchAttendancesByTraining(trainingData.id, date);
    }
  }, [date]);

  console.log(date);
  console.log(attendancesByTraining);

  return (
    <Layout>
      <div className="flex flex-col gap-y-10 p-10">
        <div className="flex gap-x-3 ">
          <GetBack />
          <div className="flex items-end justify-center text-orange">
            {iconComponent}
          </div>
          <h1 className="text-4xl"> {trainingData.training_name} </h1>
        </div>
        <div className="flex items-center justify-center">
          <Calendar setDate={setDate} />
          <AttendanceDataGrid attendancesByTraining={attendancesByTraining} />
        </div>
      </div>
    </Layout>
  );
};

export default TrainingDetail;
