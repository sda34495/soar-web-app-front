import { getData, post } from "@/utils/axios";
import endpoints from "@/utils/endpoints";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const BeStillCard = ({
  checkInStatus,
  setCheckInStatus,
  fetchCheckInDetails,
}: any) => {
  // const [checkInStatus, setCheckInStatus] = useState<{
  //   morning: boolean;
  //   evening: boolean;
  //   progress: number;
  // }>({
  //   morning: false,
  //   evening: false,
  //   progress: 0,
  // });

  // useEffect(() => {
  //   const fetchCheckInDetails = async () => {
  //     try {
  //       const response = await getData(endpoints.GET_CHECK_IN_DATA);
  //       if (response.data?.success) {
  //         const data = response.data?.data?.check_in_details?.sobriety || {};
  //         setCheckInStatus({
  //           morning: data.morning || false,
  //           evening: data.evening || false,
  //           progress: data.progress || 0,
  //         });
  //       }
  //     } catch (error) {
  //       console.log("Failed to fetch check-in details:", error);
  //     }
  //   };

  //   if (shouldRefetch) {
  //     fetchCheckInDetails();
  //     setShouldRefetch(false); // Reset the refetch flag after fetching
  //   }

  //   // Fetch the data on mount only (empty dependency array ensures this effect runs only once)
  //   fetchCheckInDetails();
  // }, [shouldRefetch]);

  //   const handleCheckboxChange = async (
  //     event: React.ChangeEvent<HTMLInputElement>,
  //     timeOfDay: "morning" | "evening"
  //   ) => {
  //     const checked = event.target.checked;

  //     // Update the state to reflect the checkbox change (this won't trigger re-fetching)
  //     setCheckInStatus((prevStatus) => ({
  //       ...prevStatus,
  //       sobriety: {
  //         ...prevStatus.sobriety,
  //         [timeOfDay]: checked, // Dynamically update morning or evening
  //       },
  //     }));

  //     // Prepare the request data
  //     const data = {
  //       activity_type: "be_still",
  //       time_of_day: timeOfDay,
  //     };

  //     try {
  //
  //       const response = await post(endpoints.POST_CHECK_IN_DATA, data);

  //       if (response?.data?.success) {
  //         fetchCheckInDetails();
  //         // updateModalTitle("Finance Check-ins update successfully");
  //

  //       }
  //     } catch (error) {
  //       toast.error("An error occurred while updating check-in status.");
  //     }
  //   };

  const getFormattedDate = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString("default", { month: "short" }); // "Nov"
    return `${day}, ${month}`; // e.g., "17, Nov"
  };

  const todayDate = getFormattedDate();

  //   const progress = parseFloat(checkInStatus?.progress.toFixed(1)) ;
  const progress = 10;

  const progressColor =
    progress < 50 ? "bg-red-600 text-red-600" : "bg-green-600 text-green-500";
  const text =
    progress < 50
      ? "Hey! You’re leaving things behind"
      : "Hurray! You're making progress";

  return (
    <div className="bg-gradient-to-b from-[#454545] to-[#3c3c3c] p-[1px] text-white shadow-md  rounded-2xl ">
      <div className="bg-[#121212] text-white rounded-2xl shadow-md p-6 space-y-4 ">
        {/* Header Section */}
        <div className="flex justify-between items-center ">
          <h2 className="text-lg font-bold">Be Still Check-ins</h2>
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

        <div className="space-y-4">
          {/* Checked item */}
          <div className="flex items-center justify-between mr-20">
            <div className="flex items-center space-x-3">
              <label className="flex items-center cursor-pointer relative">
                <input
                  type="checkbox"
                  className="peer h-6 w-6 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md  border-[#7C7C7C] border-2 checked:bg-green-600 checked:border-green-600"
                  checked={checkInStatus?.morning}
                  //   onChange={(e) => handleCheckboxChange(e, "morning")}
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
              <span className="text-gray-400">No-substance (morning)</span>
            </div>
            <div className="flex space-x-28 text-gray-400">
              <span className="w-20">{todayDate}</span>
              <span className="w-20">No-sub</span>
              <span className="w-20">6 hours</span>
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
                  //   onChange={(e) => handleCheckboxChange(e, "evening")}
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
              <span className="text-gray-400">No-substance (evening)</span>
            </div>
            <div className="flex space-x-28 text-gray-400">
              <span className="w-20">{todayDate}</span>
              <span className="w-20">No-sub</span>
              <span className="w-20">6 hours</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeStillCard;
