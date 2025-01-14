"use client";
import React, { useEffect, useState } from "react";
import LeaderboardCard from "@/components/UI/LeaderboardCard";
import LeaderBoardTable from "@/app/admin/components/LeaderBoardTable";
import { getData } from "@/utils/axios";
import endpoints from "@/utils/endpoints";
import useSidebarLoading from "@/Hook/useSidebarLoading";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LeaderboardPage = () => {
  const [fetchedLeaderboardData, setFetchedLeaderboardData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true); // State for loading
  

    useEffect(() => {
      const fetchLeaderboardData = async () => {
        try {
          const response = await getData(endpoints.GET_ADMIN_LEADERBOARD);
          console.log("This is admin res", response);
    
          const data = response?.data?.data?.map((entry: any) => ({
            position: entry.rank, // Ensure rank is correctly extracted
            username: entry.user_name || "unknown",
            points: entry.points || 0,
            daily_check_ins: entry.total_check_ins || 0,
            weekly_check_ins: entry.total_weekly_check_ins || 0,
            avatar: "/avatar.jpeg", // Add logic for dynamic avatar if available
            color: getCardColor(entry.rank), // Use rank to determine the color
          }));
    
          // Filter only the top 3 ranks
          const topRanks = data.filter((item) =>
            ["1st", "2nd", "3rd"].includes(item.position)
          );
    
          setFetchedLeaderboardData(topRanks);
          setError(null);
        } catch (err: any) {
          console.error("Error fetching leaderboard data:", err);
          setError(err.response?.data?.message || "Failed to fetch data.");
        } finally {
          // Ensure loading is set to false regardless of success or failure
          setLoading(false);
        }
      };
    
      fetchLeaderboardData();
    }, []);
    

  // Function to set color based on rank
  const getCardColor = (rank: string) => {
    switch (rank) {
      case "1st":
        return {
          card1: "bg-gradient-to-br from-[#09DE7A] to-[#525552]",
          card2: "bg-[#1e261e]",
        };
      case "2nd":
        return {
          card1: "bg-gradient-to-br from-[#c784269b] to-[#3d3e3d]",
          card2: "bg-custom-card-gradient",
        };
      case "3rd":
        return {
          card1: "bg-gradient-to-br from-[#438ff2eb] to-[#08274c]",
          card2: "bg-[#1e2d3f7c]",
        };
      default:
        return {
          card1: "bg-gradient-to-br from-[#a0a0a0] to-[#2f2f2f]",
          card2: "bg-[#1e1e1e]",
        };
    }
  };


  useSidebarLoading()
  return (
    <div className="space-y-6 mb-5">
      {error && <div className="text-red-500">{error}</div>}

      <div className="flex justify-center items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 grow">
           {loading
                      ? Array.from({ length: 3 }).map((_, index) => (
                          <div className="flex-1" key={index}>
                            <Skeleton
                              height={200} // Adjust height to match card size
                              baseColor="#2f2f2f"
                              highlightColor="#3c3c3c"
                              className="rounded-3xl"
                            />
                          </div>
                        ))
                      : 

          fetchedLeaderboardData.length > 0
         ?fetchedLeaderboardData?.map((item, index) => (
              <div className="flex-1" key={index}>
                <LeaderboardCard
                  position={item.position}
                  username={item.username}
                  points={item.points}
                  daily_check_ins={item.daily_check_ins}
                    weekly_check_ins={item.weekly_check_ins}
                  avatar={item.avatar}
                  color={item.color}
                />
              </div>
            ))
           : 
            <div className="text-center text-gray-500">
              No leaderboard data available.
            </div>
          }
        </div>
      </div>

      <LeaderBoardTable />
    </div>
  );
};

export default LeaderboardPage;