"use client";
import { getData } from "@/utils/axios";
import endpoints from "@/utils/endpoints";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const LeaderboardTable = ({leaderboardData}:any) => {
  // const [leaderboardData, setLeaderboardData] = useState([]);
  // const [error, setError] = useState<string | null>(null);
  // const [loading, setLoading] = useState(false);
  const router = useRouter();

  // useEffect(() => {
  //   const fetchLeaderboardData = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await getData(endpoints.GET_TOP_USERS);
  //       console.log("API response:", response); // Log the full response

  //       if (response?.data?.success) {
  //         // Log the actual data structure
  //         console.log("Leaderboard data:", response.data.data);
  //         setLeaderboardData(response?.data?.data); // Assuming the data is inside response.data.data
  //       } else {
  //         setError(response?.data?.message || "Failed to fetch leaderboard data.");
  //       }
  //     } catch (error: any) {
  //       setError(error?.response?.data?.message || error.message || "An error occurred while fetching data.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchLeaderboardData();
  // }, []);

  return (
    <div className="bg-gradient-to-b from-[#454545] to-[#3c3c3c] p-[1px] rounded-2xl text-white shadow-md overflow-hidden overflow-x-auto">
      <div className="bg-[#121212] text-white rounded-2xl px-2 py-1 overflow-x-auto">
        
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[#7C7C7C]">
                <th className="p-3">Rank</th>
                <th className="p-3">User</th>
                <th className="p-3">Points</th>
                <th className="p-3">League</th>
                <th className="p-3">Competition</th>
              </tr>
              <tr className="border-t border-gray-700 h transition-all"></tr>
            </thead>
            <tbody>
              {leaderboardData
                .filter((entry: any) => parseInt(entry.rank) >= 4) // Show ranks starting from 4th
                .map((entry: any) => (
                  <tr
                    key={entry._id}
                    className="hover:bg-gray-800 transition-all cursor-pointer"
                    onClick={() => router.push(`/leaderboard/details/${entry._id}`)} // Redirect to the correct user's detail page
                  >
                    <td className="p-3">{entry.rank}</td>
                    <td className="p-3 flex items-center space-x-3">
                      <img
                        src={entry.profile_url || "/avatar.jpeg"} // Provide a default image if not available
                        alt={entry.user_name}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                      <span>{entry.user_name || "unknown"}</span>
                    </td>
                    <td className="p-3">{entry.points || 0}</td>
                    <td className="p-3">{entry.league || 0}</td>
                    <td className="p-3">{entry.competition || 0}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        
      </div>
    </div>
  );
};

export default LeaderboardTable;
