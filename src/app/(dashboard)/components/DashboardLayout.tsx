// App.js
import React from "react";
import Sidebar from "../../../components/Sidebar";
// import NavBar from './NavBar';
// import Sidebar from './Sidebar';

const MainLayout = ({children}:any) => {
  return (
    <div className="flex justify-center bg-yellow-900 min-h-screen">
      <div className="grid grid-cols-[1fr,4fr] max-w-screen w-full bg-white shadow-lg">

        {/* Sidebar */}
        <div className="bg-black text-white flex  justify-center overflow-y-auto  scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-700 scrollbar-thumb-rounded">
          <Sidebar />
          
        </div>

        {/* Main Content */}
        <div className="bg-gray-800 text-white p-4">
          
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
