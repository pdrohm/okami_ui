import React, { useState } from "react";
import BarChartIcon from "@mui/icons-material/BarChart";
import SsidChartIcon from "@mui/icons-material/SsidChart";

const ToggleChart = ({ isBarActive, setIsBarActive }) => {
  return (
    <div className="bg-whiter px-2 py-1 h-9 rounded-md border flex justify-center items-center divide-x">
      <BarChartIcon
        onClick={() => setIsBarActive(true)}
        className={`${
          isBarActive ? "text-orange" : "text-black"
        } cursor-pointer`}
      />
      <SsidChartIcon
        onClick={() => setIsBarActive(false)}
        className={`${
          !isBarActive ? "text-orange" : "text-black"
        } cursor-pointer`}
      />
    </div>
  );
};

export default ToggleChart;
