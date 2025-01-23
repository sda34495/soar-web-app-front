"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getData } from "@/utils/axios";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { profileActions } from "@/store/profile-slice";

interface UserDetails {
  
  position: string;
  username: string;
  points: number;
  daily_check_ins: number;
  weekly_check_ins: number;
  avatar: string;
}


export default function UserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [userData, setUserData] = useState<UserDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [userLevel, setuserLevel] = useState(null);
    const [levelData, setLevelData] = useState({image:"",title:""});
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    const unwrapParams = async () => {
      const unwrappedParams = await params;
      setUserId(unwrappedParams.id);
      // console.log("harami",params)
      
    };

    unwrapParams();
  }, [params]);

  useEffect(() => {
    if (!userId) return;

    const fetchUserDetails = async () => {
      try {
        const response = await getData(`profile/details-by-id/${userId}`);

        if (response?.data?.success) {
          console.log("level",response?.data?.data?.level) 
          setuserLevel(response?.data?.data?.level)
                  
          const user = response?.data?.data;
          setUserData({
            
            position: user.rank || "unknown",
            username: user.user_name || "unknown",
            points: user.total_points || 0,
            daily_check_ins: user.total_check_ins || 0,
            weekly_check_ins: user.total_weekly_check_ins || 0,
            avatar: user.profile_url || "/avatar.jpeg",
          });
        } else {
          setError(response?.data?.message || "Failed to fetch user details.");
        }
      } catch (err: any) {
        // console.log("Error fetching user details:", err);
        setError(err.response?.data?.message || "Failed to load user details.");
      }
    };

    fetchUserDetails();
  }, [userId]);

  useEffect(() => {
    const levelImages = {
      1: "/medal.png",
      2: "/Novice.png",
      3: "/Adept.png",
      4: "/Challenger.png",
      5: "/Prodigy.png",
      6: "/Expert.png",
      7: "/Veteran.png",
      8: "/master.png",
      9: "/Elite.png",
      10: "/Ascendent.png",
      default:"/medal.png",
    };
    const title = {
      1: "Initiate",
      2: "Novice",
      3: "Adept",
      4: "Challenger",
      5: "Prodigy",
      6: "Expert",
      7: "Veteran",
      8: "master",
      9: "Elite",
      10: "Ascendent",
      default:"Initiate",
    }
    const levelData = () => {
      return { image: levelImages[userLevel] || levelImages.default , title: title[userLevel] || title.default };
    };
    
    setLevelData(levelData());
  },[userLevel])

  return (
    <div className="flex flex-col text-white p-4">
      {/* Back Button */}
      <div className="w-full max-w-md">
        <button
          onClick={() => router.back()}
          className="text-gray-400 hover:text-gray-200 flex items-center mb-4"
        >
          <span className="text-xl mr-2">←</span>
          Back
        </button>
      </div>

      {/* User Details Card */}
      <div className="p-6 border border-zinc-800 space-y-6 max-w-30 sm:max-w-96 bg-[#141414] rounded-3xl shadow-lg">
        {error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : userData ? (
          <>
            {/* Top Section: Avatar & Position */}
            <div className="flex items-center gap-6 relative">
              <div className="relative w-24 h-24">
                {/* Avatar */}
                <img
                src={userData.avatar}
                alt={userData.username}
                className="h-24 w-24 rounded-full object-cover border-2 border-white"
                onError={(e) => (e.currentTarget.src = "/avatar.jpeg")}
                
              />
                {/* Online Status Indicator */}
                <div className="absolute bottom-0 right-0 bg-[#09DE7A] h-5 w-5 rounded-full border-2 border-[#141414]"></div>
              </div>

                <div className="flex flex-col">
                  <div className="flex gap-12 ">

                <div className="flex items-center gap-2">
                  <p className="font-bold text-5xl">{userData.position}</p>
                  <p className="text-sm bg-zinc-700 rounded-full px-3 py-1">
                    position
                  </p>
                  </div>
                  <div className="flex  flex-col ">
                                        <Image src={levelData?.image} alt={userLevel} height={40} width={40} /> 
                                        <span className="text-xs text-zinc-300">{levelData?.title}</span>
                                      </div>
                  </div>
              </div>
            </div>

            {/* Divider */}
            <hr className="border-zinc-600 opacity-20" />

            {/* Points, League, and Competition */}
            <div className="text-lg space-y-3 ">
              <div className="flex items-center  justify-between">
                <div>
                  <span className="font-semibold text-gray-300">@</span>
                  <span className="font-semibold">
                    {userData.username.toLowerCase()}
                  </span>
                </div>
                <span className="font-semibold text-xl">
                  {userData.points.toLocaleString()} <span className="text-sm opacity-45 ">pts</span>
                </span>
              </div>
              <div className="flex items-center  justify-between">
                <span className="font-semibold text-gray-300">Daily Check-ins</span>
                <span className="font-semibold text-xl">
                  {userData.daily_check_ins.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-300">Weekly Check-ins</span>
                {userData.weekly_check_ins}
              </div>
            </div>

            {/* Instruction Text */}
            <p className="text-sm text-gray-400 mt-4">
              Complete the check-ins and increase your points to get a better
              position.
            </p>
          </>
        ) : (
          <div className="text-gray-500 text-center">Loading...</div>
        )}
      </div>
    </div>
  );
}