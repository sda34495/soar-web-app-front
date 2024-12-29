"use client";
import React, { useState } from "react";

const CenterImageModal = ({
  isOpen,
  onClose,
  image,
  title,
  description,
  children, // Accept children as a prop
}: any) => {
  return (
    <div>
      {isOpen && (
        <div className="overflow-y-auto overflow-x-hidden fixed inset-0 flex items-center justify-center z-50 w-full h-screen bg-gray-700 bg-opacity-50 backdrop-blur-sm">
          <div className="relative p-4 w-full max-w-xl h-full md:h-auto mx-4 my-auto">
            <div className="relative p-4 bg-[#202020] rounded-3xl shadow-md md:p-8 border border-[#7c7c7c] text-center">
              <div className="flex justify-center mb-4">
                <img src={`${image}`} alt="Modal" className="h-20 mb-2" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-white">{title}</h3>
              <p className="text-[#BDBDBD]">{description || ""}</p>
              <div className="mt-5 flex justify-center">{children}</div> {/* Render children */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CenterImageModal;
