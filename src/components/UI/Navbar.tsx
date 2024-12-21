"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import DropdownMenu from "../DropDown";
import { getData } from "@/utils/axios";
import endpoints from "@/utils/endpoints";
import store from "@/store/store";
import { usePathname } from "next/navigation";
import UploadPostHandel from "@/app/(dashboard)/community/component/UploadPostHandel";
import NotificationDropdown from "../NotificationDropDown";

// Function to render the Title Section
const TitleSection = () => {
  const navdetails = useSelector((state: any) => state.navbarSlice);
  const posts = useSelector((state: any) => state.postSlice.posts);

  const pathname = usePathname();
  return (
    <div className="flex flex-col justify-center min-w-[300px] w-full mx-auto lg:w-2/3 mr-8 h-full">
      <div className="bg-gradient-to-b from-[#454545] to-[#050404] p-[1px] rounded-2xl">
        <div className="flex items-center justify-between bg-[#121212] py-2 rounded-2xl px-4 h-full">
          <div className="">
            <h1 className="text-2xl font-bold">{navdetails.title}</h1>
            <p className="text-sm mt-1 text-gray-400">
              {navdetails.description}
            </p>
          </div>
          {pathname === "/community" && posts?.length > 0 ? (
            <UploadPostHandel />
          ) : (
            ""
          )}
          {/* <div className="">testg</div> */}
        </div>
      </div>
    </div>
  );
};

// Function to render the Actions and Profile Section
const ActionsSection = () => {
  // console.log("profiledetails", profiledetails);
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false); // Add state for notification dropdown
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  // Getting all user data from user profile slice
  const userData = useSelector((state: any) => state.profileSlice.user);
  
  const toggleNotificationDropdown = () => {
    setIsNotificationOpen((prev) => !prev);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev); // Toggle the dropdown state
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setIsNotificationOpen(false); // Close notification dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center justify-between space-x-5 border  bg-[#121212] border-[#454545] p-3 rounded-2xl lg:w-1/3 h-[58px]">
      {/* Icons */}
      <div className="flex items-center space-x-2">
        <button className="h-10 w-10 bg-gray-800 flex items-center justify-center rounded-xl">
          <img src="/search.svg" alt="" className="w-4 h-4 md:w-6 md:h-6" />
        </button>

        <div className="relative">
          {/* Button for Notification Icon */}
          <button
            className="h-10 w-10 bg-gray-800 flex items-center justify-center rounded-xl"
            onClick={toggleNotificationDropdown} // onClick handler for toggling the dropdown
          >
            <img
              src="/notification.svg"
              alt="Notification Icon"
              className="w-4 h-4 md:w-6 md:h-6"
            />
          </button>

          {/* Conditional Rendering of Notification Dropdown */}
          {isNotificationOpen && (
            <div ref={notificationRef} className="dropdown-menu">
              <NotificationDropdown />
            </div>
          )}
        </div>

        <button className="h-10 w-10 bg-gray-800 flex items-center justify-center rounded-xl">
          <img src="/message.svg" alt="" className="w-4 h-4 md:w-6 md:h-6" />
        </button>
      </div>
      {/* User Profile */}
      <div className="relative">
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={toggleDropdown}
        >
          <span className="text-sm font-medium">
            {" "}
            {userData.first_name} {userData.last_name}{" "}
          </span>
          <div className="relative">
            <img
              src={userData.profile_url || "/avatar.jpeg"}
              alt={`${userData.first_name} ${userData.last_name}`}
              className="h-10 w-10 rounded-full object-cover"
            />
            <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-400 rounded-full border-2 border-white"></span>
          </div>
        </div>
        {/* Render the DropdownMenu component conditionally and this will close when click outside */}
        {isDropdownOpen && (
          <div ref={dropdownRef} className="dropdown-menu">
            <DropdownMenu />
          </div>
        )}
      </div>
    </div>
  );
};

// Main LeaderboardHeader Component
const Navbar = () => {
  return (
    <div className="flex flex-col lg:flex-row space-y-5 lg:space-y-0 lg:justify-between text-white mt-1 ">
      {/* Render Title Section */}
      <TitleSection />

      {/* Render Actions and Profile Section */}
      <ActionsSection />
    </div>
  );
};

export default Navbar;
