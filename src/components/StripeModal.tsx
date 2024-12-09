"use client";
import React, { useState } from "react";
import CenterImageModal from "./UI/CenterImageModal";

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

  const handleCongrats = () => {
    // Close the current modal
    setTimeout(() => {
      setShowSecondModal(true);
    }, 300);
  };

  const handleCloseSecondModal = () => {
    setShowSecondModal(false);
  };
  if (!isOpen) return;
  return (
    <>
      {/* Main Modal */}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-[#202020] text-white rounded-3xl border border-zinc-700 max-w-md w-full p-6 relative">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <img src="/laptop.png" alt="Laptop" className="h-16" />
            </div>
            <svg
              width="120"
              height="42"
              viewBox="0 0 146 62"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.2606 24.7503C10.2606 23.169 11.5583 22.5608 13.7078 22.5608C16.79 22.5608 20.6833 23.4934 23.7656 25.1558V15.6272C20.3994 14.2892 17.0739 13.7621 13.7078 13.7621C5.475 13.7621 0 18.0601 0 25.2369C0 36.4279 15.4111 34.6438 15.4111 39.4689C15.4111 41.3341 13.7889 41.9423 11.5178 41.9423C8.15167 41.9423 3.85278 40.5637 0.446111 38.6985V48.3487C4.21778 49.9706 8.03 50.6599 11.5178 50.6599C19.9533 50.6599 25.7528 46.4835 25.7528 39.2256C25.7122 27.1426 10.2606 29.2916 10.2606 24.7503ZM37.6761 5.65267L27.7806 7.76112L27.74 40.2393C27.74 46.2402 32.2417 50.6599 38.2439 50.6599C41.5694 50.6599 44.0028 50.0517 45.3411 49.3218V41.0908C44.0433 41.6179 37.6356 43.483 37.6356 37.4821V23.0879H45.3411V14.4514H37.6356L37.6761 5.65267ZM57.9539 17.4519L57.305 14.4514H48.545V49.93H58.6839V25.8856C61.0767 22.7635 65.1322 23.3312 66.3894 23.7772V14.4514C65.0917 13.9648 60.3467 13.0728 57.9539 17.4519ZM68.8633 14.4514H79.0428V49.93H68.8633V14.4514ZM68.8633 11.3698L79.0428 9.18026V0.949219L68.8633 3.09821V11.3698ZM100.213 13.7621C96.2383 13.7621 93.6833 15.6272 92.2639 16.9247L91.7367 14.4108H82.8144V61.6887L92.9533 59.5397L92.9939 48.0649C94.4539 49.1191 96.6033 50.6193 100.172 50.6193C107.432 50.6193 114.042 44.7805 114.042 31.9271C114.002 20.1685 107.31 13.7621 100.213 13.7621ZM97.7794 41.699C95.3867 41.699 93.9672 40.8475 92.9939 39.7933L92.9533 24.7503C94.0078 23.5745 95.4678 22.7635 97.7794 22.7635C101.47 22.7635 104.025 26.8993 104.025 32.211C104.025 37.6443 101.511 41.699 97.7794 41.699ZM146 32.3326C146 21.9526 140.971 13.7621 131.359 13.7621C121.707 13.7621 115.867 21.9526 115.867 32.2515C115.867 44.4562 122.762 50.6193 132.657 50.6193C137.483 50.6193 141.133 49.5246 143.891 47.9838V39.8744C141.133 41.253 137.97 42.1045 133.955 42.1045C130.021 42.1045 126.533 40.7258 126.087 35.9413H145.919C145.919 35.4142 146 33.3057 146 32.3326ZM125.966 28.4806C125.966 23.8988 128.764 21.9931 131.319 21.9931C133.793 21.9931 136.429 23.8988 136.429 28.4806H125.966Z"
                fill="#F8F8F8"
              />
            </svg>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-semibold mb-2 font-Bricolage-Grotesque">
            Process Payment
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            Currently we are offering stripe payment method only
          </p>

          {/* Form */}
          <form className="space-y-4">
            <div>
              <label htmlFor="" className="text-[#7C7C7C] text-sm">
                Card number
              </label>
              <input
                type="text"
                placeholder="0000-0000-0000-0000"
                className="w-full px-4 py-2 bg-zinc-600/30 opacity-90 border-[#7c7c7c] rounded-lg placeholder-[#7c7c7c] font-semibold border"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label htmlFor="" className="text-[#7C7C7C] text-sm mb-1">
                  Expiry
                </label>

                <input
                  type="month"
                  placeholder="MM-YYYY"
                  className="w-full px-4 py-2 bg-zinc-600/30 opacity-90 border-[#7c7c7c] rounded-lg placeholder-[#7c7c7c] font-semibold border"
                />
              </div>
              <div className="flex flex-col ">
                <label htmlFor="" className="text-[#7C7C7C] text-sm mb-1">
                  CVC
                </label>
                <input
                  type="number "
                  placeholder="000"
                  className="w-full px-4 py-2 bg-zinc-600/30 opacity-90 border-[#7c7c7c] rounded-lg placeholder-[#7c7c7c] font-semibold border"
                />
              </div>
            </div>
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
              onClick={handleCongrats}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Second Modal */}
      {/* {showSecondModal && (
        <div className="overflow-y-auto overflow-x-hidden fixed inset-0 flex items-center justify-center z-50 w-full h-screen bg-gray-700 bg-opacity-50 backdrop-blur-sm">
          <div className="relative p-4 w-full max-w-lg h-full md:h-auto mx-4 my-auto">
            <div className="relative p-4 bg-[#202020] rounded-3xl shadow-md md:p-8 border border-[#7c7c7c] text-center">
              <div className="flex justify-center mb-4">
                <img src="/cone.png" alt="Cone" className="h-10 mb-2" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-white">
                Congratulations
              </h3>
              <p className="text-[#BDBDBD]">Your session has been booked</p>
              <div className="mt-5 flex justify-center">
                <button
                  className="px-10 py-3 text-white border font-semi-bold  rounded-full font-semibold"
                  onClick={handleCloseSecondModal}
                >
                  Back to Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      )} */}

      <CenterImageModal
        title="Congratulations"
        description="Your session has been booked."
        isOpen={showSecondModal}
        image="/cone.png"
        onClose={handleCloseSecondModal}
      />
    </>
  );
};

export default BookingModal;
