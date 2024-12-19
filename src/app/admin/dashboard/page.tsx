"use client";

import LeaderboardCard from "@/components/UI/LeaderboardCard";
import useSidebarLoading from "@/Hook/useSidebarLoading";
import UserData from "./component/UsarsData";
import DashboardCard from "./component/DashboardCard";

// import ProgressBar from "@/components/UI/ProgressBar";
// import DashboardCard from "@/components/UI/DashboardCard";
// import CustomChart from "@/components/UI/BarChart";
// import LeaderboardCard from "@/components/UI/LeaderboardCard";

const DashboardPage = () => {
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

  const cardsData = [
    {
      title: "Premium users",
      value: "72,255",
      description: "Total users who have signed in.",
      color: {
        card1: "bg-gradient-to-br from-[#438ff2eb] to-[#08274c]",
        card2: "bg-[#1e2d3f7c]",
      },
      text: "#67AEF3",
    },
    {
      title: "Active users",
      value: "1,352,255",
      description: "Total users who have signed in.",
      color: {
        card1: "bg-gradient-to-br from-[#c784269b] to-[#3d3e3d]",
        card2: "bg-custom-card-gradient",
      },
      text: "#C78526",
    },
  ];

  const secondLineCardsData = [
    {
      title: "Total hours in finance",
      value: "72,255",
      description: "Total users who have signed in.",
    },
    {
      title: "Total hours in fitness",
      value: "1,352,255",
      description: "Total users who have signed in.",
    },
    {
      title: "Total hours in no substance",
      value: "51,123",
      description: "Users who have been deleted or removed.",
    },
  ];

  useSidebarLoading();
  return (
    <>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cardsData.map((card, index) => (
            <div className="" key={index}>
              <UserData
                color={card.color}
                usertype={card.title}
                users={card.value}
                text={card.text}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-start  w-full mb-5 items-center ">
          <div className="flex flex-wrap gap-4 w-full max-w-6xl grow">

            {secondLineCardsData.map((card, index) => (
              <div className="flex-1 " key={index}>  
                <DashboardCard 
                  key={index}
                  title={card.title}
                  users={card.value}
                  description={card.description}
                />
              </div>
            ))}
            
          </div>
        </div>

        <div className="  flex justify-start  w-full mb-5 items-center">
          <div className="flex flex-wrap gap-4 w-full max-w-6xl grow">
            {leaderboardData?.map((item, index) => (
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
    </>
    // <div className="text-white ">
    //   <div className=" flex flex-wrap gap-6  ">
    //     {cardData?.map((data, index) => (
    //       <DashboardCard
    //         key={index}
    //         title={data.title}
    //         time={data.time}
    //         points={data.points}
    //         progressColor={data.progressColor}
    //         progressWidth={data.progressWidth}
    //       />
    //     ))}
    //   </div>

    //   <div className="my-3 max-w-6xl">
    //     <CustomChart user="admin" />
    //   </div>

    //   <div className="  flex justify-start  w-full mb-5 items-center">
    //     <div className="flex flex-wrap gap-4 w-full max-w-6xl grow">
    //       {leaderboardData?.map((item, index) => (
    //         <div className="flex-1" key={index}>
    //           <LeaderboardCard
    //             key={index}
    //             position={item.position}
    //             username={item.username}
    //             points={item.points}
    //             league={item.league}
    //             competition={item.competition}
    //             avatar={item.avatar}
    //             color={item.color}
    //           />
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // </div>
  );
};

export default DashboardPage;
