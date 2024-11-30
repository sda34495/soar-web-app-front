import React from "react";

const FitnessCard = ({percentage} :any) => {

    const color = percentage < 50 ? 'bg-red-600 text-red-600' : 'bg-green-600 text-green-500';
  return (
    <div className="bg-gradient-to-b from-[#454545] to-[#3c3c3c] p-[1px] text-white shadow-md  rounded-2xl ">
    <div className="bg-[#121212] text-white rounded-2xl shadow-md p-6 space-y-4 ">
      
        {/* Header Section */}
        <div className="flex justify-between items-center ">
          <h2 className="text-lg font-bold">Fitness Check-ins</h2>
          <div className="flex items-center space-x-2">
            <span className={"text-green-500 font-semibold" +color}>
              Hurray! You're making progress
            </span>
            <div className="flex items-center">
              <div className="h-2 w-[300px] bg-gray-700 rounded-full relative">
                <div
                  className={"h-full rounded-full " + color}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <span className="ml-2 text-sm">{percentage}%</span>
            </div>
          </div>
        </div>

        {/* Fitness Items */}
        <div className="space-y-4">
          {/* Checked item */}
          <div className="flex items-center justify-between mr-20">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked
                readOnly
                className="h-5 w-5 text-green-500 bg-black border-gray-600 focus:ring-0"
              />
              <span className="text-gray-400">Fitness (morning)</span>
            </div>
            <div className="flex space-x-28 text-gray-400">
              <span>17, Nov</span>
              <span>Fitness</span>
              <span>10 minutes</span>
            </div>
          </div>

          {/* Unchecked item */}
          <div className="flex items-center justify-between mr-20">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="h-5 w-5 text-green-500  bg-black border-gray-600 focus:ring-0"
              />
              <span className="text-gray-400">Fitness (morning)</span>
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
