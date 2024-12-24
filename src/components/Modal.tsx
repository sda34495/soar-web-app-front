"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface ModalProps {
  title: string;
  description: string;
  children?: React.ReactNode;
  isOpen: boolean;
  image_url: string;
  onClose: () => void;
  setisOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.FC<ModalProps> = ({
  title,
  description,
  children,
  isOpen,
  image_url,
  setisOpen,
  onClose,
}) => {
  const [showSecondModal, setShowSecondModal] = useState(false);
  const router = useRouter();
  // Function to handle Apply Code
  const handleApplyCode = () => {
    setisOpen(false); // Close the current modal
    setShowSecondModal(true); // Open the second modal after a short delay
    setTimeout(() => {
      router.push("/check-in")
    }, 1500); // Optional delay to improve UI smoothness
  };

  const handleCloseSecondModal = () => {
    setShowSecondModal(false);
  };

  return (
    <>
      {/* First Modal */}
      <div
        className={`${
          isOpen ? "flex" : "hidden"
        } overflow-y-auto overflow-x-hidden fixed inset-0 flex items-center justify-center z-50 w-full h-screen bg-gray-700 bg-opacity-50 backdrop-blur-sm`}
      >
        <div className="relative p-4 w-full max-w-lg h-full md:h-auto mx-4 my-auto">
          <div className="relative p-4 bg-[#202020] rounded-3xl shadow-md md:p-8 border border-[#7c7c7c]">
            <div className="mb- text-sm font-light">
              <img src={image_url} alt="" className="h-16" />
              <h3 className="mb-3 text-2xl font-bold text-white">{title}</h3>
              <p className="text-[#BDBDBD]">{description}</p>
              <input
                type="text"
                placeholder="Enter code"
                className="mt-3 text-white mb-3 py-3 px-4 block w-full bg-zinc-600/30 opacity-90 border-[#7c7c7c] rounded-lg placeholder-[#7c7c7c] font-semibold border"
              />
              <div className="mt-5 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                  className="px-10 w-full py-3 text-white font-semibold rounded-full border-2 border-[#7c7c7c]"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  className="px-10 w-full py-3 text-black bg-custom-gradient hover:bg-custom-gradient-hover rounded-full font-semibold"
                  onClick={handleApplyCode}
                >
                  Apply Code
                </button>
              </div>
            </div>
            {children}
          </div>
        </div>
      </div>

      {/* Second Modal */}
      <div
        className={`${
          showSecondModal ? "flex" : "hidden"
        } overflow-y-auto overflow-x-hidden fixed inset-0 flex items-center justify-center z-50 w-full h-screen bg-gray-700 bg-opacity-50 backdrop-blur-sm`}
      >
        <div className="relative p-4 w-full max-w-lg h-full md:h-auto mx-4 my-auto">
          <div className="relative p-4 bg-[#202020] rounded-3xl shadow-md md:p-8 border border-[#7c7c7c] text-center">
            <div className="mb-4 text-sm font-light">
              <div className="flex justify-center">
                <img src="/cone.png" alt="" className="h-10 mb-2" />
              </div>

              <h3 className="mb-3 text-2xl font-bold text-white">
                Congratulations
              </h3>

              <p className="text-[#BDBDBD]">
                Your coupon code is applied successfully.
              </p>
              <div className="mt-5 flex justify-center">
                <button
                  className="px-10 py-3  text-black font-semi-bold bg-custom-gradient hover:bg-custom-gradient-hover rounded-full font-semibold"
                  onClick={handleCloseSecondModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
