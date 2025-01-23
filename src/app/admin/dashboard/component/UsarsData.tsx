"use client";

import React from "react";

const UserData = ({ color, usertype, users, text }: any) => {
  return (
    <div
      className={`rounded-2xl overflow-hidden p-[1px] ${color.card1} text-white min-w-[300px]`}
    >
      <div className={` bg-black/80 rounded-2xl `}>
        <div className={` h-full py-4 rounded-2xl px-5 ${color.card2} `}>
          <div className="flex items-center ">
            <div className="flex items-center w-full justify-between ">
              <div className="flex flex-col">
                <h3 className="text-lg font-bold text-gray-300">{usertype}</h3>
                <p className="text-sm mt-2 text-gray-300">Total users who have signed in.</p>
              </div>
              <p className={`text-4xl font-extrabold mt-2 text-[${text}] `}>{users}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserData;
