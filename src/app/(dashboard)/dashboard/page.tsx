"use client";
import ProgressBar from "@/components/UI/ProgressBar";
import DashboardLayout from "../components/DashboardLayout";
import DashboardCard from "@/components/UI/DashboardCard";
import CustomChart from "@/components/UI/BarChart";
import LeaderboardCard from "@/components/UI/LeaderboardCard";
import LoadingBar from "react-top-loading-bar";
import { getData } from "@/utils/axios";
import { useEffect, useState } from "react";
import endpoints from "@/utils/endpoints";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
// import SidebarLoading from "@/Hook/SidebarLoading";
import useSidebarLoading from "@/Hook/SidebarLoading";

interface dashboard {
  chartData: [];
  leaderboardUsers: [];
  stats: [];
}

const DashboardPage = () => {
  const [dashboardData, setDashboardData] = useState<dashboard>(); // State to store dashboard data
  const [loading, setLoading] = useState(false); // State to handle loading indicator
  const [error, setError] = useState(null); // State to handle errors
  const [activityType, setActivityType] = useState("sobriety");
  const [filterType, setFilterType] = useState("thisMonth");

  const fetchDashboardData = async (activity, filter) => {
    try {
      const response = await getData(
        `${endpoints.GET_DASHBOARD_DATA}?activity_type=${activity}&filter_type=${filter}`
        // "dashboard/details?activity_type=finance&filter_type=thisMonth"
      );
      return response.data; // Directly return the data
    } catch (err) {
      console.log("Error fetching dashboard data:", err);
      throw err; // Re-throw the error to handle it in the caller
    }
  };

  const updateFilterType = (type) => {
    setFilterType(type);
  };

  const updateActivityType = (type) => {
    setActivityType(type);
  };

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true); // Start loading
        const response = await fetchDashboardData(activityType, filterType); // Fetch the data
        setDashboardData(response.data); // Set the data
        // console.log(response.data);
      } catch (err) {
        setError("Failed to load dashboard data. Please try again."); // Set error message
      } finally {
        setLoading(false); // End loading
      }
    };

    loadDashboardData(); // Call the data-loading function
  }, [filterType, activityType]); // Empty dependency array to run once on component mount

  // useEffect(() => {
  //   // console.log("activityType", activityType);
  //   // console.log("filterType", filterType);
  // }, [updateFilterType, activityType]);

  // const progress = 80;
  const cardData = [
    {
      title: "Fitness",
      time: "3 hr 55 min",
      points: 25,
      progressColor: "#22c55e", // Tailwind green-500
      progressWidth: 40, // Represents 40% progress
    },
    {
      title: "Finance",
      time: "6 hr 12 min",
      points: 12,
      progressColor: "#ef4444", // Tailwind red-500
      progressWidth: 20, // Represents 20% progress
    },
    {
      title: "No-substance",
      time: "23 d 15 hr 51 min",
      points: 70,
      progressColor: "#22c55e", // Tailwind green-500
      progressWidth: 80, // Represents 80% progress
    },
  ];

  const points = 70;

  const leaderboardData = [
    {
      position: "1st",
      username: "marshmellow",
      points: 1280,
      league: "1988 / 2000",
      competition: "89 / 100",
      avatar: "/avatar.jpeg",
      color: {
        card1: "bg-gradient-to-br from-[#09DE7A] to-[#525552]",
        card2: "bg-[#1e261e]",
      },
    },
    {
      position: "2nd",
      username: "oliviarhye",
      points: 1260,
      league: "1988 / 2000",
      competition: "89 / 100",
      avatar: "/avatar.jpeg",
      color: {
        card1: "bg-gradient-to-br from-[#c784269b] to-[#3d3e3d]",
        card2: "bg-custom-card-gradient",
      },
    },
    {
      position: "3rd",
      username: "marshmellow",
      points: 1240,
      league: "1988 / 2000",
      competition: "89 / 100",
      avatar: "/avatar.jpeg",
      color: {
        card1: "bg-gradient-to-br from-[#438ff2eb] to-[#08274c]",
        card2: "bg-[#1e2d3f7c]",
      },
    },
  ];

  useSidebarLoading();

  return (
    // <div className="text-white ">
    //   <div className="  flex justify-start  w-full mb-5 items-center">
    //     <div className=" flex flex-wrap gap-4 w-full  grow  ">
    //       {dashboardData &&
    //         dashboardData?.stats.map((data:any, index) => (
    //           <div className="flex-1" key={index}>
    //             <DashboardCard
    //               title={data?.name}
    //               time={data?.minutes}
    //               points={points}
    //               progressWidth={points}
    //             />
    //           </div>
    //         ))}
    //     </div>
    //   </div>

    //   <div className="my-3 ">
    //     {dashboardData && (
    //       <CustomChart
    //         user="user"
    //         data={dashboardData}
    //         updateActivity={updateActivityType}
    //         updateFilter={updateFilterType}
    //       />
    //     )}
    //   </div>

    //   <div className="  flex justify-start  w-full mb-5 items-center">
    //     <div className="flex flex-wrap gap-4 w-full  grow">
    //       {dashboardData &&
    //         dashboardData?.leaderboardUsers.map((item:any, index) => {
    //           const color = leaderboardData[index]?.color; // Get color based on index
    //           const league = leaderboardData[index]?.league ||"1988 / 2000";
    //           const points = leaderboardData[index]?.points || 1280;
    //           const competition = leaderboardData[index]?.competition || "89 / 100";
    //           const avatar = leaderboardData[index]?.avatar || "/avatar.jpeg";
    //           // const competition = "89 / 100";
    //           // const avatar = "/avatar.jpeg";

    //           return (
    //             <div className="flex-1" key={index}>
    //               <LeaderboardCard
    //                 position={item.rank}
    //                 username={item.first_name}
    //                 color={color} // Pass only the color object
    //                 points={points}
    //                 league={league}
    //                 competition={competition}
    //                 avatar={avatar}
    //               />
    //             </div>
    //           );
    //         })}
    //     </div>
    //   </div>
    // </div>

    <div className="text-white">
      <div className="flex justify-start w-full mb-5 items-center">
        <div className="flex flex-wrap gap-4 w-full grow">
          {/* <SidebarLoading/> */}
          {dashboardData
            ? dashboardData?.stats.map((data: any, index) => (
                <div className="flex-1" key={index}>
                  <DashboardCard
                    title={data?.name}
                    time={data?.minutes}
                    points={data.points}
                    progressWidth={data.points}                                                   
                  />
                </div>
              ))
            : // Render loading skeletons while stats are loading
              Array.from({ length: 3 }).map((_, index) => (
                <div className="flex-1" key={index}>
                  <Skeleton
                    height={150}
                    baseColor="#22222e"
                    highlightColor="#46465e"
                  />
                </div>
              ))}
        </div>
      </div>

      <div className="my-3">
        {dashboardData ? (
          <CustomChart
            user="user"
            data={dashboardData}
            updateActivity={updateActivityType}
            updateFilter={updateFilterType}
          />
        ) : (
          // Render loading skeleton for the chart
          <Skeleton height={300} baseColor="#22222e" highlightColor="#46465e" />
        )}
      </div>

      <div className="flex justify-start w-full mb-5 items-center">
        <div className="flex flex-wrap gap-4 w-full grow">
          {dashboardData
            ? dashboardData?.leaderboardUsers.map((item: any, index) => {
                const color = leaderboardData[index]?.color; // Get color based on index
                const league = leaderboardData[index]?.league || "1988 / 2000";
                const competition =
                  leaderboardData[index]?.competition || "89 / 100";
                return (
                  <div className="flex-1" key={index}>
                    <LeaderboardCard
                      position={item.rank}
                      username={item.user_name}
                      color={color}
                      points={item.points}
                      league={league}
                      competition={competition}
                      avatar={item.profile_url || "https://via.placeholder.com/100"}
                    />
                  </div>
                );
              })
            : // Render loading skeletons while leaderboard data is loading
              Array.from({ length: 3 }).map((_, index) => (
                <div className="flex-1" key={index}>
                  <Skeleton
                    height={150}
                    baseColor="#22222e"
                    highlightColor="#46465e"
                  />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
