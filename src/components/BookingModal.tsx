"use client";
import React, { useState } from "react";
import StripModal from "@/components/StripeModal"; // Import your existing second modal component

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  price: string;
}

const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  price,
}) => {
  const [showSecondModal, setShowSecondModal] = useState(false);

  const handleNext = () => {
    onClose(); // Close the first modal
    setTimeout(() => {
      setShowSecondModal(true); // Open the second modal after a short delay
    }, 300); // Optional delay for smooth UI transition
  };

  return (
    <>
      {/* First Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#202020] text-white rounded-3xl border border-zinc-700 max-w-md w-full p-6 relative">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <img src="/laptop.png" alt="Laptop" className="h-16" />
              <span className="border-2 border-golden bg-golden/10 rounded-xl py-2 px-3 text-xl font-semibold">
                Premium{" "}
                <span className="text-2xl ml-1 font-Bricolage-Grotesque">
                  ${price}
                </span>
              </span>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-semibold mb-2 font-Bricolage-Grotesque">
              Booking your session
            </h2>
            <p className="text-sm text-gray-400 mb-4">
              Enter your details for setting up your session
            </p>

            {/* Form */}
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First name"
                  className="w-full px-4 py-2 bg-zinc-600/30 opacity-90 border-[#7c7c7c] rounded-lg placeholder-[#7c7c7c] font-semibold border"
                />
                <input
                  type="text"
                  placeholder="Last name"
                  className="w-full px-4 py-2 bg-zinc-600/30 opacity-90 border-[#7c7c7c] rounded-lg placeholder-[#7c7c7c] font-semibold border"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full px-4 py-2 bg-zinc-600/30 opacity-90 border-[#7c7c7c] rounded-lg placeholder-[#7c7c7c] font-semibold border"
                />
                <input
                  type="text"
                  placeholder="Phone number"
                  className="w-full px-4 py-2 bg-zinc-600/30 opacity-90 border-[#7c7c7c] rounded-lg placeholder-[#7c7c7c] font-semibold border"
                />
              </div>
              <textarea
                placeholder="Your reason here"
                rows={3}
                className="w-full px-4 py-2 bg-zinc-600/30 opacity-90 border-[#7c7c7c] rounded-lg placeholder-[#7c7c7c] font-semibold border"
              ></textarea>
            </form>

            {/* Footer */}
            <div className="mt-5 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                className="px-10 w-full py-1 text-white font-semibold rounded-full border-2 border-[#7c7c7c]"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="px-10 w-full py-3 text-black bg-custom-gradient hover:bg-custom-gradient-hover rounded-full font-semibold"
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Second Modal (StripModal) */}
      {showSecondModal && (
        <StripModal
          isOpen={showSecondModal}
          onClose={() => setShowSecondModal(false)}
          price={price}
        
        />
      )}
    </>
  );
};

export default BookingModal;
