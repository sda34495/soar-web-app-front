import React from "react";
import Sidebar from "../../../components/Sidebar";
import Navbar from "@/components/UI/Navbar";

const MainLayout = ({ children }: any) => {
  return (
    <div className="flex justify-center bg-yellow-900 min-h-screen">
      <div className="grid md:grid-cols-[1fr,4fr] max-w-screen w-full bg-white shadow-lg">
        {/* Sidebar */}
        <div className="bg-black hidden  text-white md:flex justify-center overflow-y-auto h-screen sticky top-0 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-700 scrollbar-thumb-rounded">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="bg-gray-800 text-white flex flex-col h-screen">
          {/* Navbar */}
          <div className="sticky top-0 bg-gray-800 z-10 p-4">
            <Navbar />
          </div>

          {/* Scrollable Children */}
          <div className="flex-1 overflow-y-auto px-4 ">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
