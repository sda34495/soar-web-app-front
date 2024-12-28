"use client";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CheckinCard from "@/components/UI/CheckInCard";
import FitnessCard from "@/components/UI/FitnessCard";
import FinanceCard from "@/components/UI/FinanceCard";
import Sobriety from "@/components/UI/Sobriety";
import BeStillCard from "@/components/UI/BeStillCard";
import CenterImageModal from "@/components/UI/CenterImageModal";
import { getData } from "@/utils/axios";
import endpoints from "@/utils/endpoints";
import useSidebarLoading from "@/Hook/useSidebarLoading";

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
    be_still: CheckInDetails;
  };
}

const CheckInPage = () => {
  const [checkInStatus, setCheckInStatus] = useState<CheckInData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshCheckIn, setRefreshCheckIn] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const updateModalTitle = (value: string) => setModalTitle(value);

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
      }
    } catch (error) {
      console.error("Failed to fetch check-in details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCheckInDetails();
  }, []);

  useSidebarLoading();

  return (
    <div className="space-y-6 relative mb-5">
      {/* Show the loader while data is being fetched */}
      {isLoading && (
        <div className="space-y-10">
          <Skeleton height={70} baseColor="#2f2f2f" highlightColor="#3c3c3c"  className="rounded-3xl mt-5 mb-3 border-gray-700" />
          <Skeleton height={150} baseColor="#2f2f2f" highlightColor="#3c3c3c" className="rounded-3xl mt-10 " />
          <Skeleton height={150} baseColor="#2f2f2f" highlightColor="#3c3c3c" className="rounded-3xl mt-10 " />
          <Skeleton height={150} baseColor="#2f2f2f" highlightColor="#3c3c3c" className="rounded-3xl mt-10 " />
          <Skeleton height={150} baseColor="#2f2f2f" highlightColor="#3c3c3c" className="rounded-3xl mt-10" />
        </div>
      )}

      {!isLoading && checkInStatus && (
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
