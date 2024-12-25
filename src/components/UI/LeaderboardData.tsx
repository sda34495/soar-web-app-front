// components/UI/LeaderboardTable.tsx
"use client";
import { getData } from "@/utils/axios";
import endpoints from "@/utils/endpoints";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import SearchModal from "./SearchModal"; // Import modal

const LeaderboardTable = ({ leaderboardData }: any) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setFilteredData(leaderboardData.slice(3)); // Show the first 3 leaderboard items
  }, [leaderboardData]);

  const handleRowClick = (id: string) => {
    router.push(`/leaderboard/details/${id}`);
  };

  const handleSearch = async () => {
    if (!searchQuery) return;

    setLoading(true);
    try {
      console.log("Searching for user:", searchQuery);

      // Create query string with 'q' as user_name
      const response = await getData(`${endpoints.GET_TOP_USERS}?q=${searchQuery}&timestamp=${Date.now()}`);

      
      // Check if the response is successful and contains the expected data
      if (response?.data?.data) {
        console.log("Search Results:", response.data.data);
        setSearchResults(response.data.data);  // Set the search results
        setIsModalOpen(true);  // Open the modal
      } else {
        setSearchResults([]);  // If no data found, set empty array
      }
    } catch (error) {
      console.error("Error searching leaderboard:", error);
      setSearchResults([]);  // If an error occurs, clear the search results
    } finally {
      setLoading(false);  // Stop loading indicator
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#454545] to-[#3c3c3c] p-[1px] rounded-2xl text-white shadow-md overflow-hidden overflow-x-auto">
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

        {loading ? (
          <div className="text-center text-white p-4">Loading...</div>
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
              {filteredData.map((entry: any) => (
                <tr
                  key={entry._id}
                  className="hover:bg-gray-800 transition-all cursor-pointer"
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
                  <td className="p-3">{entry.league || 0}</td>
                  <td className="p-3">{entry.competition || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal Component */}
      <SearchModal
        isOpen={isModalOpen}
        results={searchResults}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default LeaderboardTable;
