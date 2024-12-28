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
import BeStillCard from "@/components/UI/BeStillCard";
// test
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
      be_still: {
        morning: false,
        evening: false,
        progress: 0,
      },
    },
    total_minutes_spent: 0,
    total_progress: 0,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshCheckIn, setRefreshCheckIn] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);  // Set loading to true initially

  const updateModalTitle = (value: any) => {
    setModalTitle(value);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setRefreshCheckIn((prev) => !prev);
  };

  const fetchCheckInDetails = async () => {
    try {
      const response = await getData(endpoints.GET_CHECK_IN_DATA);
      if (response.data?.success) {
        const checkInDetails = response.data?.data;
        setCheckInStatus(checkInDetails);
        setIsLoading(false);  // Set loading to false after data is fetched
      }
    } catch (error) {
      console.log("Failed to fetch check-in details:", error);
      setIsLoading(false);  // Set loading to false if there's an error
    }
  };

  useEffect(() => {
    fetchCheckInDetails();
  }, []);

  useSidebarLoading();

  return (
    <div className="space-y-6 relative">
      {/* Show the loader while data is being fetched */}
      {isLoading && (
        <div className="mx-auto mt-44 z-10">
          <ScreenLoader />
        </div>
      )}

      {/* Content is rendered only after the data has been fully fetched */}
      {!isLoading && (
        <>
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
          <BeStillCard
            setIsLoading={setIsLoading}
            setIsModalOpen={setIsModalOpen}
            updateModalTitle={updateModalTitle}
            checkInStatus={checkInStatus?.check_in_details.be_still}
            setCheckInStatus={setCheckInStatus}
            fetchCheckInDetails={fetchCheckInDetails}
          />
        </>
       )} 

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
