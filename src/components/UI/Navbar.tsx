"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import DropdownMenu from "../DropDown";
import { getData } from "@/utils/axios";
import endpoints from "@/utils/endpoints";

// Function to render the Title Section
const TitleSection = () => {
  const navdetails = useSelector((state: any) => state.navbarSlice);
  return (
    <div className="flex flex-col justify-center min-w-[300px] w-full mx-auto lg:w-2/3 mr-8 h-full">
      <div className="bg-gradient-to-b from-[#454545] to-[#3c3c3c] p-[1px] rounded-2xl">
        <div className="flex flex-col bg-[#121212] py-2 rounded-2xl px-4 h-full">
          <h1 className="text-2xl font-bold">{navdetails.title}</h1>
          <p className="text-sm mt-1 text-gray-400">{navdetails.description}</p>
        </div>
      </div>
    </div>
  );
};

// Function to render the Actions and Profile Section
const ActionsSection = () => {
  const profiledetails = useSelector((state: any) => state.profileSlice);
  console.log('this is navbar', profiledetails);



  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    profile_url: "",
  });

  useEffect(() => {
    // This will run every time the profiledetails changes
    console.log("Profile details updated:", profiledetails);
  
    // Update the userData state with new profile details
    setUserData((prevState) => ({
      ...prevState,
      profile_url: profiledetails.profile_url || "/avatar.jpeg",
    }));
  }, [profiledetails]);

  useEffect(() => {
    // Fetch profile data on mount
    const fetchProfileData = async () => {
      try {
        const response = await getData(endpoints.GET_PROFILE_DETAIL);
        const { first_name, last_name, profile_url } = response.data.data;
        setUserData({ first_name, last_name, profile_url });
      } catch (error) {
        console.log("Failed to fetch profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  useEffect(() => {
    // This will run every time the `profiledetails` changes
    console.log("Profile details updated:", profiledetails);

    // You can perform any other logic you want here, like updating local state or triggering other side effects
  }, [profiledetails]);

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
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener
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
        <button className="h-10 w-10 bg-gray-800 flex items-center justify-center rounded-xl">
          <img
            src="/notification.svg"
            alt=""
            className="w-4 h-4 md:w-6 md:h-6"
          />
        </button>
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
              src={profiledetails.profile_url || "/avatar.jpeg"}
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
