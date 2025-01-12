"use client";

import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { FaWhatsapp, FaFacebookMessenger, FaLink } from "react-icons/fa";

interface ModalProps {
  title: string;
  description: string;
  children?: React.ReactNode;
  isOpen: boolean;
  image_url: string;
  linkToShare: string; // New prop for sharing link
  onClose: () => void;
}

const ShareModal: React.FC<ModalProps> = ({
  title,
  description,
  children,
  isOpen,
  image_url,
  linkToShare,
  onClose,
}) => {
  const router = useRouter();

    const handleCopyLink = () => {
    navigator.clipboard.writeText(linkToShare);
    toast.success("Link copied to clipboard!");
  };

  return (
    <>
      {/* Share ShareModal */}
      <div
        className={`${
          isOpen ? "flex" : "hidden"
        } overflow-y-auto overflow-x-hidden fixed inset-0 flex items-center justify-center z-50 w-full h-screen bg-gray-700 bg-opacity-50 backdrop-blur-sm`}
      >
        <div className="relative p-4 w-full max-w-lg h-full md:h-auto mx-4 my-auto">
          <div className="relative p-4 bg-[#202020] rounded-3xl shadow-md md:p-8 border border-[#7c7c7c]">
            <div className="mb- text-sm font-light">
              <img src={image_url} alt="" className="h-16 mx-auto" />
              <h3 className="mb-3 text-center text-2xl font-bold text-white">{title}</h3>
              <p className="text-[#BDBDBD] text-center">{description}</p>
              <div className="mt-5 flex justify-center space-x-4">
                <button
                  className="flex items-center px-4 py-2 text-white bg-green-500 rounded-lg"
                  onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(linkToShare)}`, '_blank')}
                >
                  <FaWhatsapp className="mr-2" /> WhatsApp
                </button>
               
                <button
                  className="flex items-center px-4 py-2 text-white bg-gray-500 rounded-lg"
                  onClick={handleCopyLink}
                >
                  <FaLink className="mr-2" /> Copy Link
                </button>
              </div>
              <div className="mt-5 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                  className="px-10 w-full  py-3 text-white font-semibold rounded-full border-2 border-[#7c7c7c]"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </div>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShareModal;