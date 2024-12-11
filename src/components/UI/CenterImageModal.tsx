"use client";
import React, { useState } from "react";

const CenterImageModal = ({
  isOpen,
  onClose,
  image,
  title,
  description,
}: any) => {

 
  return (
    <div>
      {isOpen && (
        <div className="overflow-y-auto overflow-x-hidden fixed inset-0 flex items-center justify-center z-50 w-full h-screen bg-gray-700 bg-opacity-50 backdrop-blur-sm">
          <div className="relative p-4 w-full max-w-lg h-full md:h-auto mx-4 my-auto">
            <div className="relative p-4 bg-[#202020] rounded-3xl shadow-md md:p-8 border border-[#7c7c7c] text-center">
              <div className="flex justify-center mb-4">
                <img src={`${image}`} alt="Cone" className="h-10 mb-2" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-white">{title}</h3>
              <p className="text-[#BDBDBD]">{description || ''}</p>
              <div className="mt-5 flex justify-center">
                <button onClick={onClose} className="px-10 py-3 text-white border font-semi-bold hover:bg-custom-gradient-hover  rounded-full font-semibold">
                  Back to Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CenterImageModal;
