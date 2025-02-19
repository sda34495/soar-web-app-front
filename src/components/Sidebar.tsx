"use client";
import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation"; // Import the navigation hook
import Link from "next/link";
import { navbarActions } from "@/store/navbar-slice";
import { endLoadingAction } from "@/store/loader-slice";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineUserGroup } from "react-icons/hi";
import { Router } from "next/router";
import LoadingBar from "react-top-loading-bar";
import { MdHealthAndSafety } from "react-icons/md";
import { getData } from "@/utils/axios";
import endpoints from "@/utils/endpoints";
import toast from "react-hot-toast";
import { profileActions } from "@/store/profile-slice";
import Image from "next/image";

const Sidebar = () => {
  const [userRank, setUserRank] = useState(null);
  const [userLevel, setuserLevel] = useState(null);
  const [levelData, setLevelData] = useState({image:"",title:""});// Add state to store user rank


  const [activeItem, setActiveItem] = useState("");
  const [usertype, setUserType] = useState<any>(null);
  const [totalUsers, setTotalUser] = useState<any>(null);
  const pathname = usePathname(); // Hook to get current pathname
  // console.log(pathnames);
  const dispatch = useDispatch();

  const router = useRouter();

  let userdata = {};

  const fetchData = async () => {
    try {
      const response = await getData(endpoints.GET_PROFILE_DETAILS);
    
      
      if (response?.data?.success) {
        // if (!response?.data?.data.is_subscribed) {
        //   router.push("/onboard/onboarding");
        //   return;
        // }
        dispatch(
          profileActions.updateUserProfile({ data: response.data.data})
        );
        
        setUserRank(response.data.data.rank)
        setuserLevel(response.data.data.level);

        
        
      } else {
        toast.error("Failed to load user data.");
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
      toast.error("An error occurred while fetching user data.");
    }
  };

  useEffect(() => {
    fetchData();
    
    const storedUser = localStorage.getItem("user");

    if (storedUser !== null) {
      if (storedUser === "admin") {
        setUserType("admin");
      } else if (storedUser === "user") {
        setUserType("user");
      }
    } else {
      router.push("/");
    }
   
    
  }, []);

  useEffect(() => {
    const levelImages = {
      1: "/medal.png",
      2: "/Novice.png",
      3: "/Adept.png",
      4: "/Challenger.png",
      5: "/Prodigy.png",
      6: "/Expert.png",
      7: "/Veteran.png",
      8: "/master.png",
      9: "/Elite.png",
      10: "/Ascendent.png",
      // default:"/medal.png",
    };
    const title = {
      1: "Initiate",
      2: "Novice",
      3: "Adept",
      4: "Challenger",
      5: "Prodigy",
      6: "Expert",
      7: "Veteran",
      8: "master",
      9: "Elite",
      10: "Ascendent",
      // default:"Initiate",
    }
    const levelData = () => {
      return { image: levelImages[userLevel]  , title: title[userLevel]  };
    };
    
    setLevelData(levelData());
// console.log("Your Level",userLevel)    
},[userLevel])

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const res = await getData(endpoints.GET_TOTAL_USERS);
        if (res?.data?.success) {
         dispatch(profileActions.updateUserProfile({ data: res.data.data})) 
          setTotalUser(res.data.data);
          // console.log("Data",res?.data?.data)
        } else {
          console.error("Failed to fetch total users.");
        }
      } catch (error) {
        console.error("Error fetching total users.", error);
      }
    };
    
    fetchTotalUsers();
  }, []);

  
  // Use effect to set activeItem based on pathname using switch
  useEffect(() => {
    const getFormattedDate = (date: Date) => {
      return new Intl.DateTimeFormat("en-US", {
        weekday: "long", // Full day name (e.g., "Tuesday")
        day: "2-digit", // Day (e.g., "12")
        month: "short", // Abbreviated month (e.g., "Nov")
        year: "numeric", // Year (e.g., "2024")
      }).format(date);
    };
  
  
   
    // Today's date
    const today = new Date();
    const formattedToday = getFormattedDate(today);

    // Tomorrow's date
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1); // Increment day by 1
    const formattedTomorrow = getFormattedDate(tomorrow);

    // Combine dates into the desired string
    const dateRangeString = `${formattedToday} - ${formattedTomorrow}`;
   
    switch (pathname) {
      case "/check-in":
        setActiveItem("Check-in");
        dispatch(
          navbarActions.updateNavbar({
            title: "Welcome Back",
            description: dateRangeString,
          })
        );

        break;

      case "/dashboard":
        setActiveItem("Dashboard");
        dispatch(
          navbarActions.updateNavbar({
            title: "Dashboard",
            description: "Gain valuable insights to track your progress",
          })
        );

        break;

      case "/leaderboard":
        setActiveItem("Leaderboard");
        dispatch(
          navbarActions.updateNavbar({
            title: "Leaderboard",
            description: `Total competing users ${totalUsers}` ,
          })
        );

        break;
      case "/coaching":
        setActiveItem("Coaching");
        dispatch(
          navbarActions.updateNavbar({
            title: "Coaching",
            description: `Total competing users ${totalUsers}` ,
          })
        );

        break;

      case "/talktodoctor":
        setActiveItem("Talk to Doctor");
        dispatch(
          navbarActions.updateNavbar({
            title: "Talk to Doctor",
            description: "Reach out to a doctor now for personalized support.",
          })
        );

        break;

        case "/editgoal":
        setActiveItem("Edit your Goal");
        dispatch(
          navbarActions.updateNavbar({
            title: "Edit your Goal",
            description: "Update your goal to stay on track.",
          })
        );

        break;

      case "/setting":
        setActiveItem("Settings");
        dispatch(
          navbarActions.updateNavbar({
            title: "Settings",
            description:
              "Customize your app experience and manage your preferences.",
          })
        );
        break;
      case "/professional-referral":
        setActiveItem("Professional Referral");
        dispatch(
          navbarActions.updateNavbar({
            title: "Professional Referral",
            description:
              "Customize your app experience and manage your preferences.",
          })
        );
        break;
      case "/support":
        setActiveItem("Support");
        dispatch(
          navbarActions.updateNavbar({
            title: "Support",
            description:
              "Customize your app experience and manage your preferences.",
          })
        );
        break;
      case "/community":
        setActiveItem("community");
        dispatch(
          navbarActions.updateNavbar({
            title: "Community",
            description: "Gain valuable insights to track your progress",
          })
        );
        break;
      case "/admin/dashboard":
        setActiveItem("Dashboard");
        dispatch(
          navbarActions.updateNavbar({
            title: "Dashboard",
            description: "Gain valuable insights to track your progress",
          })
        );
        break;
      case "/admin/leaderboard":
        setActiveItem("Leaderboard");
        dispatch(
          navbarActions.updateNavbar({
            title: "Leaderboard",
            description: "Total competing users 1,622",
          })
        );
        break;
      case "/admin/users":
        setActiveItem("users");
        dispatch(
          navbarActions.updateNavbar({
            title: "All Users",
            description: "Control your users by admin pannels",
          })
        );
        break;
        case "/community/post/[id]":
          dispatch(
            navbarActions.updateNavbar({
              title: "Detail Post",
              description: "Your Post",
            })
          );
          break;
        case "/admin/coupon":
        setActiveItem("Coupon");
        dispatch(
          navbarActions.updateNavbar({
            title: "Coupon",
            description: "Add coupon for users",
          })
        );
        break;
      default:
        setActiveItem(""); // Default if no match
        break;
    }
  }, [pathname,totalUsers]);

  const lodervalue = useSelector((state: any) => state.loaderSlice.isLoading);
  // console.log(lodervalue);

  const updateloader = (targetItem: string) => {
    if (activeItem !== targetItem) {
      dispatch(endLoadingAction.endLoading(10));
    }
  };
 

  return (
    <>
      <LoadingBar
        color="#f11946"
        progress={lodervalue}
        shadow={true}
        loaderSpeed={500}
        onLoaderFinished={() => dispatch(endLoadingAction.endLoading(0))}
        transitionTime={600}
      />
      {usertype === "user" && (
        <aside className="w-64 h-screen hidden text-gray-200 lg:flex flex-col justify-between">
          <div>
            <div className="flex flex-col items-center justify-center mt-5 mb-16">
              <hr className="w-[150px] h-[1.5px] border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-45 dark:via-neutral-400" />
              <div className="text-gold font-semibold text-4xl text-transparent bg-clip-text bg-custom-heading-gradient mt-1 mb-1">
                SOAR
              </div>
              <hr className="w-[150px] h-[1.5px] border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-45 dark:via-neutral-400" />
            </div>
            <ul className=" flex flex-col space-y-2 lg:space-y-1 ">
              {/* Check-in link */}
              <button onClick={() => updateloader("Check-in")}>
                <Link href="/check-in">
                  <li
                    className={`flex items-center px-1 py-2  cursor-pointer font-semibold  ${
                      activeItem === "Check-in"
                        ? "bg-custom-gradient lg:rounded-xl p-1  text-black font-semibold"
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
              </button>

              {/* Dashboard link */}
              <button onClick={() => updateloader("Dashboard")}>
                <Link href="/dashboard">
                  <li
                    className={`flex items-center px-1 py-2 cursor-pointer font-semibold  ${
                      activeItem === "Dashboard"
                        ? "bg-custom-gradient lg:rounded-xl p-1 text-black font-semibold"
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
              </button>

              {/* Leaderboard link */}
              <button onClick={() => updateloader("Leaderboard")}>
                <Link href="/leaderboard">
                  <li
                    className={`flex items-center px-1 py-2 cursor-pointer font-semibold ${
                      activeItem === "Leaderboard"
                        ? "bg-custom-gradient lg:rounded-xl p-1 text-black font-semibold"
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
              </button>

              {/* Coaching link */}
              <button onClick={() => updateloader("Coaching")}>
                <Link href="/coaching">
                  <li
                    className={`flex items-center px-1 py-2 cursor-pointer font-semibold ${
                      activeItem === "Coaching"
                        ? "bg-custom-gradient lg:rounded-xl p-1 text-black font-semibold"
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
              </button>

              <button onClick={() => updateloader("Talk to Doctor")}>
                <Link href="/talktodoctor">
                  <li
                    className={`flex items-center px-1 py-2 cursor-pointer font-semibold ${
                      activeItem === "Talk to Doctor"
                        ? "bg-custom-gradient lg:rounded-xl p-1 text-black font-semibold"
                        : "text-[#BDBDBD]"
                    }`}
                  >
                    <img
                      src={
                        activeItem === "Talk to Doctor"
                          ? "/sidebar/health-dark.svg"
                          : "/sidebar/health.svg"
                      }
                      alt="Talk to doc"
                      className="mr-4"
                    />
                    <p>Talk to Doctor</p>
                  </li>
                </Link>
              </button>


              <button onClick={() => updateloader("Edit your Goal")}>
                <Link href="/editgoal">
                  <li
                    className={`flex items-center px-1 py-2 cursor-pointer font-semibold ${
                      activeItem === "Edit your Goal"
                        ? "bg-custom-gradient lg:rounded-xl p-1 text-black font-semibold"
                        : "text-[#BDBDBD]"
                    }`}
                  >
                    <img
                      src={
                        activeItem === "Edit your Goal"
                          ? "/sidebar/darkgoal.svg"
                          : "/sidebar/goal.svg"
                      }
                      alt="Edit your goal"
                      className="mr-4"
                    />
                    <p>Edit your Goal</p>
                  </li>
                </Link>
              </button>

              <button onClick={() => updateloader("Settings")}>
                {/* Settings link */}
                <Link href="/setting">
                  <li
                    className={`flex items-center px-1 py-2 cursor-pointer font-semibold ${
                      activeItem === "Settings"
                        ? "bg-custom-gradient lg:rounded-xl p-1 text-black font-semibold"
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
              </button>

              {/* Professional Referral link */}
              <button onClick={() => updateloader("Professional Referral")}>
                <Link href="/professional-referral">
                  <li
                    className={`flex items-center px-1 py-2 cursor-pointer font-semibold ${
                      activeItem === "Professional Referral"
                        ? "bg-custom-gradient lg:rounded-xl p-1 text-black font-semibold"
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
                      className="mr-4 "
                    />
                    <p>Refer a Friend</p>
                  </li>
                </Link>
              </button>

              <button onClick={() => updateloader("community")}>
                <Link href="/community">
                  <li
                    className={`flex items-center px-1 py-2 cursor-pointer font-semibold ${
                      activeItem === "community"
                        ? "bg-custom-gradient lg:rounded-xl p-1 text-black font-semibold"
                        : "text-[#BDBDBD]"
                    }`}
                  >
                    <HiOutlineUserGroup
                      className={`mr-4  w-5 h-5  ${
                        activeItem === "community"
                          ? "text-black"
                          : "text-[#BDBDBD]"
                      }`}
                    />
                    <p>Community</p>
                  </li>
                </Link>
              </button>
            </ul>
          </div>

          <div className="py-4">
            <div className="mb-6 flex items-center text-start">
              <button
                onClick={() => updateloader("Support")}
                className="w-full" // Make the button span the full width
              >
                <Link href="/support">
                  <li
                    className={`font-semibold text-start px-1 py-2 lg:rounded-xl flex items-center ${
                      pathname === "/support"
                        ? "bg-custom-gradient font-semibold text-black w-full" // Full width when selected
                        : "w-full" // Ensures full width for non-selected too
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
              </button>
            </div>
            <div className=" rounded-2xl overflow-hidden p-[1px]  bg-gradient-to-br from-[#c784269b] to-[#3d3e3d] ">
              <div className="bg-black/80 rounded-2xl">
                <div className=" h-full py-4 rounded-2xl px-5 bg-custom-card-gradient ">
                  <div className="  flex items-center justify-between text-[#EFEFEF] font-bold font-Bricolage-Grotesque text-3xl">
                    {userRank}
                    <div className="flex  flex-col">
                      <Image src={levelData?.image} alt={userLevel} height={40} width={40} /> 
                      <span className="text-xs text-zinc-300">{levelData?.title}</span>
                    </div>
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
              <button onClick={() => updateloader("Dashboard")}>
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
              </button>

              <button onClick={() => updateloader("users")}>
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
              </button>

              {/* Leaderboard link */}

              <button onClick={() => updateloader("Leaderboard")}>
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
              </button>

                {/* Coupon Link */}

                <button onClick={() => updateloader("Coupon")}>
                <Link href="/admin/coupon">
                  <li
                    className={`flex items-center px-1 py-2 cursor-pointer font-semibold ${
                      activeItem === "Coupon"
                        ? "bg-custom-gradient rounded-xl p-1 text-black font-semibold"
                        : "text-[#BDBDBD]"
                    }`}
                  >
                    <img
                      src={
                        activeItem === "Coupon"
                          ? "/sidebar/dark_coupon.svg"
                          : "/sidebar/coupon.svg"
                      }
                      alt="Coupon"
                      className="mr-4"
                    />
                    <p>Add Coupon </p>
                  </li>
                </Link>
              </button>


            </ul>
          </div>
        </aside>
      )}
    </>
  );
};

export default React.memo(Sidebar);
