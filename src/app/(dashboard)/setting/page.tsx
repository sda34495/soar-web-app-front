"use client";
import React, { useState } from "react";
import GeneralProfile from "./components/GeneralProfile";
import PasswordSecurity from "./components/PasswordSecurity";
import Notification from "./components/Notification";
import useSidebarLoading from "@/Hook/useSidebarLoading";


const SettingPage = () => {
  const [activeTab, setActiveTab] = useState("general");
  useSidebarLoading();
  return (
    <div className="mb-5">
      <div className=" mb-6">
        <button
          
          onClick={() => setActiveTab("general")}
          className={`w-full md:w-[180px] mr-4 bg-[#202020] hover:bg-[#EFEFEF] hover:text-[#202020] text-[13px] md:text-[18px]   rounded-full p-3 mt-8 ${activeTab === "general" ? "bg-[#EFEFEF] text-[#202020] font-bold" : "text-[#989898] font-normal "}`}
        >
          General profile
        </button>
        <button
         
          onClick={() => setActiveTab("notification")}
          className={`w-full md:w-[180px] mr-4 bg-[#202020] hover:bg-[#EFEFEF] hover:text-[#202020] text-[13px] md:text-[18px]   rounded-full p-3 mt-8 ${activeTab === "notification" ? "bg-[#EFEFEF] text-[#202020] font-bold" : "text-[#989898] font-normal "}`}
        >
          Notification
        </button>
        <button
          
          onClick={() => setActiveTab("password")}
          className={` w-full md:w-[180px] mr-4 bg-[#202020] hover:bg-[#EFEFEF] hover:text-[#202020]  text-[13px] md:text-[18px] rounded-full p-3 mt-8 ${activeTab === "password" ? "bg-[#EFEFEF] text-[#202020] font-bold" : "text-[#989898] font-normal "}`}
        >
          Password security
        </button>
      </div>

      {activeTab === "general" && <GeneralProfile  />}
      {activeTab === "notification" &&<div id="notification"><Notification /></div>}
      {activeTab === "password" && <PasswordSecurity />}
      
    </div>
  );
};

export default SettingPage;
