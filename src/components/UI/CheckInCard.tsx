import { getData } from "@/utils/axios";
import endpoints from "@/utils/endpoints";
import { useEffect, useState } from "react";

const CheckinCard = () => {


  const [checkInDetails, setCheckInDetails] = useState({
    total_minutes_spent: 0,
    pending_check_ins: 0,
    total_done: 0,
    total_progress: 0,
  });

  
  useEffect(() => {
    const fetchCheckInDetails = async () => {
      try {
        const response = await getData(endpoints.GET_CHECK_IN_DATA);
        if (response.data?.success) {
          setCheckInDetails(response.data?.data); // Store fetched data in state
          console.log(response.data)
        }
      } catch (error) {
        console.error("Failed to fetch check-in details:", error);
      }
    };

    fetchCheckInDetails();
  }, []); 

  const { pending_check_ins, total_done, total_minutes_spent, total_progress } = checkInDetails;
  // const percentage = parseFloat(total_progress); // Convert string percentage to float for the progress bar



    const percentage = 50
  return (
    //       <div className="bg-gradient-to-b from-[#454545] to-[#3c3c3c] p-[1px] rounded-2xl">
    <div className=" p-[1px] bg-gradient-to-b from-[#454545] to-[#3c3c3c] text-white rounded-2xl shadow-lg">
    <div className="flex flex-col md:flex-row items-center  justify-between mx-auto p-4 bg-[#121212] text-white rounded-2xl shadow-lg">


      <div className="flex flex-col space-y-1">
        <h2 className="text-lg font-semibold">Today's Checkins</h2>
        <p className="text-sm text-gray-400">
          Total 6, mark them before the end of the day
        </p>
      </div>

      <div className=" flex items-center justify-center space-x-4">
        <div className="text-center">
          <p className="text-green-500 text-xl font-bold">{total_done}</p>
          <p className="text-xs">Done</p>
        </div>
        <div className="text-center">
          <p className="text-red-500 text-xl font-bold">{pending_check_ins}</p>
          <p className="text-xs">Pending</p>
        </div>
        <div className="text-center">
          <p className="text-green-500 text-xl font-bold">{total_minutes_spent}</p>
          <p className="text-xs">Time</p>
        </div>
        <div className="flex items-center">
              <div className="h-2 w-[200px] bg-gray-700 rounded-full relative ">
                <div
                  className={"h-full rounded-full bg-green-500" }
                  style={{ width: `${percentage}%` }}
                  ></div>
              </div>
              <span className="ml-2 text-sm">{percentage}%</span>
            </div>
      </div>
                  </div>
                  </div>
         
  
  );
};

export default CheckinCard;
