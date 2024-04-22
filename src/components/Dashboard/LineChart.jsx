import React, { useContext } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import TrainingContext from "../../context/TrainingContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  interaction: {
    mode: "index",
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: "Checkins diários por modalidade",
    },
  },
  scales: {
    y: {
      type: "linear",
      display: true,
      position: "left",
      min: 0,
      max: 40,
      ticks: {
        stepSize: 5,
        precision: 0,
      },
    },
  },
  maintainAspectRatio: false,
};

const LineChart = ({ studentsCountByModality }) => {

  if (!studentsCountByModality) {
    return <div>Carregando dados...</div>;
  }

  const modalities = Object.keys(studentsCountByModality);

  const daysInMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0
  ).getDate();
  const labels = Array.from({ length: daysInMonth }, (_, i) => i + 1).map(
    (day) => `${day < 10 ? "0" : ""}${day}`
  );

  const colorsByModality = {
    jiujitsu: { borderColor: "#FF914C", backgroundColor: "#FF914C80" },
    muaythai: { borderColor: "#485C40", backgroundColor: "#485C4080" },
    yoga: { borderColor: "#D6A0F2", backgroundColor: "#D6A0F280" },
    other: { borderColor: "#86A7FC", backgroundColor: "#86A7FC80" },
  };

  const defaultColor = "#000000";

  const data = {
    labels: labels,
    datasets: modalities.map((modality, index) => {
      const colorConfig = colorsByModality[modality] || {
        borderColor: defaultColor,
        backgroundColor: defaultColor,
      };
      return {
        label: modality,
        data: labels.map((day) => {
          const studentInfo = studentsCountByModality[modality].find(
            (item) => item.day == day
          );
          return studentInfo ? parseInt(studentInfo.student_count) : 0;
        }),
        borderColor: colorConfig.borderColor,
        backgroundColor: colorConfig.backgroundColor,
        yAxisID: "y",
      };
    }),
  };

  return (
    <div className="w-[620px] h-96 bg-whiter rounded-lg p-2 border">
      <Line options={options} data={data} responsive />
    </div>
  );
};

export default LineChart;
