import LeaderboardCard from "@/components/UI/LeaderboardCard";
import LeaderboardTable from "@/components/UI/LeaderboardData";
import React from "react";
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
const page = () => {
  return (
    <div className="space-y-6">
      <div className="  flex justify-start  w-full mb-5 items-center">
        <div className="flex flex-wrap gap-4 w-full max-w-6xl grow">
          {leaderboardData.map((item, index) => (
            <div className="flex-1" key={index}>
              <LeaderboardCard
                key={index}
                position={item.position}
                username={item.username}
                points={item.points}
                league={item.league}
                competition={item.competition}
                avatar={item.avatar}
                color={item.color}
              />
            </div>
          ))}
        </div>
      </div>

      <LeaderboardTable />
    </div>
  );
};

export default page;
