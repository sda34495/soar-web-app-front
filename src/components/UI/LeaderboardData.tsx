"use client";
import { getData } from "@/utils/axios";
import endpoints from "@/utils/endpoints";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const LeaderboardTable = ({ leaderboardData }: any) => {
  const router = useRouter();
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      const results = leaderboardData.filter((entry: any) =>
        entry.user_name?.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(results);
    } else {
      setFilteredData(leaderboardData);
    }
  };

  const handleSearchRedirect = (item: any) => {
    router.push(`/leaderboard/details/${item._id}`);
  };

  return (
    <div className="bg-gradient-to-b from-[#454545] to-[#3c3c3c] p-[1px] rounded-2xl text-white shadow-md overflow-hidden overflow-x-auto">
      <div className="bg-[#121212] text-white rounded-2xl px-2 py-1 overflow-x-auto">
        <>
          <div className="p-3">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search by username..."
              className="w-full p-2 bg-transparent text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {searchQuery && filteredData.length > 0 && (
              <ul className=" border border-gray-700 mt-2 rounded-lg">
                {filteredData.map((item: any) => (
                  <li
                    key={item._id}
                    className="p-2 hover:bg-custom-gradient hover:text-black hover:font-semibold  cursor-pointer"
                    onClick={() => handleSearchRedirect(item)}
                  >
                    {item.user_name}
                  </li>
                ))}
              </ul>
            )}
          </div>
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
              {filteredData
                .filter((entry: any) => parseInt(entry.rank) >= 4)
                .map((entry: any) => (
                  <tr
                    key={entry._id}
                    className="hover:bg-gray-800 transition-all cursor-pointer"
                    onClick={() =>
                      router.push(`/leaderboard/details/${entry._id}`)
                    }
                  >
                    <td className="p-3">{entry.rank}</td>
                    <td className="p-3 flex items-center space-x-3">
                      <img
                        src={entry.profile_url || "/avatar.jpeg"}
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
        </>
      </div>
    </div>
  );
};

export default LeaderboardTable;
