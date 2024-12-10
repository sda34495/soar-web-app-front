"use client";

import React, { useState, useEffect } from "react";
import { getUserData } from "@/utils/axios"; // Ensure this utility is correctly implemented

const LeaderboardTable = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("User is not authenticated.");
          return;
        }

        const response = await getUserData("leaderboard/all");

        const data = response.data.map((entry: any) => ({
          rank: entry.rank,
          user: `${entry.first_name} ${entry.last_name}`,
          points: entry.points || 0,
          league: entry.league || 0,
          competition: entry.activity_type || "",
          avatar: "/avatar.jpeg",
        }));

        setLeaderboardData(data);
        setError(null);
      } catch (err: any) {
        console.error("Error fetching leaderboard data:", err);
        setError(err.response?.data?.message || "Failed to fetch data.");
      }
    };

    fetchLeaderboardData();
  }, []);

  return (
    <div className="bg-gradient-to-b from-[#454545] to-[#3c3c3c] p-[1px] rounded-2xl text-white shadow-md overflow-hidden overflow-x-auto">
      <div className="bg-[#121212] text-white rounded-2xl px-2 py-1 overflow-x-auto">
        {error ? (
          <p className="text-red-500 text-center p-3">{error}</p>
        ) : (
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
                .filter((entry) => parseInt(entry.rank) >= 4) // Show ranks starting from 4th
                .map((entry, index) => (
                  <tr key={index} className="hover:bg-gray-800 transition-all">
                    <td className="p-3">{entry.rank}</td>
                    <td className="p-3 flex items-center space-x-3">
                      <img
                        src={entry.avatar}
                        alt={entry.user}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                      <span>{entry.user}</span>
                    </td>
                    <td className="p-3">{entry.points}</td>
                    <td className="p-3">{entry.league}</td>
                    <td className="p-3">{entry.competition}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default LeaderboardTable;
