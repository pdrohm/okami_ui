import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
      max: 40,
      ticks: {
        stepSize: 5,
        precision: 0,
      },
    },
  },
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Checkins diários por modalidade",
    },
  },
};

const BarChart = ({ studentsCountByModality }) => {
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
    jiujitsu: { backgroundColor: "#FF914C" },
    muaythai: { backgroundColor: "#485C40" },
    yoga: { backgroundColor: "#D6A0F2" },
    other: { backgroundColor: "#86A7FC" },
  };

  const data = {
    labels: labels,
    datasets: modalities.map((modality, index) => {
      const colorConfig = colorsByModality[modality] || {
        backgroundColor: "#000000",
      };
      return {
        label: modality,
        data: labels.map((day) => {
          const studentInfo = studentsCountByModality[modality].find(
            (item) => item.day == day
          );
          return studentInfo ? parseInt(studentInfo.student_count) : 0;
        }),
        backgroundColor: colorConfig.backgroundColor,
      };
    }),
  };

  return (
    <div className="w-[620px] h-96 bg-whiter rounded-lg p-2 border">
      <Bar options={options} data={data} responsive />
    </div>
  );
};

export default BarChart;
