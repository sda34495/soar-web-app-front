"use client";
import React, { useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";

function Tab_Switch(props: any) {
  const [activeTab, setActiveTab] = useState("Login");

  return (
    <>
      <div className="flex items-center justify-center w-full h-12 mb-5 lg:hidden">
        <div className="flex items-center rounded-full bg-[#2f2f2f] p-1">
          <button
            onClick={() => setActiveTab("Signup")}
            className={`w-24 py-2 text-center  font-semibold rounded-full transition-all ${
              activeTab === "Signup"
                ? "bg-white text-black shadow"
                : "text-gray-400"
            }`}
          >
            Signup
          </button>
          <button
            onClick={() => setActiveTab("Login")}
            className={`w-24 py-2 text-center font-semibold rounded-full transition-all ${
              activeTab === "Login"
                ? "bg-white text-black shadow"
                : "text-gray-400"
            }`}
          >
            Login
          </button>
        </div>
      </div>

      <div className="mt-3">
        {activeTab === "Login" && (
          <div className="flex-1 relative z-20 lg:hidden ">
            <Login />
          </div>
        )}
        {activeTab === "Signup" && (
        {activeTab === "Signup" && (
          <div className=" flex-1 relative z-20 lg:hidden ">
            <SignUp />
          </div>
        )}
      </div>
    </>
  );
    </>
  );
}

export default Tab_Switch;

export default Tab_Switch;
