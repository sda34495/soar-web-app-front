import { getData, post } from "@/utils/axios";
import endpoints from "@/utils/endpoints";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const BeStillCard = ({
  checkInStatus,
  goal,
  setCheckInStatus,
  fetchCheckInDetails,
}: any) => {
  const [isProcessing, setIsProcessing] = useState(false); // State to track loading status
  const [hideText , setHideText] = useState(false)
  const handleCheckboxChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    timeOfDay: "morning" | "evening"
  ) => {
    const checked = event.target.checked;

    // Prevent any further clicks if processing
    if (isProcessing) return;

    setIsProcessing(true); // Set processing state to true

    // Show the loading toast
    const loadingToast = toast.loading("Updating...");

    setCheckInStatus((prevStatus) => ({
      ...prevStatus,
      praying: {
        ...prevStatus.praying,
        [timeOfDay]: !checked, // Dynamically update morning or evening
      },
    }));

    // Prepare the request data
    const data = {
      activity_type: "praying",
      time_of_day: timeOfDay,
    };

    try {
      const response = await post(endpoints.POST_CHECK_IN_DATA, data);

      if (response?.data?.success) {
        fetchCheckInDetails();
        toast.success("Be Still Check-ins updated successfully", {
          id: loadingToast,
        });
      }
    } catch (error) {
      toast.error("An error occurred while updating check-in status.", {
        id: loadingToast,
      });
    } finally {
      // Wait 2-3 seconds before re-enabling clicks
      setTimeout(() => {
        setIsProcessing(false); // Reset processing state
      }, 2000); // 2000ms (2 seconds) delay
    }
  };

  const getFormattedDate = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString("default", { month: "short" }); // "Nov"
    return `${day}, ${month}`; // e.g., "17, Nov"
  };

  const todayDate = getFormattedDate();

  //   const progress = parseFloat(checkInStatus?.progress.toFixed(1)) ;
  const progress = parseFloat(checkInStatus?.progress.toFixed(1) || 0);

  const progressColor =
    progress < 50 ? " text-red-600" : " text-green-500";
  const text =
    progress < 50
      ? "Hey! You’re leaving things behind"
      : "Hurray! You're making progress";

      useEffect(() => {
        if (checkInStatus.evening === true && checkInStatus.morning === true) {
          setHideText(true);
        } 
      }, [checkInStatus]);

  return (
    <div
      className={`bg-gradient-to-b from-[#454545] to-[#3c3c3c] p-[1px] text-white shadow-md  rounded-2xl ${
        isProcessing ? "cursor-not-allowed blur-sm" : ""
      }`}
    >
      <div className="bg-[#121212] text-white rounded-2xl shadow-md p-6 space-y-4 ">
        {/* Header Section */}
        <div className="flex justify-between items-center ">
          <h2 className="text-lg font-bold">Be Still Check-ins{" "}
          <span className="text-yellow-500"> ({goal})</span>
          </h2>
          <div className="flex flex-col lg:flex-row items-center space-x-2">
            <span className={`text-green-500 font-semibold" ${hideText && "hidden" } ${progressColor}`}>
              {text}
            </span> */}
            <div className="flex items-center">
              <div className="h-2 w-[250px] bg-gray-700 rounded-full relative">
                <div
                  className={"h-full rounded-full " + progressColor}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <span className="ml-2 text-sm">{progress}%</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {/* Checked item */}
          <div className="flex items-center justify-between mr-20">
            <div className="flex items-center space-x-3">
              <label className="flex items-center cursor-pointer relative">
                <input
                  type="checkbox"
                  className="peer h-6 w-6 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md  border-[#7C7C7C] border-2 checked:bg-green-600 checked:border-green-600"
                  checked={checkInStatus?.morning}
                  onChange={(e) => handleCheckboxChange(e, "morning")}
                  disabled={isProcessing} // Disable the checkbox during processing
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
              <span className="text-gray-400 font-extrabold text-2xl">Be Still (morning)</span>
            </div>
            <div className="flex space-x-28 text-gray-400">
              <span className="w-20">{todayDate}</span>
              <span className="w-20">No-sub</span>
              <span className="w-20">10 minutes</span>
            </div>
          </div>

          {/* Unchecked item */}
          <div className="flex items-center justify-between mr-20">
            <div className="flex items-center space-x-3">
              <label className="flex items-center cursor-pointer relative">
                <input
                  type="checkbox"
                  className="peer h-6 w-6 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md  border-[#7C7C7C] border-2 checked:bg-green-600 checked:border-green-600"
                  checked={checkInStatus?.evening}
                  onChange={(e) => handleCheckboxChange(e, "evening")}
                  disabled={isProcessing} // Disable the checkbox during processing
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
              <span className="text-gray-400 font-extrabold text-2xl">Be Still (evening)</span>
            </div>
            <div className="flex space-x-28 text-gray-400">
              <span className="w-20">{todayDate}</span>
              <span className="w-20">No-sub</span>
              <span className="w-20">10 minutes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeStillCard;
