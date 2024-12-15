"use client";
import React, { useState } from "react";
import GeneralProfile from "./components/GeneralProfile";
import PasswordSecurity from "./components/PasswordSecurity";
import Notification from "./components/Notification";


const SettingPage = () => {
  const [activeTab, setActiveTab] = useState("password");

  return (
    <div>
      <div className="space-x-4 mb-6">
        <button
          
          onClick={() => setActiveTab("general")}
          className={`w-[160px]  bg-[#202020] hover:bg-[#EFEFEF] hover:text-[#202020] text-[18px]   rounded-full p-3 mt-8 ${activeTab === "general" ? "bg-[#EFEFEF] text-[#202020] font-bold" : "text-[#989898] font-normal "}`}
        >
          General profile
        </button>
        <button
          
          onClick={() => setActiveTab("notification")}
          className={`w-[160px]  bg-[#202020] hover:bg-[#EFEFEF] hover:text-[#202020] text-[18px]   rounded-full p-3 mt-8 ${activeTab === "notification" ? "bg-[#EFEFEF] text-[#202020] font-bold" : "text-[#989898] font-normal "}`}
        >
          Notification
        </button>
        <button
          
          onClick={() => setActiveTab("password")}
          className={`w-[180px]  bg-[#202020] hover:bg-[#EFEFEF] hover:text-[#202020] text-[18px]  rounded-full p-3 mt-8 ${activeTab === "password" ? "bg-[#EFEFEF] text-[#202020] font-bold" : "text-[#989898] font-normal "}`}
        >
          Password security
        </button>
      </div>

      {activeTab === "general" && <GeneralProfile />}
      {activeTab === "notification" && <Notification />}
      {activeTab === "password" && <PasswordSecurity />}
      
    </div>
  );
};

export default SettingPage;
