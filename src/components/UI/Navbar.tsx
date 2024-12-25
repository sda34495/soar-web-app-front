"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import DropdownMenu from "../DropDown";
import { usePathname, useRouter } from "next/navigation";
import UploadPostHandel from "@/app/(dashboard)/community/component/UploadPostHandel";
import NotificationDropdown from "../NotificationDropDown";
import Link from "next/link";
import TestSideBar from "../SmallSideBar";
import SmallSideBar from "../SmallSideBar";

const TitleSection = () => {
  const navdetails = useSelector((state: any) => state.navbarSlice);
  const posts = useSelector((state: any) => state.postSlice.posts);
  const pathname = usePathname();


  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

    

  return (
    <div className="flex flex-col justify-between min-w-[300px] w-full mx-auto lg:w-2/3 mr-8 h-full">
      <div className="bg-gradient-to-b from-[#454545] to-[#3c3c3c] p-[1px] rounded-2xl">
        <div className="flex items-center justify-between bg-[#121212] py-2 rounded-2xl px-4 h-full">
          <div>
            <h1 className="text-2xl font-bold">{navdetails.title}</h1>
            <p className="text-sm mt-1 text-gray-400">
              {navdetails.description}
            </p>
          </div>
          {pathname === "/community" && posts?.length > 0 && (
            <UploadPostHandel />
          )}
          <div className="relative">
      {/* SVG Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="size-6 md:hidden block cursor-pointer"
        onClick={toggleSidebar} // Toggle the sidebar visibility
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 9h16.5m-16.5 6.75h16.5"
        />
      </svg>

      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="fixed top-0 left-0 w-64 h-screen z-50">
          <SmallSideBar/>
         </div>
      )}
    </div>
        </div>
      </div>
    </div>
  );
};

const ActionsSection = () => {
  // console.log("profiledetails", profiledetails);

  const router = useRouter();
  const profiledetails = useSelector((state: any) => state.profileSlice);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [showAllResults, setShowAllResults] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  // Getting all user data from user profile slice
  const userData = useSelector((state: any) => state.profileSlice.user);

  const toggleNotificationDropdown = () => {
    setIsNotificationOpen((prev) => !prev);
  };
  const searchBarRef = useRef<HTMLDivElement>(null);

  const pages = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Leaderboard", path: "/leaderboard" },
    { name: "Professional", path: "/professional-referral" },
    { name: "Setting", path: "/setting" },
    { name: "Support", path: "/support" },
    { name: "Talk to Doctor", path: "/talktodoctor" },
    { name: "Coaching", path: "/coaching" },
    { name: "Community", path: "/community" },
    { name: "About Us", path: "/about" },
  ];

  const filteredPages = pages.filter((page) =>
    page.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchInput(event.target.value);
    setShowAllResults(false); // Reset "Show More" when input changes
  };

  const handlePageRedirect = (path: string) => {
    router.push(path);
    setIsSearchBarVisible(false);
    setSearchInput("");
  };

  const handleToggleSearchBar = () => {
    setIsSearchBarVisible((prev) => !prev);
    setSearchInput("");
    setShowAllResults(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target as Node)
      ) {
        setIsSearchBarVisible(false);
      }
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
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative flex items-center justify-between space-x-5 border bg-[#121212] border-[#454545] p-3 rounded-2xl lg:w-1/3 h-[58px]">
      <div className="flex items-center space-x-2">
        <button
          className="h-10 w-10 bg-gray-800 flex items-center justify-center rounded-xl"
          onClick={handleToggleSearchBar}
        >
          <img
            src="/search.svg"
            alt="Search"
            className="w-4 h-4 md:w-6 md:h-6"
          />
        </button>

        {isSearchBarVisible && (
          <div className="absolute top-full mt-2 left-0 right-0 mx-auto max-w-md z-50">
            <div
              ref={searchBarRef}
              className="border border-zinc-800 rounded-lg shadow-lg p-3 w-full"
            >
              <input
                type="text"
                value={searchInput}
                onChange={handleSearchInputChange}
                placeholder="Search..."
                className="w-full p-2 rounded-md bg-[#121212] text-white border border-zinc-800 focus:outline-none focus:ring-2 focus:ring-white"
              />
              {filteredPages.length > 0 && (
                <ul className="mt-2 bg-[#121212] rounded-lg shadow-md">
                  {(showAllResults
                    ? filteredPages
                    : filteredPages.slice(0, 3)
                  ).map((page) => (
                    <li
                      key={page.name}
                      className="p-2 text-white hover:bg-custom-gradient hover:font-semi-bold hover:text-black cursor-pointer"
                      onClick={() => handlePageRedirect(page.path)}
                    >
                      {page.name}
                    </li>
                  ))}
                  {!showAllResults && filteredPages.length > 3 && (
                    <li
                      className="p-2 text-center text-gray-400 hover:text-white cursor-pointer"
                      onClick={() => setShowAllResults(true)}
                    >
                      Show More
                    </li>
                  )}
                </ul>
              )}
              {filteredPages.length === 0 && searchInput && (
                <p className="mt-2 text-gray-400 text-sm">No results found</p>
              )}
            </div>
          </div>
        )}

        <div className="relative">
          {/* Button for Notification Icon */}
          <div ref={notificationRef} className="dropdown-menu">
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
          </div>

          {/* Conditional Rendering of Notification Dropdown */}
          {isNotificationOpen && <NotificationDropdown />}
        </div>

        <Link
          href="/community"
          className="h-10 w-10 bg-gray-800 flex items-center justify-center rounded-xl"
        >
          <img
            src="/message.svg"
            alt="Message Icon"
            className="w-4 h-4 md:w-6 md:h-6"
          />
        </Link>
      </div>

      <div className="relative">
        <div ref={dropdownRef} className="dropdown-menu">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
          >
            <span className="text-sm font-medium">
              {profiledetails.first_name} {profiledetails.last_name}
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
        </div>
        {/* Render the DropdownMenu component conditionally and this will close when click outside */}
        {isDropdownOpen && <DropdownMenu />}
      </div>
    </div>
  );
};

const Navbar = () => {
  return (
    <div className="flex flex-col lg:flex-row space-y-5 lg:space-y-0 lg:justify-between text-white mt-1 relative">
      <TitleSection />
      <ActionsSection />
    </div>
  );
};

export default Navbar;
