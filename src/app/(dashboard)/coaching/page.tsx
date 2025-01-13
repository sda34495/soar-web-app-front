'use client'
import BookingCard from "@/components/BookingCard";
import PreviousBookingsTable from "@/components/PreviousBookingModal";
import useSidebarLoading from "@/Hook/useSidebarLoading";
import React, { useState, useEffect } from "react";

const CoachingPage = () => {
  useSidebarLoading();

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Simulated API call
    const fetchBookings = async () => {
      // Replace this with your API call
      const response = await Promise.resolve([
        {
          date: "2025-01-01",
          time: "10:00 AM",
          coachName: "John Doe",
          status: "Completed",
        },
        {
          date: "2025-01-05",
          time: "2:00 PM",
          coachName: "Jane Smith",
          status: "Pending",
        },
      ]);
      setBookings(response);
    };
    fetchBookings();
  }, []);

  return (
    <div className="flex flex-col mb-5 lg:flex-row ">
      <BookingCard />
      <div className="flex items-center justify-center w-full  max-w-xl">

      <PreviousBookingsTable bookings={bookings} />
      </div>
    </div>
  );
};

export default CoachingPage;
