import React, { useState } from "react";

const MonthChartSelector = ({ selectedMonth, setSelectedMonth }) => {
  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const handleChange = (e) => {
    setSelectedMonth(parseInt(e.target.value));
  };

  return (
    <div className="relative">
      <select
        id="monthSelect"
        value={selectedMonth}
        onChange={handleChange}
        className="appearance-none bg-whiter rounded-lg border border-gray-300 h-9 text-gray-700 px-2 py-1 pr-6 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 cursor-pointer"
      >
        {monthNames.map((month, index) => (
          <option key={index + 1} value={index + 1}>
            {month}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};

export default MonthChartSelector;
