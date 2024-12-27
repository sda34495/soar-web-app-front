"use client";
import CheckinCard from "@/components/UI/CheckInCard";
import FitnessCard from "@/components/UI/FitnessCard";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import FinanceCard from "@/components/UI/FinanceCard";
import Sobriety from "@/components/UI/Sobriety";
import CenterImageModal from "@/components/UI/CenterImageModal";
import useSidebarLoading from "@/Hook/useSidebarLoading";
import { getData } from "@/utils/axios";
import endpoints from "@/utils/endpoints";
import BeStillCard from "@/components/UI/BeStillCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CheckInPage = () => {
  const dispatch = useDispatch();

  const [checkInStatus, setCheckInStatus] = useState({
    pending_check_ins: 0,
    total_done: 0,
    check_in_details: {
      sobriety: { morning: false, evening: false, progress: 0 },
      finance: { morning: false, evening: false, progress: 0 },
      fitness: { morning: false, evening: false, progress: 0 },
      be_still: { morning: false, evening: false, progress: 0 },
    },
    total_minutes_spent: 0,
    total_progress: 0,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshCheckIn, setRefreshCheckIn] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  // Individual loading states for each card
  const [loading, setLoading] = useState({
    checkIn: true,
    fitness: true,
    finance: true,
    sobriety: true,
    beStill: true,
  });

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

        // Stop loading for all cards after fetching
        setLoading({
          checkIn: false,
          fitness: false,
          finance: false,
          sobriety: false,
          beStill: false,
        });
      }
    } catch (error) {
      console.log("Failed to fetch check-in details:", error);
    }
  };

  useEffect(() => {
    fetchCheckInDetails();
  }, [refreshCheckIn]);

  useSidebarLoading();

  const renderCard = (isLoading: boolean, Component: any, props: any) => {
    return isLoading ? (
      <div className="rounded-lg shadow-lg p-4 bg-#121212 border border-zinc-800">
        <Skeleton height={70} baseColor="#121212" highlightColor="#C2A171" />
      </div>
    ) : (
      <Component {...props} />
    );
  };

  return (
    <div className="space-y- relative">
      {renderCard(
        loading.checkIn,
        CheckinCard,
        {
          key: refreshCheckIn ? 1 : 0,
          checkInDetails: checkInStatus,
        }
      )}

      {renderCard(
        loading.fitness,
        FitnessCard,
        {
          setIsLoading: (state: boolean) =>
            setLoading((prev) => ({ ...prev, fitness: state })),
          setIsModalOpen,
          updateModalTitle: setModalTitle,
          checkInStatus: checkInStatus?.check_in_details.fitness,
          setCheckInStatus,
          fetchCheckInDetails,
        }
      )}

      {renderCard(
        loading.finance,
        FinanceCard,
        {
          setIsLoading: (state: boolean) =>
            setLoading((prev) => ({ ...prev, finance: state })),
          setIsModalOpen,
          updateModalTitle: setModalTitle,
          checkInStatus: checkInStatus?.check_in_details.finance,
          setCheckInStatus,
          fetchCheckInDetails,
        }
      )}

      {renderCard(
        loading.sobriety,
        Sobriety,
        {
          setIsLoading: (state: boolean) =>
            setLoading((prev) => ({ ...prev, sobriety: state })),
          setIsModalOpen,
          updateModalTitle: setModalTitle,
          checkInStatus: checkInStatus?.check_in_details.sobriety,
          setCheckInStatus,
          fetchCheckInDetails,
        }
      )}

      {renderCard(
        loading.beStill,
        BeStillCard,
        {
          setIsLoading: (state: boolean) =>
            setLoading((prev) => ({ ...prev, beStill: state })),
          setIsModalOpen,
          updateModalTitle: setModalTitle,
          checkInStatus: checkInStatus?.check_in_details.be_still,
          setCheckInStatus,
          fetchCheckInDetails,
        }
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
