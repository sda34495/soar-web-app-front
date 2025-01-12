"use client";
import { getData } from "@/utils/axios";
import endpoints from "@/utils/endpoints";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Import the styles
import SearchModal from "./SearchModal";

const LeaderboardTable = ({ leaderboardData }: any) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isTableLoading, setIsTableLoading] = useState(true);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadData = () => {
      setTimeout(() => {
        setFilteredData(leaderboardData.slice(3)); // Show the first 3 leaderboard items
        setIsTableLoading(false); // Stop table loading after fetching data
      }, 2000); // Simulate data loading delay
    };

    loadData();
  }, [leaderboardData]);

  const handleRowClick = (id: string) => {
    router.push(`/leaderboard/details/${id}`);
  };

  const handleSearch = async () => {
    if (!searchQuery) return;

    setLoading(true);
    try {
      const response = await getData(`${endpoints.GET_TOP_USERS}?q=${searchQuery}&timestamp=${Date.now()}`);

      if (response?.data?.data) {
        setSearchResults(response.data.data);
        setIsModalOpen(true);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error searching leaderboard:", error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#454545] to-[#3c3c3c] p-[1px] rounded-2xl text-white shadow-md overflow-hidden overflow-x-auto ">
      <div className="bg-[#121212] text-white rounded-2xl px-2 py-1 overflow-x-auto">
        <div className="p-3 flex justify-end space-x-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by username..."
            className="p-2 bg-transparent text-white rounded-lg border border-gray-600"
          />
          <button
            className="h-10 w-10 bg-gray-800 flex items-center justify-center rounded-xl"
            onClick={handleSearch}
          >
            <img
              src="/search.svg"
              alt="Search"
              className="w-4 h-4 md:w-6 md:h-6"
            />
          </button>
        </div>

        {isTableLoading ? (
          <div className="p-3">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[#7C7C7C]">
                  <th className="p-3"><Skeleton baseColor="#3d3d3d" /></th>
                  <th className="p-3"><Skeleton baseColor="#3d3d3d" /></th>
                  <th className="p-3"><Skeleton baseColor="#3d3d3d" /></th>
                  <th className="p-3"><Skeleton baseColor="#3d3d3d" /></th>
                  <th className="p-3"><Skeleton baseColor="#3d3d3d" /></th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index} className="border-t border-gray-700">
                    <td className="p-3">
                      <Skeleton baseColor="#3d3d3d" />
                    </td>
                    <td className="p-3 flex items-center space-x-3">
                      <Skeleton
                        baseColor="#3d3d3d"
                        circle
                        height={32}
                        width={32}
                      />
                      <Skeleton baseColor="#3d3d3d" width={100} />
                    </td>
                    <td className="p-3">
                      <Skeleton baseColor="#3d3d3d" width={50} />
                    </td>
                    <td className="p-3">
                      <Skeleton baseColor="#3d3d3d" width={50} />
                    </td>
                    <td className="p-3">
                      <Skeleton baseColor="#3d3d3d" width={80} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[#7C7C7C] border-gray-800 border-b">
                <th className="p-3">Rank</th>
                <th className="p-3">User</th>
                <th className="p-3">Points</th>
                <th className="p-3">Daily Check-ins</th>
                <th className="p-3">Weekly Check-ins</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((entry: any) => (
                <tr
                  key={entry._id}
                  className="hover:bg-gray-800 transition-all cursor-pointer "
                  onClick={() => handleRowClick(entry._id)}
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
                  <td className="p-3">{entry.total_check_ins || 0}</td>
                  <td className="p-3">{entry.weekly_check_ins || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <SearchModal
        isOpen={isModalOpen}
        results={searchResults}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default LeaderboardTable;
