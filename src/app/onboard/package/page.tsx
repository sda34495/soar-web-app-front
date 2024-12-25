"use client";
import React, { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import Image from "next/image";
import bgImage from '../../../../public/bg.png'
import BookingModal from "@/components/StripeModal";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
      useEffect (( ) => {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/auth/login");
        }
      },[]);
  // Correct use of useState to manage the modal's open state
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [stripeModalOpen, setStripeModalOpen] = useState(false);

  // Function to handle closing the modal
  // update build
  const handleClose = () => {
    setIsDeleteOpen(false);
  };

  return (
   
      <div className="relative flex flex-col w-full h-screen  bg-zinc-900">
      <Image
        src={bgImage}
        alt="bgimage"
        className="w-full h-full opacity-80 absolute inset-0"
      />
        <div className="w-full px-4  lg:px-20 h-full  z-10">
          <header className="w-full mt-10  bg-red">
            <div className=" w-[120px] text-center">
              <hr className="my-3 h-[2px] border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-45 dark:via-neutral-400 " />
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#fbedd3] to-[#c3a374]">
                SOAR
              </h1>
              <hr className="my-3 h-[2px] border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-45 dark:via-neutral-400" />
            </div>
          </header>

          <div className="mt-10">
            <h2 className="text-white text-2xl">Select Your Package</h2>
            <p className="text-zinc-500 mt-2">
              We offer couple of packages to our users, free and premium. Which
              one you want?
            </p>
          </div>
          <div className="max-w-md md:max-w-lg lg:max-w-xl h-auto container mt-10 bg-golden/20 border border-golden rounded-3xl py-8 px-10">
            {/* <!-- Header Section --> */}
            <div className="w-full flex flex-row justify-between items-center">
              <h1 className="text-3xl tracking-tighter text-white font-semibold font-Bricolage-Grotesque">
                Premium
              </h1>
              <div className="inline-flex items-center">
                <label className="flex items-center cursor-pointer relative">
                  <input
                    type="checkbox"
                    className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-green-600 checked:border-green-600"
                    id="check4"
                    defaultChecked={true}
                    
                  />
                  <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="1"
                      >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </span>
                </label>
              </div>
            </div>

            <h1 className="text-2xl md:text-3xl tracking-tighter text-white font-semibold font-Bricolage-Grotesque">
              $50
            </h1>

            <div className=" grid grid-cols-2 gap-6 mt-4 mr-5">
              <div className="flex flex-row items-center gap-2 ">
                <img src="/check.png" alt="Checkmark" className="h-6 w-6" />
                <h2 className="text-lg md:text-xl text-white/70">
                  Task Customization
                </h2>
              </div>
              <div className="flex flex-row items-center gap-2">
                <img src="/check.png" alt="Checkmark" className="h-6 w-6" />
                <h2 className="text-lg md:text-xl text-white/70">
                  Task Difficulty Scaling
                </h2>
              </div>
              <div className="flex flex-row items-center gap-2">
                <img src="/check.png" alt="Checkmark" className="h-6 w-6" />
                <h2 className="text-lg md:text-xl text-white/70">
                  Exclusive Live Events
                </h2>
              </div>
              <div className="flex flex-row items-center gap-2">
                <img src="/check.png" alt="Checkmark" className="h-6 w-6" />
                <h2 className="text-lg md:text-xl text-white/70">
                  Amazing Workshops
                </h2>
              </div>
              <div className="flex flex-row items-center gap-2">
                <img src="/check.png" alt="Checkmark" className="h-6 w-6" />
                <h2 className="text-lg md:text-xl text-white/70">
                  1 on 1 Sessions
                </h2>
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

            <button onClick={() => setStripeModalOpen(true)} className="py-4 px-20 font-semibold  text-black c bg-custom-gradient hover:bg-custom-gradient-hover rounded-full">
              Start
            </button>
          </div>
          <Modal
            image_url="/coupon.png"
            title="Apply Coupon Code"
            description="Enter coupon code to avail discounts"
            isOpen={isDeleteOpen}
            setisOpen={setIsDeleteOpen}
            onClose={handleClose}
            ></Modal>

          <BookingModal isOpen={stripeModalOpen} onClose={() => setStripeModalOpen(false)} price={"50"} />


        </div>
      </div>
      
  
  );
};

export default Page;
