"use client";
import React, { useState } from "react";

const Notification = () => {
  const [deviceNotifications, setDeviceNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);

  // Function to handle checkbox change
  const handleDeviceChange = () => {
    setDeviceNotifications((prev) => !prev);
  };

  const handleEmailChange = () => {
    setEmailNotifications((prev) => !prev);
  };
  return (
    <div>
      <form className=" max-w-[660px] space-y-8">
        <h3 className="text-2xl font-bold font-[#EFEFEF]">
          {" "}
          Notification preferences
        </h3>
        <div className="flex items-center justify-between ">
          <p className="text-[#7c7c7c] font-medium text-xl">
            Receive notifications on device
          </p>
          <label className="inline-flex items-center me-5 cursor-pointer">
            <input
              type="checkbox"
              checked={deviceNotifications}
              onChange={handleDeviceChange}
              className="sr-only peer"
            />
            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer    peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-[#00AB5B]"></div>
          </label>
        </div>
        <div className="flex items-center justify-between ">
          <p className="text-[#7c7c7c] font-medium text-xl">
            Receive notifications on your email
          </p>
          <label className="inline-flex items-center me-5 cursor-pointer">
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={handleEmailChange}
              className="sr-only peer"
            />
            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer    peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-[#00AB5B]"></div>
          </label>
        </div>

        <button
          type="submit"
          className="w-[220px] bg-custom-gradient hover:bg-custom-gradient-hover text-xl text-black font-bold rounded-full p-3 mt-8"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default Notification;
