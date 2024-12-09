'use client'
import React, { useState } from 'react'
import UserTable from './components/UserTable'


const Userpage = () => {
  const [activeTab, setActiveTab] = useState("users");
  return (
    <div>
       <div className="space-x-4 mb-6">
        <button
          
          onClick={() => setActiveTab("users")}
          className={`  bg-[#202020] hover:bg-[#EFEFEF] hover:text-[#202020] text-[18px]   rounded-full p-3 px-6 mt-8 ${activeTab === "users" ? "bg-[#EFEFEF] text-[#202020] font-bold" : "text-[#989898] font-normal "}`}
        >
          All users
        </button>
        <button
          
          onClick={() => setActiveTab("premium")}
          className={` bg-[#202020] hover:bg-[#EFEFEF] hover:text-[#202020] text-[18px]   rounded-full p-3 px-6 mt-8 ${activeTab === "premium" ? "bg-[#EFEFEF] text-[#202020] font-bold" : "text-[#989898] font-normal "}`}
        >
          Premium
        </button>
        <button
          
          onClick={() => setActiveTab("active")}
          className={` bg-[#202020] hover:bg-[#EFEFEF] hover:text-[#202020] text-[18px]  rounded-full p-3 px-6 mt-8 ${activeTab === "active" ? "bg-[#EFEFEF] text-[#202020] font-bold" : "text-[#989898] font-normal "}`}
        >
          Active
        </button>
        <button
          
          onClick={() => setActiveTab("removed")}
          className={`  bg-[#202020] hover:bg-[#EFEFEF] hover:text-[#202020] text-[18px]  rounded-full p-3 px-6 mt-8 ${activeTab === "removed" ? "bg-[#EFEFEF] text-[#202020] font-bold" : "text-[#989898] font-normal "}`}
        >
          Removed
        </button>
      </div>
     <UserTable />
    </div>
  )
}

export default Userpage
