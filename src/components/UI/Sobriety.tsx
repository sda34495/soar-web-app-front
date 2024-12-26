import { getData, post } from "@/utils/axios";
import endpoints from "@/utils/endpoints";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const SobrietyCard = ({setIsModalOpen,updateModalTitle,setIsLoading,checkInStatus,setCheckInStatus,fetchCheckInDetails}: any) => {
 

  const [shouldRefetch, setShouldRefetch] = useState(false)

  



  const handleCheckboxChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    timeOfDay: "morning" | "evening"
  ) => {
    const checked = event.target.checked;

    // Update the state to reflect the checkbox change (this won't trigger re-fetching)
    setCheckInStatus((prevStatus) => ({
      ...prevStatus,
      sobriety: {
        ...prevStatus.sobriety,
        [timeOfDay]: checked, // Dynamically update morning or evening
      },
    }));
  

    // Prepare the request data
    const data = {
      activity_type: "sobriety",
      time_of_day: timeOfDay,
    };

    try {
      setIsLoading(true);
      const response = await post(endpoints.POST_CHECK_IN_DATA, data);

      if (response?.data?.success) {
        fetchCheckInDetails();
        // updateModalTitle("Finance Check-ins update successfully");
        // setIsModalOpen(true);
        
      } 
    } catch (error) {
      toast.error("An error occurred while updating check-in status.");
    }finally{
      setIsLoading(false)
    }
  };


  const getFormattedDate = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString("default", { month: "short" }); // "Nov"
    return `${day}, ${month}`; // e.g., "17, Nov"
  };

  const todayDate = getFormattedDate();



  const progress = parseFloat(checkInStatus.progress.toFixed(1)) ;
  
  const progressColor = progress < 50 ? "bg-red-600 text-red-600" : "bg-green-600 text-green-500";
  const text = progress < 50 ? "Hey! You’re leaving things behind" : "Hurray! You're making progress"

  return (
    <div className="bg-gradient-to-b from-[#454545] to-[#3c3c3c] p-[1px] text-white shadow-md  rounded-2xl ">
      <div className="bg-[#121212] text-white rounded-2xl shadow-md p-6 space-y-4 ">
        {/* Header Section */}
        <div className="flex justify-between items-center ">
          <h2 className="text-lg font-bold">
            No Alcohol / Substance Check-ins
          </h2>
          <div className="flex flex-col lg:flex-row items-center space-x-2">
            <span className={"text-green-500 font-semibold" + progressColor}>
              {text}
            </span>
            <div className="flex items-center">
              <div className="h-2 w-[300px] bg-gray-700 rounded-full relative">
                <div
                  className={"h-full rounded-full " + progressColor}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <span className="ml-2 text-sm">{progress}%</span>
            </div>
          </div>
        </div>

        {/* Sobriety Items */}
        <div className="space-y-4">
          {/* Checked item */}
          <div className="flex items-center justify-between mr-20">
            <div className="flex items-center mr-5 space-x-3">
              <label className="flex items-center cursor-pointer relative">
                <input
                  type="checkbox"
                  className="peer h-6 w-6 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md  border-[#7C7C7C] border-2 checked:bg-green-600 checked:border-green-600"
                  checked={checkInStatus.morning}
                  onChange={(e) => handleCheckboxChange(e, "morning")}
                />
                <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </span>
              </label>
              <span className=" text-gray-400">No-substance <br/> (morning)</span>
            </div>
            <div className="flex justify-between flex-grow text-gray-400 ">
              <span>{todayDate}</span>
              <span>No-substance</span>
              <span>10 minutes</span>
            </div>
          </div>

          {/* Unchecked item */}
          <div className="flex items-center justify-between mr-20">
            <div className="flex items-center mr-5 space-x-3">
              <label className="flex items-center cursor-pointer relative">
                <input
                  type="checkbox"
                  className="peer h-6 w-6 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md  border-[#7C7C7C] border-2 checked:bg-green-600 checked:border-green-600"
                  checked={checkInStatus.evening}
                  onChange={(e) => handleCheckboxChange(e, "evening")}
                />
                <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </span>
              </label>
              <span className="text-gray-400">No-substance <br/> (evening)</span>
            </div>
            <div className="flex justify-between flex-grow text-gray-400">
              <span>{todayDate}</span>
              <span>No-substance</span>
              <span>10 minutes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SobrietyCard;
