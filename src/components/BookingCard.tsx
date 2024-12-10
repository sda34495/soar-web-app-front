"use client";
import React, { useState } from "react";

import BookingModal from "./BookingModal";

const BookingCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to handle closing the modal
  const handleClose = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="max-w-lg mx-auto p-6 text-white rounded-lg mt-16  ml-2 ">
      {/* First Card */}
      <div className="p-4 bg-[#121212] border-zinc-700 border rounded-xl flex flex-col items-start">
        <div className="flex flex-row">
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold mb-2">
              Book your 1-1 coaching session
            </h2>

            <p className="text-sm text-gray-400 mb-4">
              We provide online one on one coaching sessions for your assistance
              and help.
            </p>
          </div>
          <img src="/laptop.png" alt="" className="h-20 w-20 " />
        </div>

        <button
          className="px-6 py-3 font-semibold text-black c bg-custom-gradient hover:bg-custom-gradient-hover rounded-full hover:from-yellow-500 hover:to-yellow-700"
          onClick={() => setIsModalOpen(true)}
        >
          Book Your Session
        </button>
      </div>

      {/* Spacing */}
      <div className="h-6"></div>

      {/* Second Card */}
      <div className="p-4 bg-[#121212] border-zinc-700 border  rounded-lg">
        <h3 className="text-lg font-semibold mb-2">
          Process to book your session
        </h3>
        <ol className="text-sm text-gray-400 list-decimal list-inside space-y-1">
          <li>Enter your details</li>
          <li>Select the session</li>
          <li>Fill the payment details</li>
          <li>Finalize the session</li>
        </ol>
      </div>
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        price="50"
      />
    </div>
  );
};

export default BookingCard;
