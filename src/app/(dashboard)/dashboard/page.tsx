import ProgressBar from "@/components/UI/ProgressBar";
import DashboardLayout from "../components/DashboardLayout";
import DashboardCard from "@/components/UI/DashboardCard";
import CustomChart from "@/components/UI/BarChart";
import LeaderboardCard from "@/components/UI/LeaderboardCard";

const DashboardPage = () => {
  const cardData = [
    {
      title: "Fitness",
      time: "3 hr 55 min",
      points: 25,
      progressColor: "#22c55e", // Tailwind green-500
      progressWidth: 40, // Represents 40% progress
    },
    {
      title: "Finance",
      time: "6 hr 12 min",
      points: 12,
      progressColor: "#ef4444", // Tailwind red-500
      progressWidth: 20, // Represents 20% progress
    },
    {
      title: "No-substance",
      time: "23 d 15 hr 51 min",
      points: 70,
      progressColor: "#22c55e", // Tailwind green-500
      progressWidth: 80, // Represents 80% progress
    },
  ];

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

  return (
    <div className="text-white">
      <div className="  flex flex-wrap gap-6  ">
        {cardData.map((data, index) => (
          <DashboardCard
            key={index}
            title={data.title}
            time={data.time}
            points={data.points}
            progressColor={data.progressColor}
            progressWidth={data.progressWidth}
          />
        ))}
      </div>

      <div className="my-3">
        <CustomChart />
      </div>

      <div className="  flex justify-start items-center">
        <div className="flex flex-wrap gap-4">
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
    </div>
  );
};

export default DashboardPage;
