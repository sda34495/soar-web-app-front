"use client";
import { getData } from "@/utils/axios";
import endpoints from "@/utils/endpoints";
import React, { useEffect, useState } from "react";

const PreviousBookingsTable = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch booking data from the API
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await getData(endpoints.PREVIOUS_BOOKING_SESSION); // Adjust the endpoint if needed
        if (response?.data?.data) {
          // Map the data to extract only date and reason
          const formattedData = response.data.data.map((item) => ({
            date: new Date(item.createdAt).toLocaleDateString(), // Format the date
            reason: item.consultation_reason || "N/A", // Default to "N/A" if no reason
          }));
          setBookings(formattedData);
        }
      } catch (err) {
        console.error("Error fetching booking data:", err);
        setError("Failed to load bookings. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="p-4 bg-[#121212] border border-zinc-700 rounded-lg mt-6 w-full mx-auto">
      <h3 className="text-lg font-semibold mb-4">Your Previous Coaching Requests</h3>
      {loading ? (
        <p className="text-center text-gray-400 mt-4">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-400 mt-4">{error}</p>
      ) : bookings.length > 0 ? (
        <table className="w-full text-sm text-gray-400">
          <thead>
            <tr className="border-b border-gray-700 text-left">
              <th className="py-2 px-3">Date</th>
              <th className="py-2 px-3">Reason</th>
              <th className="py-2 px-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index} className="border-b border-gray-800">
                <td className="py-2 px-3">{booking.date}</td>
                <td className="py-2 px-3">{booking.reason}</td>
                <td
                    className={`px-2 py-1 items-center text-xs rounded ${
                      booking.status === "Completed"
                        ? "text-green-500"
                        : "text-yellow-500"
                    }`}
                  >
                   Pending
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-400 mt-4">
          You have no previous coaching requests.
        </p>
      )}
    </div>
  );
};

export default PreviousBookingsTable;
