"use client";

import React from "react";

const LeaderboardCard = ({
  position,
  username,
  points,
  daily_check_ins,
  weekly_check_ins,
  avatar,
  color,
  level
}: any) => {
  console.log(level,"Level")
  const levelImages = {
    1: "/medal.png",
    2: "/Novice.png",
    3: "/Adept.png",
    4: "/Challenger.png",
    5: "/Prodigy.png",
    6: "/Expert.png",
    7: "/Veteran.png",
    8: "/master.png",
    9: "/Elite.png",
    10: "/Ascendent.png",
    default: "/medal.png",
  };
  // level
  return (
    <div
      className={`rounded-2xl overflow-hidden p-[1px] ${color.card1} text-white min-w-[300px]`}
    >
      <div className={` bg-black/80 rounded-2xl `}>
        <div className={` h-full py-4 rounded-2xl  px-5 ${color.card2} `}>
          <div className="flex items-center justify-between">
            {/* Position */}
            <h1 className="text-3xl text-center font-bold flex items-baseline justify-center">
              {position}
              <span className="text-sm self-center bg-[#1919194D] rounded-full px-4 py-1 ml-4 font-normal">
                position
              </span>
              <img
                src={levelImages[level]} // Provide a default image if not available
                className="h-6 w-6 "
              />
            </h1>


            {/* User Details */}

            <div className="flex items-center my-4 space-x-4">
              <img
                src={avatar}
                alt={username}
                className="h-12 w-12 rounded-full object-cover border-2 border-white"
                onError={(e) => (e.currentTarget.src = "/avatar.jpeg")}
              />
            </div>
          </div>

          {/* Points */}
          <div className="flex items-center justify-between text-sm  ">
            <span className="text-md">@{username}</span>

            <p className="text-sm ml-1 font-normal">
              <span className="text-xl font-bold mr-1">{points}</span> pts
            </p>
          </div>

          {/* League and Competition */}
          <div className="mt-4">
            <p className="flex text-sm justify-between">
              <span className="text-gray-300">Total Check-ins</span>

              {daily_check_ins}
            </p>
            <p className="flex justify-between text-sm mt-2">
              <span className="text-gray-300">Weekly Check-ins</span>

              {weekly_check_ins}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardCard;
