import LeaderboardCard from "@/components/UI/LeaderboardCard";
import LeaderboardTable from "../../../components/UI/LeaderboardData";
import React from "react";
import CheckInPage from "../check-in/page";


const leaderboardData = [
  {
    position: "1st",
    username: "marshmellow",
    points: 1280,
    league: "1988 / 2000",
    competition: "89 / 100",
    avatar: "/avatar.jpeg",
    color: "linear-gradient(135deg, #043927, #055532)",
  },
  {
    position: "2nd",
    username: "oliviarhye",
    points: 1260,
    league: "1988 / 2000",
    competition: "89 / 100",
    avatar: "/avatar.jpeg",
    color: "linear-gradient(135deg, #4E342E, #6D4C41)",
  },
  {
    position: "3rd",
    username: "marshmellow",
    points: 1240,
    league: "1988 / 2000",
    competition: "89 / 100",
    avatar: "/avatar.jpeg",
    color: "linear-gradient(135deg, #1A237E, #3949AB)",
  },
];
const LeaderboardPage = () => {
  return (
    <div className="space-y-6">
      <div className="  flex justify-center items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {leaderboardData.map((item, index) => (
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
          ))}
        </div>
      </div>

     

      <LeaderboardTable />
    </div>
  );
};

export default LeaderboardPage;
