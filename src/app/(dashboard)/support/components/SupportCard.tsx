import React from "react";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebook, FaSnapchatGhost } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import { FaYoutube } from "react-icons/fa";


const SupportCard = () => {
  return (
    <div className="flex flex-col flex-grow items-center min-w-[300px] max-w-[420px] space-y-5 mt-5 md:mt-0">
      <div className="p-6 bg-[#121212] rounded-lg border border-[#7c7c7c] w-full ">
        <h3 className="text-xl font-semibold text-[#EFEFEF]">Our location</h3>
        <p className="text-[#BDBDBD] font-[18px] mt-1 max-w-[350px]">
          Street 6, Building 101, Floor 23, Toranto Canada
        </p>
      </div>


      <div className="p-6 bg-[#121212] rounded-lg border border-[#7c7c7c] w-full ">
        <div className="flex flex-col ">
          <hr className="w-[150px] h-[1.5px] border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-45 dark:via-neutral-400" />
          <div className="text-gold font-semibold text-3xl text-transparent bg-clip-text bg-custom-heading-gradient mt-1 mb-1">
            SOAR
          </div>
          <hr className="w-[150px] h-[1.5px] border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-45 dark:via-neutral-400" />
        </div>

        <p className="text-[#BDBDBD] font-[18px] mt-1 max-w-[350px] ">
          "Strive. Overcome. Achieve. Repeat" Daily Check-in & Tracking for your
          health and brain performance.
        </p>
        <div className="flex items-center justify-start space-x-5">
        <FaFacebook  className="text-4xl text-[#A79A81] mt-1 cursor-pointer"/>
        <AiFillInstagram  className="text-[40px] text-[#A79A81] mt-1  cursor-pointer       "/>
        <SiTiktok className="text-4xl text-[#A79A81] mt-1 cursor-pointer"/>
        <FaYoutube className="text-4xl text-[#A79A81] mt-1 cursor-pointer"/>
        <FaSnapchatGhost className="text-4xl text-[#A79A81] mt-1 cursor-pointer"/>
        </div>
      </div>
    </div>
  );
};

export default SupportCard;
