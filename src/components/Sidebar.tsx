"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation"; // Import the navigation hook
import Link from "next/link";
import { navbarActions } from "@/store/navbar-slice";
import { useDispatch } from "react-redux";
import { HiOutlineUserGroup } from "react-icons/hi";



const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("");
  const [usertype, setUserType] = useState<any>(null);
  const pathname = usePathname(); // Hook to get current pathname
  console.log(pathname);
  const dispatch = useDispatch();

  // const user = localStorage.getItem("user");
  // console.log(user);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser !== null) {
      if (storedUser === "admin") {
        setUserType("admin");
      } else if (storedUser === "user") {
        setUserType("user");
      } else {
        setUserType(null);
      }
    }
  }, []);

  // Use effect to set activeItem based on pathname using switch
  useEffect(() => {
    switch (pathname) {
      case "/check-in":
        setActiveItem("Check-in");
        dispatch(navbarActions.updateNavbar({ title: "Welcome Back", description: "Tuesday, 12 Nov 2024 - Wednesday, 13 Nov 2024" }));
        break;
      case "/dashboard":
        setActiveItem("Dashboard");
        dispatch(navbarActions.updateNavbar({ title: "Dashboard", description: "Gain valuable insights to track your progress" }));
        break;

      case "/leaderboard":
        setActiveItem("Leaderboard");
        dispatch(navbarActions.updateNavbar({ title: "Leaderboard", description: "Total competing users 1,622" }));
        break;
      case "/coaching":
        setActiveItem("Coaching");
        dispatch(navbarActions.updateNavbar({ title: "Coaching", description: "Total competing users 1,622" }));
        break;
      case "/setting":
        setActiveItem("Settings");
        dispatch(navbarActions.updateNavbar({ title: "Settings", description: "Customize your app experience and manage your preferences." }));
        break;
      case "/professional-referral":
        setActiveItem("Professional Referral");
        dispatch(navbarActions.updateNavbar({ title: "Professional Referral", description: "Customize your app experience and manage your preferences." }));
        break;
      case "/support":
        setActiveItem("Support");
        dispatch(navbarActions.updateNavbar({ title: "Support", description: "Customize your app experience and manage your preferences." }));
        break;
      case "/community":
        setActiveItem("community");
        dispatch(navbarActions.updateNavbar({ title: "Community", description: "Gain valuable insights to track your progress" }));
        break;
      case "/admin/dashboard":
        setActiveItem("Dashboard");
       dispatch(navbarActions.updateNavbar({ title: "Dashboard", description: "Gain valuable insights to track your progress" }));
        break;
      case "/admin/leaderboard":
        setActiveItem("Leaderboard");
        dispatch(navbarActions.updateNavbar({ title: "Leaderboard", description: "Total competing users 1,622" }));
        break;
      case "/admin/users":
        setActiveItem("users");
        dispatch(navbarActions.updateNavbar({ title: "All Users", description: "Control your users by admin pannels" }));
        break;
      default:
        setActiveItem(""); // Default if no match
        break;
    }
  }, [pathname]);

  return (
    <>
      {usertype === "user" && (
        <aside className="w-64 h-screen text-gray-200 flex flex-col justify-between">
          <div>
            <div className="flex flex-col items-center justify-center mt-5 mb-16">
              <hr className="w-[150px] h-[1.5px] border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-45 dark:via-neutral-400" />
              <div className="text-gold font-semibold text-4xl text-transparent bg-clip-text bg-custom-heading-gradient mt-1 mb-1">
                SOAR
              </div>
              <hr className="w-[150px] h-[1.5px] border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-45 dark:via-neutral-400" />
            </div>
            <ul className=" flex flex-col space-y-1 ">
              {/* Check-in link */}
              <Link href="/check-in">
                <li
                  className={`flex items-center px-1 py-2  cursor-pointer font-semibold  ${
                    activeItem === "Check-in"
                      ? "bg-custom-gradient rounded-xl p-1  text-black font-semibold"
                      : "text-[#BDBDBD] "
                  }`}
                >
                  <img
                    src={
                      activeItem === "Check-in"
                        ? "/sidebar/dark-check-in.svg"
                        : "/sidebar/check-in.svg"
                    }
                    alt="Check-in"
                    className="mr-4"
                  />
                  <p className="">Check-in</p>
                </li>
              </Link>

              {/* Dashboard link */}
              <Link href="/dashboard">
                <li
                  className={`flex items-center px-1 py-2 cursor-pointer font-semibold  ${
                    activeItem === "Dashboard"
                      ? "bg-custom-gradient rounded-xl p-1 text-black font-semibold"
                      : "text-[#BDBDBD]"
                  }`}
                >
                  <img
                    src={
                      activeItem === "Dashboard"
                        ? "/sidebar/dark-dashboard.svg"
                        : "/sidebar/chart.svg"
                    }
                    alt="Dashboard"
                    className="mr-4"
                  />
                  <p>Dashboard</p>
                </li>
              </Link>

              {/* Leaderboard link */}
              <Link href="/leaderboard">
                <li
                  className={`flex items-center px-1 py-2 cursor-pointer font-semibold ${
                    activeItem === "Leaderboard"
                      ? "bg-custom-gradient rounded-xl p-1 text-black font-semibold"
                      : "text-[#BDBDBD]"
                  }`}
                >
                  <img
                    src={
                      activeItem === "Leaderboard"
                        ? "/sidebar/dark-podium.svg"
                        : "/sidebar/chartstar.svg"
                    }
                    alt="Leaderboard"
                    className="mr-4"
                  />
                  <p>Leaderboard</p>
                </li>
              </Link>

              {/* Coaching link */}
              <Link href="/coaching">
                <li
                  className={`flex items-center px-1 py-2 cursor-pointer font-semibold ${
                    activeItem === "Coaching"
                      ? "bg-custom-gradient rounded-xl p-1 text-black font-semibold"
                      : "text-[#BDBDBD]"
                  }`}
                >
                  <img
                    src={
                      activeItem === "Coaching"
                        ? "/sidebar/dark-coaching.svg"
                        : "/sidebar/coaching.svg"
                    }
                    alt="Coaching"
                    className="mr-4"
                  />
                  <p>Coaching</p>
                </li>
              </Link>

              {/* Settings link */}
              <Link href="/setting">
                <li
                  className={`flex items-center px-1 py-2 cursor-pointer font-semibold ${
                    activeItem === "Settings"
                      ? "bg-custom-gradient rounded-xl p-1 text-black font-semibold"
                      : "text-[#BDBDBD]"
                  }`}
                >
                  <img
                    src={
                      activeItem === "Settings"
                        ? "/sidebar/dark-setting.svg"
                        : "/sidebar/setting.svg"
                    }
                    alt="Settings"
                    className="mr-4"
                  />
                  <p>Settings</p>
                </li>
              </Link>

              {/* Professional Referral link */}
              <Link href="/professional-referral">
                <li
                  className={`flex items-center px-1 py-2 cursor-pointer font-semibold ${
                    activeItem === "Professional Referral"
                      ? "bg-custom-gradient rounded-xl p-1 text-black font-semibold"
                      : "text-[#BDBDBD]"
                  }`}
                >
                  <img
                    src={
                      activeItem === "Professional Referral"
                        ? "/sidebar/dark-ref.svg"
                        : "/sidebar/chain.svg"
                    }
                    alt="Professional Referral"
                    className="mr-4"
                  />
                  <p>Professional Referral</p>
                </li>
              </Link>
              <Link href="/community">
                <li
                  className={`flex items-center px-1 py-2 cursor-pointer font-semibold ${
                    activeItem === "community"
                      ? "bg-custom-gradient rounded-xl p-1 text-black font-semibold"
                      : "text-[#BDBDBD]"
                  }`}
                >
                  
                  <HiOutlineUserGroup className={`mr-4  w-5 h-5  ${activeItem === "community" ? "text-black" : "text-[#BDBDBD]"}`}/>
                  <p>Community</p>
                </li>
              </Link>
            </ul>
          </div>

          {/* Support button handled separately */}
          <div className="py-4">
            <div className="mb-6 text-start">
              <Link href="/support">
                <li
                  className={`font-semibold text-start px-1 py-2 rounded-xl  w-full flex items-center ${
                    pathname === "/support"
                      ? "bg-custom-gradient font-semibold text-black  "
                      : " "
                  }`}
                >
                  <img
                    src={
                      pathname === "/support"
                        ? "/sidebar/dark-support.svg"
                        : "/sidebar/support.svg"
                    }
                    alt="Support"
                    className="mr-4"
                  />
                  Support
                </li>
              </Link>
            </div>
            <div className=" rounded-2xl overflow-hidden p-[1px]  bg-gradient-to-br from-[#c784269b] to-[#3d3e3d] ">
              <div className="bg-black/80 rounded-2xl">
                <div className=" h-full py-4 rounded-2xl px-5 bg-custom-card-gradient ">
                  <div className="text-[#EFEFEF] font-bold font-Bricolage-Grotesque text-3xl">
                    2nd
                  </div>
                  <div className=" text-[#BDBDBD] font-semibold ">
                    Your Position
                  </div>
                  <p className="text-[#7C7C7C] text-sm mt-4 ">
                    Complete the check-in and increase your points to get a
                    better position
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      )}
      {usertype === "admin" && (
        <aside className="w-64 h-screen text-gray-200 flex flex-col justify-between">
          <div>
            <div className="flex flex-col items-center justify-center mt-5 mb-16">
              <hr className="w-[150px] h-[1.5px] border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-45 dark:via-neutral-400" />
              <div className="text-gold font-semibold text-4xl text-transparent bg-clip-text bg-custom-heading-gradient mt-1 mb-1">
                SOAR
              </div>
              <hr className="w-[150px] h-[1.5px] border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-45 dark:via-neutral-400" />
            </div>
            <ul className=" flex flex-col space-y-1 ">
              {/* Dashboard link */}
              <Link href="/admin/dashboard">
                <li
                  className={`flex items-center px-1 py-2 cursor-pointer font-semibold  ${
                    activeItem === "Dashboard"
                      ? "bg-custom-gradient rounded-xl p-1 text-black font-semibold"
                      : "text-[#BDBDBD]"
                  }`}
                >
                  <img
                    src={
                      activeItem === "Dashboard"
                        ? "/sidebar/dark-dashboard.svg"
                        : "/sidebar/chart.svg"
                    }
                    alt="Dashboard"
                    className="mr-4"
                  />
                  <p>Dashboard</p>
                </li>
              </Link>
              <Link href="/admin/users">
                <li
                  className={`flex items-center px-1 py-2 cursor-pointer font-semibold  ${
                    activeItem === "users"
                      ? "bg-custom-gradient rounded-xl p-1 text-black font-semibold"
                      : "text-[#BDBDBD]"
                  }`}
                >
                  <img
                    src={
                      activeItem === "users"
                        ? "/sidebar/user-dark.svg"
                        : "/sidebar/user.svg"
                    }
                    alt="Dashboard"
                    className="mr-4"
                  />
                  <p>All Users</p>
                </li>
              </Link>

              {/* Leaderboard link */}
              <Link href="/admin/leaderboard">
                <li
                  className={`flex items-center px-1 py-2 cursor-pointer font-semibold ${
                    activeItem === "Leaderboard"
                      ? "bg-custom-gradient rounded-xl p-1 text-black font-semibold"
                      : "text-[#BDBDBD]"
                  }`}
                >
                  <img
                    src={
                      activeItem === "Leaderboard"
                        ? "/sidebar/dark-podium.svg"
                        : "/sidebar/chartstar.svg"
                    }
                    alt="Leaderboard"
                    className="mr-4"
                  />
                  <p>Leaderboard</p>
                </li>
              </Link>
            </ul>
          </div>
        </aside>
      )}
    </>
  );
};

export default Sidebar;
