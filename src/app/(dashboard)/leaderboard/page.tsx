"use client";
import React, { useEffect, useState } from "react";
import LeaderboardCard from "@/components/UI/LeaderboardCard";
import LeaderboardTable from "../../../components/UI/LeaderboardData";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { getData } from "@/utils/axios";
import endpoints from "@/utils/endpoints";
import useSidebarLoading from "@/Hook/useSidebarLoading";
import { useRouter } from "next/navigation";

const LeaderboardPage = () => {
  const router = useRouter();
  const [fetchedLeaderboardData, setFetchedLeaderboardData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const response = await getData(endpoints.GET_TOP_USERS);
        console.log("API Response%$:", response.data);

        if (response?.data?.success) {
          const data = response.data.data.map((entry: any) => ({
            id: entry._id,
            position: entry.rank,
            username: entry.user_name || "unknown",
            points: entry.points || 0,
            daily_check_ins: entry.total_check_ins || 0,
            weekly_check_ins: entry.total_weekly_check_ins || 0,
            avatar: entry.profile_url || "/avatar.jpeg",
            color: getCardColor(entry.rank),
          }));
          setLeaderboardData(response?.data?.data);

          const topRanks = data.filter((item) =>
            ["1st", "2nd", "3rd"].includes(item.position)
          );

          setFetchedLeaderboardData(topRanks);
          setError(null);
        } else {
          setError(response?.data?.message || "Failed to fetch leaderboard data.");
        }
      } catch (err: any) {
        console.error("Error fetching leaderboard data:", err);
        setError(err.response?.data?.message || "Failed to fetch data.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchLeaderboardData();
  }, []);

  useSidebarLoading();

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
            : fetchedLeaderboardData.length > 0
            ? fetchedLeaderboardData.map((item, index) => (
                <div
                  onClick={() => router.push(`/leaderboard/details/${item.id}`)}
                  className="flex-1 cursor-pointer"
                  key={index}
                >
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
            : <div className="text-center text-gray-500">No leaderboard data available.</div>
          }
        </div>
      </div>

      <LeaderboardTable leaderboardData={leaderboardData} />
    </div>
  );
};

export default LeaderboardPage;
