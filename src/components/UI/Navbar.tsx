import React from "react";

// Function to render the Title Section
const TitleSection = () => {
  return (
    <div className="flex flex-col justify-center min-w-[300px] w-full mx-auto lg:w-2/3 mr-8 h-full">
      <div className="bg-gradient-to-b from-[#454545] to-[#3c3c3c] p-[1px] rounded-2xl">
        <div className="flex flex-col bg-[#121212] py-2 rounded-2xl px-4 h-full">
          <h1 className="text-2xl font-bold">Leaderboard</h1>
          <p className="text-sm mt-1 text-gray-400">Total competing users 1,622</p>
        </div>
      </div>
    </div>
  );
};

// Function to render the Actions and Profile Section
const ActionsSection = () => {
  return (
    
    <div className="flex items-center justify-between space-x-5 border  bg-[#121212] border-[#454545] p-3 rounded-2xl lg:w-1/3 h-[58px]">
      {/* Icons */}
      <div className="flex items-center space-x-2">
        <button className="h-10 w-10 bg-gray-800 flex items-center justify-center rounded-xl">
          <img src="/search.svg" alt="" className="w-4 h-4 md:w-6 md:h-6" />
        </button>
        <button className="h-10 w-10 bg-gray-800 flex items-center justify-center rounded-xl">
          <img src="/notification.svg" alt="" className="w-4 h-4 md:w-6 md:h-6" />
        </button>
        <button className="h-10 w-10 bg-gray-800 flex items-center justify-center rounded-xl">
          <img src="/message.svg" alt="" className="w-4 h-4 md:w-6 md:h-6" />
        </button>
      </div>
      {/* User Profile */}
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium">Olivia Rhye</span>

        <div className="relative">
          <img
            src="/avatar.jpeg" // Replace with your avatar image path
            alt="Olivia Rhye"
            className="h-10 w-10 rounded-full object-cover"
          />
          <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-400 rounded-full border-2 border-white"></span>
        </div>
      </div>
    </div>
  );
};

// Main LeaderboardHeader Component
const Navbar = () => {
  return (
    <div className="flex flex-col lg:flex-row space-y-5 lg:space-y-0 lg:justify-between text-white mt-1">
      {/* Render Title Section */}
      <TitleSection />

      {/* Render Actions and Profile Section */}
      <ActionsSection />
    </div>
  );
};

export default Navbar;
