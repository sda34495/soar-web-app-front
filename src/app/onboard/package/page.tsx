"use client";
import React, { useState } from "react";
import Modal from "@/components/Modal";

const Page = () => {
  // Correct use of useState to manage the modal's open state
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  
  // Function to handle closing the modal
  const handleClose = () => {
    setIsDeleteOpen(false);
  };

  return (
    <>
      <div className="flex flex-col mt-20 mx-6 sm:mx-40 lg:mx-auto">
        <div className="mx-auto w-full sm:w-2/3 lg:w-1/2">
          <header className="w-full mt-10 ml-10">
            <div className="w-[120px] text-center">
              <hr className="bg-gradient-to-b from-[#fbedd3] to-[#c3a374] w-[120px]" />
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#fbedd3] to-[#c3a374]">
                SOAR
              </h1>
              <hr className="bg-gradient-to-b from-[#fbedd3] to-[#c3a374] w-[120px]" />
            </div>
          </header>

          <div className="mt-10">
            <h2 className="text-white text-2xl">How are you planning to use SOAR?</h2>
            <p className="text-zinc-500 mt-2">
              We&apos;ll fit the experience to your needs. Don&apos;t worry, you can change it later.
            </p>
                  </div>
<div className="max-w-md md:max-w-lg lg:max-w-xl h-auto container mt-10 bg-golden/20 border border-golden rounded-3xl p-6">
  {/* <!-- Header Section --> */}
  <div className="w-full flex flex-row justify-between items-center">
    <h1 className="text-3xl tracking-tighter text-white font-semibold font-Bricolage-Grotesque">Premium</h1>
    <input
      type="checkbox"
      className="mr-2 w-6 h-6 rounded text-black bg-transparent border-gray-300"
    />
  </div>

  {/* <!-- Price Section --> */}
  <h1 className="text-2xl md:text-3xl tracking-tighter text-white font-semibold font-Bricolage-Grotesque mt-4">$50</h1>

  {/* <!-- Features List --> */}
  <div className="mt-4 space-y-3">
    <div className="flex flex-row items-center gap-2">
      <img src="/check.png" alt="Checkmark" className="h-6 w-6" />
      <h2 className="text-lg md:text-xl text-white/70">Task Customization</h2>
    </div>
    <div className="flex flex-row items-center gap-2">
      <img src="/check.png" alt="Checkmark" className="h-6 w-6" />
      <h2 className="text-lg md:text-xl text-white/70">Task Difficulty Scaling</h2>
    </div>
    <div className="flex flex-row items-center gap-2">
      <img src="/check.png" alt="Checkmark" className="h-6 w-6" />
      <h2 className="text-lg md:text-xl text-white/70">Exclusive Live Events</h2>
    </div>
    <div className="flex flex-row items-center gap-2">
      <img src="/check.png" alt="Checkmark" className="h-6 w-6" />
      <h2 className="text-lg md:text-xl text-white/70">Amazing Workshops</h2>
    </div>
    <div className="flex flex-row items-center gap-2">
      <img src="/check.png" alt="Checkmark" className="h-6 w-6" />
      <h2 className="text-lg md:text-xl text-white/70">1 on 1 Sessions</h2>
    </div>
  </div>
</div>

          <div className="mt-10 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <button
  onClick={() => setIsDeleteOpen(true)}
  className="py-4 px-10 text-white font-semibold flex items-center justify-center gap-2 rounded-full border border-[#FBF9EB]"
>
  <svg
    width="24" // Reduced size for better alignment
    height="24"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_196_10026)">
      <path
        d="M25.3337 5.33398C27.464 5.33398 29.2052 6.99922 29.3269 9.09895L29.3337 9.33398V11.7568C29.3337 12.5653 28.8639 13.1945 28.299 13.5295L28.1561 13.6071C27.2711 14.0437 26.667 14.9529 26.667 16.0007C26.667 16.9735 27.1879 17.827 27.9708 18.2936L28.1561 18.3943C28.7341 18.6794 29.2484 19.2684 29.3241 20.0462L29.3337 20.2445V22.6673C29.3337 24.7976 27.6685 26.5389 25.5687 26.6605L25.3337 26.6673H6.66699C4.53676 26.6673 2.79544 25.0021 2.67378 22.9024L2.66699 22.6673V20.2445C2.66699 19.436 3.13677 18.8068 3.7016 18.4718L3.84457 18.3943C4.72954 17.9576 5.33366 17.0484 5.33366 16.0007C5.33366 15.0278 4.81276 14.1743 4.02979 13.7077L3.84457 13.6071C3.2665 13.3219 2.75226 12.7329 2.67656 11.9551L2.66699 11.7568V9.33398C2.66699 7.20375 4.33222 5.46244 6.43196 5.34077L6.66699 5.33398H25.3337ZM13.3337 12.0007C12.5973 12.0007 12.0003 12.5976 12.0003 13.334V18.6673C12.0003 19.4037 12.5973 20.0007 13.3337 20.0007C14.0701 20.0007 14.667 19.4037 14.667 18.6673V13.334C14.667 12.5976 14.0701 12.0007 13.3337 12.0007Z"
        fill="#F8F8F8"
      />
    </g>
    <defs>
      <clipPath id="clip0_196_10026">
        <rect width="32" height="32" fill="white" />
      </clipPath>
    </defs>
  </svg>
  Apply Coupon Code
</button>

                      <button className="py-4 px-20   text-black c bg-custom-gradient hover:bg-custom-gradient-hover rounded-full">
              Start
            </button>
</div>
                  <Modal
                      image_url="/coupon.png"
                      title="Apply Coupon Code"
                      description="Enter coupon code to avail discounts"
                      isOpen={isDeleteOpen}
                      setisOpen={setIsDeleteOpen}
                      onClose={handleClose} children={undefined}          />
        </div>
      </div>
    </>
  );
};

export default Page;
