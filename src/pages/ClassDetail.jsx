import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { useLocation } from "react-router-dom";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";

import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import SportsMmaIcon from "@mui/icons-material/SportsMma";
import AttendanceDataGrid from "../components/AttendanceDataGrid";
import GetBack from "../components/GetBack";
import Calendar from "../components/Calendar";
import { useState } from "react";
import dayjs from "dayjs";
import { useStudentStore } from "../store/useStudentStore";
import { useClassStore } from "../store/useClassStore";

const ClassDetail = () => {
  const [date, setDate] = useState(dayjs(new Date()));

  const location = useLocation();
  const { classData } = location.state || {};


  const { getAttendancesByClass, attendancesByClass, daysWithClasses } = useClassStore();

  let iconComponent;
  switch (classData?.modality) {
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
    if (classData && date) {
      getAttendancesByClass(classData.id, date);
    }
  }, [date]);

  return (
    <Layout>
      <div className="flex flex-col gap-y-10 p-10">
        <div className="flex gap-x-3 ">
          <GetBack />
          <div className="flex items-end justify-center text-orange">
            {iconComponent}
          </div>
          <h1 className="text-4xl"> {classData.name} </h1>
        </div>
        <div className="flex items-center justify-center">
          <Calendar setDate={setDate} daysWithClasses={daysWithClasses} />
          <AttendanceDataGrid attendancesByClass={attendancesByClass} />
        </div>
      </div>
    </Layout>
  );
};

export default ClassDetail;
