"use client";
import React, { useEffect, useState } from "react";
import LeaderboardCard from "@/components/UI/LeaderboardCard";
import LeaderboardTable from "../../../components/UI/LeaderboardData";
import { getData } from "@/utils/axios";
import endpoints from "@/utils/endpoints";

const LeaderboardPage = () => {
  const [fetchedLeaderboardData, setFetchedLeaderboardData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
       
        const response = await getData(endpoints.GET_ADMIN_LEADERBOARD);

        const data = response?.data?.data?.map((entry: any) => ({
          position: entry.rank, // Ensure rank is correctly extracted
          username: entry.user_name || "unknown",
          points: entry.points || 0,
          league: entry.league || 0, // Default value if not available
          competition: entry.activity_type || "N/A",
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

  return (
    <div className="space-y-6">
      {error && <div className="text-red-500">{error}</div>}

      <div className="flex justify-center items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 grow">
          {fetchedLeaderboardData.length > 0 ? (
            fetchedLeaderboardData?.map((item, index) => (
              <div className="flex-1" key={index}>
                <LeaderboardCard
                  position={item.position}
                  username={item.username}
                  points={item.points}
                  league={item.league}
                  competition={item.competition}
                  avatar={item.avatar}
                  color={item.color}
                />
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">
              No leaderboard data available.
            </div>
          )}
        </div>
      </div>

      <LeaderboardTable />
    </div>
  );
};

export default LeaderboardPage;