'use client'
import Link from "next/link";
import React from "react";
import Image from "next/image";
import bgImage from '../../../../public/bg.png'


const Page = () => {

  
  return (
    <>
      
      <div className="relative flex flex-col w-full h-screen  bg-zinc-900  ">
      <Image
        src={bgImage}
        alt="bgimage"
        className="w-full h-full opacity-80 absolute inset-0"
      />
        
        <div className=" w-full px-4  lg:px-20 h-full  z-10 ">
        <header className="w-full mt-10  bg-red">
          <div className=" w-[120px] text-center">
        <hr className="my-3 h-[2px] border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-45 dark:via-neutral-400 "  />
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#fbedd3] to-[#c3a374]">
          SOAR
        </h1>
        <hr className="my-3 h-[2px] border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-45 dark:via-neutral-400" />
          </div>
      </header>
          <div className="mt-10 items-start">
            <h2 className="text-white font-semibold text-2xl">How are you planning to use SOAR?</h2>
            <p className="text-zinc-500 mt-2">
              We&apos;ll fit the experience to your needs. Don&apos;t worry, you can change it later.
            </p>
          </div>

          <form className="flex flex-col mt-8 max-w-lg text-white gap-6">
            {/* Fitness Goal Input */}
            <div className="flex items-center space-x-2 gap-3">
              <div className="flex gap-1">
                <img src="/fitness.png" alt="Icon 1" className="w-12 h-12" />
           
              </div>
              <div className="flex w-full space-y-2 flex-col">
              <label className="text-xl font-semibold">Fitness</label>
            <input
              type="text"
              placeholder="Enter your fitness goal here"
              className=" py-3 px-4 block w-full bg-zinc-600/30 opacity-90 border-[#7c7c7c] rounded-lg  placeholder-[#7c7c7c] font-semibold border"
              />
              </div>
            </div>
            
            <div className="flex items-center space-x-2 gap-3">
              <div className="flex gap-1">
                <img src="/dollar.png" alt="Icon 1" className="w-12 h-12" />
           
              </div>
              <div className="flex w-full space-y-2 flex-col">
              <label className="text-xl font-semibold">Finance</label>
            <input
              type="text"
              placeholder="Enter your finance goal here"
              className=" py-3 px-4 block w-full bg-zinc-600/30 opacity-90 border-[#7c7c7c] rounded-lg  placeholder-[#7c7c7c] font-semibold border"
              />
              </div>
            </div>
            
            <div className="flex items-center space-x-2 gap-3">
              <div className="flex gap-1">
                <img src="/al.png" alt="Icon 1" className="w-12 h-12" />
           
              </div>
              <div className="flex w-full space-y-2 flex-col">
              <label className="text-xl font-semibold">Alcohol / No-substance</label>
            <input
              type="text"
              placeholder="Enter your alcohol/No-substance goal here"
              className="  py-3 px-4 block w-full bg-zinc-600/30 opacity-90 border-[#7c7c7c] rounded-lg  placeholder-[#7c7c7c] font-semibold border"
              />
              </div>
              </div>

           

            {/* Next Button */}
              <Link href="/onboard/package"
              >
            
            <button className="py-4 mt-8 px-20 font-semibold  text-black c bg-custom-gradient hover:bg-custom-gradient-hover rounded-full">
              Next
            </button>
           
        
              </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Page;
