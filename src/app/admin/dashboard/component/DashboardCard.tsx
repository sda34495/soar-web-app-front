import React from "react";

// Progress Card Component
const DashboardCard = ({
  title,
  users,
  description,
}: any) => {
 

  return (
    <div className="bg-gradient-to-b overflow-hidden from-[#454545] to-[#3c3c3c] p-[1px] rounded-2xl max-h-[250px] h-full ">
      <div className="bg-[#121212] py-2 rounded-2xl px-4  text-white p-4 max-h-[250px] h-full">
        <div className="flex justify-between items-center ">
          <h3 className="text-lg text-[#BDBDBD] font-semibold">{title}</h3>
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
        <p className="text-2xl font-bold mt-2">{users}</p>
        <p className="text-sm text-[#BDBDBD]">Total users who have signed in.</p>
       
      </div>
    </div>
  );
};

export default DashboardCard;
