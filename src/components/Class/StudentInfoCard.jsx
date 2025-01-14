import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const StudentInfoCard = ({ studentInfo, handleMarkAttendance, setStudentInfo }) => {
  return (
    <div className="my-5 flex items-center justify-center">
      <div className="flex w-1/3 flex-col items-center rounded-lg border border-gray-300 shadow-lg bg-white text-gray-800 p-5">
        <h3 className="text-lg font-semibold">{studentInfo.name}</h3>
        <p className="text-sm text-gray-600">
          Faixa <span className="font-bold">{studentInfo.belt.description}</span>
          {" - "}
          {studentInfo.degree.description} graus
        </p>
        <div className="flex mt-4 gap-x-4">
          <button
            className="flex items-center gap-x-2 px-4 py-2 bg-green rounded-lg text-white hover:bg-green-dark transition"
            onClick={() => handleMarkAttendance(studentInfo.id)}
          >
            <CheckCircleIcon fontSize="small" />
            Check
          </button>
          <button
            className="flex items-center gap-x-2 px-4 py-2 bg-red-500 rounded-lg text-white hover:bg-red-600 transition"
            onClick={() => setStudentInfo(null)}
          >
            <CancelIcon fontSize="small" />
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentInfoCard;