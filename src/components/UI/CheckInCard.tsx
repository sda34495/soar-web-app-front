import { getData } from "@/utils/axios";
import endpoints from "@/utils/endpoints";
import { memo, useEffect, useState } from "react";
import toast from "react-hot-toast";

const CheckinCard = ({ checkInDetails }: any) => {


  const { pending_check_ins, total_done, total_minutes_spent, total_progress } =
    checkInDetails;
  const percentage = Math.round(parseFloat(total_progress)); // Convert string percentage to float for the progress bar
  const text = percentage > 49 ? "bg-green-600" : "bg-red-600"

  return (
    //       <div className="bg-gradient-to-b from-[#454545] to-[#3c3c3c] p-[1px] rounded-2xl">
    <div className="p-[1px] bg-gradient-to-b from-[#454545] to-[#3c3c3c] text-white rounded-2xl shadow-lg">
      <div className="flex flex-col md:flex-row items-center justify-between mx-auto p-4 bg-[#121212] text-white rounded-2xl shadow-lg space-y-4 md:space-y-0">
        {/* Text Section */}
        <div className="flex flex-col space-y-1 text-center md:text-left">
          <h2 className="text-lg font-semibold">Today's Checkins</h2>
          <p className="text-sm text-gray-400">
            Total 8, mark them before the end of the day
          </p>
        </div>

        {/* Stats Section */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 w-full md:w-auto">
          {/* Done */}
          <div className="flex flex-row items-center justify-center space-x-4">

            <div className="text-center">
              <p className="text-green-500 text-xl font-bold">{total_done}</p>
              <p className="text-xs">Done</p>
            </div>
            {/* Pending */}
            <div className="text-center">
              <p className="text-red-500 text-xl font-bold">{pending_check_ins}</p>
              <p className="text-xs">Pending</p>
            </div>
            {/* Time */}
            <div className="text-center">
              <p className="text-green-500 text-xl font-bold">{total_minutes_spent}</p>
              <p className="text-xs">Time</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center w-full md:w-auto">
            <div className="h-2 w-full sm:w-[150px] md:w-[200px] bg-gray-700 rounded-full relative">
              <div
                className={`h-full rounded-full ${text}`}
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            <span className="ml-2 text-sm">{percentage}%</span>
          </div>
        </div>
      </div>
    </div>

  );
}

export default memo(CheckinCard);
