import React from "react";

const LeaderboardCard = ({
  position,
  username,
  points,
  league,
  competition,
  avatar,
  color,
}: any) => {



  return (
    <div  className={`rounded-2xl overflow-hidden p-[1px] ${color.card1} text-white min-w-[300px]`}>
    <div  className={` bg-black/80 rounded-2xl `}>
    <div  className={` h-full py-4 rounded-2xl  px-5 ${color.card2} `}>
      <div className="flex items-center justify-between">
        {/* Position */}
        <h1 className="text-3xl text-center font-bold flex items-baseline justify-center">
  {position}
  <span className="text-sm self-center bg-[#1919194D] rounded-full px-4 py-1 ml-4 font-normal">
    position
  </span>
</h1>

        {/* User Details */}

        <div className="flex items-center my-4 space-x-4">
          <img
            src={avatar}
            alt={username}
            className="h-12 w-12 rounded-full object-cover border-2 border-white"
          />
        </div>
      </div>

      {/* Points */}
      <div className="flex items-center justify-between text-sm  ">
        <span className="text-md">@{username}</span>
        
        <p className="text-sm ml-1 font-normal"> 
           <span className="text-xl font-bold mr-1">{points}</span> pts</p>
      </div>

      {/* League and Competition */}
      <div className="mt-4">
        <p className="flex text-sm justify-between">
          <span className="text-gray-300">League</span>

          {league}
        </p>
        <p className="flex justify-between text-sm mt-2">
          <span className="text-gray-300">Competition</span>

          {competition}
        </p>
      </div>
    </div>
    </div>
      </div>
  );
};

export default LeaderboardCard;
