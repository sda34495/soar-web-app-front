import React from "react";
import ProgressBar from "./ProgressBar";

// Progress Card Component
const DashboardCard = ({
  title,
  time,
  points,
  progressColor,
  progressWidth,
}: any) => {
  return (
    <div className="bg-black text-white p-4 rounded-lg shadow-md w-80">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">{title}</h3>
        <button className="text-gray-400">
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.666 13C13.2183 13 13.666 12.5523 13.666 12C13.666 11.4477 13.2183 11 12.666 11C12.1137 11 11.666 11.4477 11.666 12C11.666 12.5523 12.1137 13 12.666 13Z"
              stroke="#7C7C7C"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12.666 6C13.2183 6 13.666 5.55228 13.666 5C13.666 4.44772 13.2183 4 12.666 4C12.1137 4 11.666 4.44772 11.666 5C11.666 5.55228 12.1137 6 12.666 6Z"
              stroke="#7C7C7C"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12.666 20C13.2183 20 13.666 19.5523 13.666 19C13.666 18.4477 13.2183 18 12.666 18C12.1137 18 11.666 18.4477 11.666 19C11.666 19.5523 12.1137 20 12.666 20Z"
              stroke="#7C7C7C"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <p className="text-2xl font-bold mt-2">{time}</p>
      <div className="flex justify-between items-center pt-4 mb-1">
        <p className="text-sm text-gray-400">Daily Progress</p>
        <p className="text-sm font-medium text-right mt-2">{points} pts</p>
      </div>
      <ProgressBar percentage={progressWidth} />
     
    </div>
  );
};

export default DashboardCard;
