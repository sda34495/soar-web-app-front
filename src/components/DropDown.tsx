import React, { useEffect, useState } from "react";
import { getData } from "../utils/axios"; // Adjust the path to your axios utility file
import { useRouter } from "next/navigation";
import endpoints from "@/utils/endpoints";
import { useSelector } from "react-redux";


const DropdownMenu = () => {
  const userData = useSelector((state: any) => state.profileSlice.user);
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("token"); // Delete the token to log out the user
    router.push("/auth/login"); // Redirect to the login page
  };

  const handleSettings = () => {
    router.push("/setting"); // Navigate to the settings page
  };

  return (
    <div className="absolute top-14 right-0 bg-[#1e1e1e] border border-[#454545] rounded-xl shadow-lg py-2 w-64 z-50">
      {userData ? (
        <div className="px-4 py-2 flex flex-col items-center">
          {/* Profile Information */}
          <img
            src={userData.profile_url}
            alt={`${userData.first_name} ${userData?.last_name}`}
            className="h-16 w-16 rounded-full object-cover border-2 border-gray-700"
          />          
          <p className="mt-2 text-sm font-semibold">
            {userData.first_name} {userData?.last_name}
          </p>
          <p className="text-sm text-gray-400">{userData.email}</p>

        </div>
      ) : (
        <div className="px-4 py-2 text-sm text-gray-400">Loading...</div>
      )}

      {/* Action Buttons */}
      <ul className="mt-3 border-t border-[#454545] flex flex-col space-y-1">
        <li
          className="px-4 py-2 hover:bg-custom-gradient-hover cursor-pointer text-center"
          onClick={handleSettings}
        >
          Settings
        </li>
        <li
          className="px-4 py-2 hover:bg-custom-gradient-hover cursor-pointer text-center"
          onClick={handleLogout}
        >
          Logout
        </li>
      </ul>
    </div>
  );
};

export default DropdownMenu;
