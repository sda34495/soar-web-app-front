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
      color: {
        card1 :  'bg-gradient-to-br from-[#09DE7A] to-[#525552]',
        card2: 'bg-[#1e261e]' ,
      }
    },
    {
      position: "2nd",
      username: "oliviarhye",
      points: 1260,
      league: "1988 / 2000",
      competition: "89 / 100",
      avatar: "/avatar.jpeg",
      color: {
        card1 :  'bg-gradient-to-br from-[#c784269b] to-[#3d3e3d]',
        card2: 'bg-custom-card-gradient' ,
      }
    },
    {
      position: "3rd",
      username: "marshmellow",
      points: 1240,
      league: "1988 / 2000",
      competition: "89 / 100",
      avatar: "/avatar.jpeg",
      color: {
        card1 :  'bg-gradient-to-br from-[#438ff2eb] to-[#08274c]',
        card2: 'bg-[#1e2d3f7c]' ,
      }
    },
  ];

  return (
    <div className="text-white ">
      <div className="  flex justify-start  w-full mb-5 items-center">
      <div className=" flex flex-wrap gap-4 w-full  grow  ">
        {cardData.map((data, index) => (
          
          <div className="flex-1">
          <DashboardCard
            key={index}
            title={data.title}
            time={data.time}
            points={data.points}
            progressColor={data.progressColor}
            progressWidth={data.progressWidth}
            />
            </div>
         
        ))}
      </div>
      </div>

    

      <div className="my-3 ">
        
        <CustomChart user="user" />
      </div>

      <div className="  flex justify-start  w-full mb-5 items-center">
        <div className="flex flex-wrap gap-4 w-full  grow">
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
    </div>
  );
};

export default DashboardPage;
