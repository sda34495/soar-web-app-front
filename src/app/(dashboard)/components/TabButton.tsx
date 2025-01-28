import React from "react";

const TabButton = ({ label, icon, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full sm:w-[150px] text-[#989898] bg-[#262626] cursor-pointer hover:bg-[#EFEFEF] hover:text-[#202020] rounded-full px-3 py-2 ${
        isActive ? "bg-[#EFEFEF] font-bold text-black" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="flex gap-1">
          {icon}
        </div>
        <label className="text-xl cursor-pointer">{label}</label>
      </div>
    </button>
  );
};


export default TabButton;
