"use client";

import LeaderboardCard from "@/components/UI/LeaderboardCard";
import useSidebarLoading from "@/Hook/useSidebarLoading";
import UserData from "./component/UsarsData";
import DashboardCard from "./component/DashboardCard";
import { getData } from "@/utils/axios";
import endpoints from "@/utils/endpoints";
import { useEffect, useState } from "react";
import ScreenLoader from "@/components/UI/ScreenLoader";

const DashboardPage = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>();
  const [userCard, setUserCard] = useState([]);
  const [analysis, setAnalysis] = useState([]);
  const [leaderboard, setLeaserboard] = useState([]);


  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getData(endpoints.GET_ADMIN_DATA);
      if (response?.data?.success) {
        setData(response.data.data);
        setUserCard([
          {
            title: "Premium users",
            value: response.data.data.total_premium_users,

            color: {
              card1: "bg-gradient-to-br from-[#438ff2eb] to-[#08274c]",
              card2: "bg-[#1e2d3f7c]",
            },
            text: "#67AEF3",
          },
          {
            title: "Active users",
            value: response.data.data.total_active_users,

            color: {
              card1: "bg-gradient-to-br from-[#c784269b] to-[#3d3e3d]",
              card2: "bg-custom-card-gradient",
            },
            text: "#C78526",
          },
        ]);

        setAnalysis([
          {
            title: "Total hours in finance",
            value: response.data.data.analysis.time_finance,
          },
          {
            title: "Total hours in fitness",
            value: response.data.data.analysis.time_fitness,
          },
          {
            title: "Total hours in soberiety",
            value: response.data.data.analysis.time_soberiety,
          },
        ]);

        setLeaserboard(response.data.data.leaderboard);

        // console.log(data);
      }
    } catch (err) {
      // console.log("Error fetching leaderboard data:", err);
      throw err;
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const leaderboardData = [
    {
      color: {
        card1: "bg-gradient-to-br from-[#09DE7A] to-[#525552]",
        card2: "bg-[#1e261e]",
      },
    },
    {
      color: {
        card1: "bg-gradient-to-br from-[#c784269b] to-[#3d3e3d]",
        card2: "bg-custom-card-gradient",
      },
    },
    {
      color: {
        card1: "bg-gradient-to-br from-[#438ff2eb] to-[#08274c]",
        card2: "bg-[#1e2d3f7c]",
      },
    },
  ];

  useSidebarLoading();
  return (
    <>
    {loading && <ScreenLoader/>}
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {userCard?.map((card, index) => (
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
            {analysis?.map((card, index) => {
              return (
                <div className="flex-1 " key={index}>
                  <DashboardCard title={card.title} users={card.value} />
                </div>
              );
            })}
          </div>
        </div>


        <div className="  flex justify-start  w-full mb-5 items-center">
          <div className="flex flex-wrap gap-4 w-full max-w-6xl grow">
            {leaderboard?.map((item, index) => {
              const color = leaderboardData[index].color;
              return (
                <div className="flex-1" key={index}>
                  <LeaderboardCard
                    key={index}
                    position={item.rank}
                    username={item.user_name || "unknown"}
                    points={item.points || 0}
                    daily_check_ins={`${item.total_check_ins || 0} / 2000`}
                      weekly_check_ins={`${item.total_weekly_check_ins || 0} / 100`} 
                    avatar={item.profile_url || "/avatar.jpeg"}
                    color={color}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
