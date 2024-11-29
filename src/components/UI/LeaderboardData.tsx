import React from "react";

// Dummy data array
const leaderboardData = [
  { rank: "4th", user: "Chance Levin", points: 851, league: 1940, competition: 80, avatar: "/avatar.jpeg" },
  { rank: "5th", user: "Angel Westervelt", points: 567, league: 1810, competition: 77, avatar: "/avatar.jpeg" },
  { rank: "6th", user: "Roger Franci", points: 64, league: 1810, competition: 77, avatar: "/avatar.jpeg" },
  { rank: "7th", user: "Corey Septimus", points: 389, league: 1810, competition: 73, avatar: "/avatar.jpeg" },
  { rank: "8th", user: "Lydia Lipshutz", points: 238, league: 1810, competition: 65, avatar: "/avatar.jpeg" },
  { rank: "9th", user: "Jaydon Calzoni", points: 191, league: 1810, competition: 64, avatar: "/avatar.jpeg" },
  { rank: "10th", user: "Marley Westervelt", points: 618, league: 1810, competition: 62, avatar: "/avatar.jpeg" },
  { rank: "11th", user: "Abram Botosh", points: 451, league: 1810, competition: 58, avatar: "/avatar.jpeg" },
  { rank: "12th", user: "Makenna Carder", points: 903, league: 1810, competition: 56, avatar: "/avatar.jpeg" },
];

const LeaderboardTable = () => {
  return (
    <div className="bg-black text-white rounded-lg shadow-md p-6 overflow-x-auto">
      <table className="w-full text-left border-collapse">
        {/* Table Header */}
        <thead>
          <tr className="text-gray-400">
            <th className="p-3">Rank</th>
            <th className="p-3">User</th>
            <th className="p-3">Points</th>
            <th className="p-3">League</th>
            <th className="p-3">Competition</th>
          </tr>
        </thead>
        {/* Table Body */}
        <tbody>
          {leaderboardData.map((entry, index) => (
            <tr
              key={index}
              className="border-t border-gray-700 hover:bg-gray-800 transition-all"
            >
              <td className="p-3">{entry.rank}</td>
              <td className="p-3 flex items-center space-x-3">
                <img
                  src={`${entry.avatar}`}
                  alt={entry.user}
                  className="h-8 w-8 rounded-full object-cover "
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
    </div>
  );
};

export default LeaderboardTable;
