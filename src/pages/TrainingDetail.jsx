import React, { useContext, useEffect } from "react";
import Layout from "../components/Layout";
import { useLocation } from "react-router-dom";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";

import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import SportsMmaIcon from "@mui/icons-material/SportsMma";
import TrainingContext from "../context/TrainingContext";
import AttendanceDataGrid from "../components/AttendanceDataGrid";
import GetBack from "../components/GetBack";

const TrainingDetail = () => {
  const location = useLocation();
  const { trainingData } = location.state || {};

  const { getAttendancesByTraining, trainingAttendances } =
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
    if (trainingData) {
      getAttendancesByTraining(trainingData.id);
    }
  }, []);

  return (
    <Layout>
      <div className="p-10 flex flex-col gap-y-10">
        <div className="flex gap-x-3 ">
          <GetBack />
          <div className="flex justify-center items-end text-orange">
            {iconComponent}
          </div>
          <h1 className="text-4xl"> {trainingData.training_name} </h1>
        </div>
        {trainingAttendances.length > 0 && (
          <AttendanceDataGrid attendancesByTraining={trainingAttendances} />
        )}
      </div>
    </Layout>
  );
};

export default TrainingDetail;
