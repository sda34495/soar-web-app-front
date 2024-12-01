import React from "react";
import Sidebar from "../../../components/Sidebar";
import Navbar from "@/components/UI/Navbar";

const MainLayout = ({ children }: any) => {
  return (
    <div className="flex justify-center bg-yellow-900 min-h-screen ">
      <div className="grid md:grid-cols-[1fr,4fr] max-w-screen w-full bg-white shadow-lg">
        {/* Sidebar */}
        <div className="bg-[#121212] hidden z-10 text-white md:flex justify-center overflow-y-auto h-screen sticky top-0 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-700 scrollbar-thumb-rounded">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="bg-[#191919] text-white flex flex-col  h-screen relative">
          {/* Circle with Gradient and Blur */}
          <div className="absolute top-24 right-0 w-[200px] h-[600px] bg-[#f4d494] blur-[150px] rounded-full opacity-40"></div>
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#663A1D] blur-[120px] rounded-full opacity-50"></div>

          <div className="sticky top-0 max-w-6xl z-50 p-4">
            <Navbar />
          </div>

          <div className="flex-1 overflow-y-auto z-10 px-4  ">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
