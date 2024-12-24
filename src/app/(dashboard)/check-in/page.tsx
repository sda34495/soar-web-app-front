"use client";
import CheckinCard from "@/components/UI/CheckInCard";
import FitnessCard from "@/components/UI/FitnessCard";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { endLoadingAction } from "@/store/loader-slice";
import FinanceCard from "@/components/UI/FinanceCard";
import Sobriety from "@/components/UI/Sobriety";
import CenterImageModal from "@/components/UI/CenterImageModal";
import useSidebarLoading from "@/Hook/useSidebarLoading";
import ScreenLoader from "@/components/UI/ScreenLoader";
import { getData } from "@/utils/axios";
import endpoints from "@/utils/endpoints";
// import SidebarLoading from '@/Hook/SidebarLoading';

interface CheckInDetails {
  morning: boolean;
  evening: boolean;
  progress: number;
}

interface CheckInData {
  pending_check_ins: number;
  total_done: number;
  total_minutes_spent: number;
  total_progress: number;
  check_in_details: {
    sobriety: CheckInDetails;
    finance: CheckInDetails;
    fitness: CheckInDetails;
  };
}

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

const CheckInPage = () => {
  const dispatch = useDispatch();

  const [checkInStatus, setCheckInStatus] = useState({
    pending_check_ins: 0,
    total_done: 0,
    check_in_details: {
      sobriety: {
        morning: false,
        evening: false,
        progress: 0,
      },
      finance: {
        morning: false,
        evening: false,
        progress: 0,
      },
      fitness: {
        morning: false,
        evening: false,
        progress: 0,
      },
    },
    total_minutes_spent: 0,
    total_progress: 0,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshCheckIn, setRefreshCheckIn] = useState(false); // Track refresh state
  const [modalTitle, setModalTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const updateModalTitle = (value: any) => {
    setModalTitle(value);
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Close the modal
    setRefreshCheckIn((prev) => !prev);
  };

  const fetchCheckInDetails = async () => {
    try {
      const response = await getData(endpoints.GET_CHECK_IN_DATA);
      if (response.data?.success) {
        const checkInDetails = response.data?.data;
        setCheckInStatus(checkInDetails);
      }
    } catch (error) {
      console.log("Failed to fetch check-in details:", error);
    }
  };

  useEffect(() => {
    fetchCheckInDetails(); // Fetches data only on initial mount
  }, []);
  useEffect(() => {
    console.log("checkInStatus", checkInStatus);
  }, [fetchCheckInDetails]);

  useSidebarLoading();
  return (
    <div className="space-y-6 ">
      {/* <SidebarLoading/> */}

      {isLoading && <ScreenLoader />}
      <CheckinCard
        key={refreshCheckIn ? 1 : 0}
        checkInDetails={checkInStatus}
      />

      <FitnessCard
        setIsLoading={setIsLoading}
        setIsModalOpen={setIsModalOpen}
        updateModalTitle={updateModalTitle}
        checkInStatus={checkInStatus?.check_in_details.fitness}
        setCheckInStatus={setCheckInStatus}
        fetchCheckInDetails={fetchCheckInDetails}
      />

      <FinanceCard
        setIsLoading={setIsLoading}
        setIsModalOpen={setIsModalOpen}
        updateModalTitle={updateModalTitle}
        checkInStatus={checkInStatus?.check_in_details.finance}
        setCheckInStatus={setCheckInStatus}
        fetchCheckInDetails={fetchCheckInDetails}
      />
      <Sobriety
        setIsLoading={setIsLoading}
        setIsModalOpen={setIsModalOpen}
        updateModalTitle={updateModalTitle}
        checkInStatus={checkInStatus?.check_in_details.sobriety}
        setCheckInStatus={setCheckInStatus}
        fetchCheckInDetails={fetchCheckInDetails}
      />

      {isModalOpen && (
        <CenterImageModal
          title={modalTitle}
          description=""
          isOpen={isModalOpen}
          image="/icon_success.png"
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default CheckInPage;
