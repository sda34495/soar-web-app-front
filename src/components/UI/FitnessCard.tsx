import { getData, post } from "@/utils/axios";
import React, { useEffect, useState } from "react";
import endpoints from "@/utils/endpoints";
import toast from "react-hot-toast";

const FitnessCard = ({ updateModalTitle, setIsModalOpen }: any) => {
  const [checkInStatus, setCheckInStatus] = useState<{
    morning: boolean;
    evening: boolean;
  }>({
    morning: false,
    evening: false,
  });

  const [progress, setProgress] = useState<number>(0); // State for progress

  useEffect(() => {
    const fetchCheckInDetails = async () => {
      try {
        const response = await getData(endpoints.GET_CHECK_IN_DATA);
        if (response.data?.success) {
          const data = response.data?.data?.check_in_details?.fitness || {};
          setCheckInStatus({
            morning: data.morning || false,
            evening: data.evening || false,
          });
          setProgress(data.progress || 0); // Set progress dynamically
        }
      } catch (error) {
        console.error("Failed to fetch check-in details:", error);
      }
    };

    fetchCheckInDetails();
  }, [checkInStatus]);

  const handleCheckboxChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    timeOfDay: "morning" | "evening"
  ) => {
    const checked = event.target.checked;

    // Update the state to reflect the checkbox change
    setCheckInStatus((prevStatus) => ({
      ...prevStatus,
      [timeOfDay]: checked,
    }));

    const data = {
      activity_type: "fitness",
      time_of_day: timeOfDay,
    };

    try {
      const response = await post(endpoints.POST_CHECK_IN_DATA, data);

      if (response?.data?.success) {
        const updatedProgress = response.data?.data?.check_in_details?.fitness?.progress;
        setProgress(updatedProgress || 0); // Update progress from the API response
        setTimeout(() => {
          updateModalTitle('Finance Check-ins update successfully')
          setIsModalOpen(true);
        }, 500); 
      } else {
        toast.error("Failed to update check-in status.");
      }
    } catch (error) {
      toast.error("An error occurred while updating check-in status.");
    }
  };

  const progressColor = progress < 50 ? "bg-red-600 text-red-600" : "bg-green-600 text-green-500";

  const text = progress < 50 ? "Hey! You’re leaving things behind" : "Hurray! You're making progress" 

  return (
    <div className="bg-gradient-to-b from-[#454545] to-[#3c3c3c] p-[1px] text-white shadow-md rounded-2xl">
      <div className="bg-[#121212] text-white rounded-2xl shadow-md p-6 space-y-4">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">Fitness Check-ins</h2>
          <div className="flex items-center space-x-2">
            <span className={"bg-transparent  font-semibold " + progressColor}>
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

        {/* Fitness Items */}
        <div className="space-y-4">
          {/* Morning Check-in */}
          <div className="flex items-center justify-between mr-20">
            <div className="flex items-center space-x-3">
              <label className="flex items-center cursor-pointer relative">
                <input
                  type="checkbox"
                  className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border-[#7C7C7C] border-2 checked:bg-green-600 checked:border-green-600"
                  checked={checkInStatus.morning}
                  onChange={(e) => handleCheckboxChange(e, "morning")}
                />
                <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
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
              <span className="text-gray-400">Fitness (morning)</span>
            </div>
            <div className="flex space-x-28 text-gray-400">
              <span>17, Nov</span>
              <span>Fitness</span>
              <span>10 minutes</span>
            </div>
          </div>

          {/* Evening Check-in */}
          <div className="flex items-center justify-between mr-20">
            <div className="flex items-center space-x-3">
              <label className="flex items-center cursor-pointer relative">
                <input
                  type="checkbox"
                  className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border-[#7C7C7C] border-2 checked:bg-green-600 checked:border-green-600"
                  checked={checkInStatus.evening}
                  onChange={(e) => handleCheckboxChange(e, "evening")}
                />
                <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
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
              <span className="text-gray-400">Fitness (evening)</span>
            </div>
            <div className="flex space-x-28 text-gray-400">
              <span>17, Nov</span>
              <span>Fitness</span>
              <span>10 minutes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FitnessCard;
