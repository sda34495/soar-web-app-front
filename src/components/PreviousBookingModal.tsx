"use client";
import React from "react";

const PreviousBookingsTable = ({ bookings }) => {
  return (
    <div className="p-4 bg-[#121212] border border-zinc-700 rounded-lg mt-6 w-full  mx-auto">
      <h3 className="text-lg font-semibold mb-4">Your Previous Coaching Requests</h3>
      {bookings && bookings.length > 0 ? (
        <table className="w-full text-sm text-gray-400">
          <thead>
            <tr className="border-b border-gray-700 text-left">
              <th className="py-2 px-3">Date</th>
              <th className="py-2 px-3">Time</th>
              <th className="py-2 px-3">Coach Name</th>
              <th className="py-2 px-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index} className="border-b border-gray-800">
                <td className="py-2 px-3">{booking.date}</td>
                <td className="py-2 px-3">{booking.time}</td>
                <td className="py-2 px-3">{booking.coachName}</td>
                <td className="py-2 px-3">
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      booking.status === "Completed"
                        ? "bg-green-500 text-black"
                        : "bg-yellow-500 text-black"
                    }`}
                  >
                    {booking.status}
                  </span>
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
