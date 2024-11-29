'use client'
import React from "react";

const Page = () => {

  
  return (
    <>
      
      <div className="flex flex-col mt-20 mx-6 sm:mx-40 lg:mx-auto">
        
        <div className="mx-auto w-full sm:w-2/3 lg:w-1/2">
        <header className="w-full  mt-10 ml-10 bg-red">
          <div className=" w-[120px] text-center">
        <hr className="bg-gradient-to-b from-[#fbedd3] to-[#c3a374] w-[120px]"  />
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#fbedd3] to-[#c3a374]">
          SOAR
        </h1>
        <hr className="bg-gradient-to-b from-[#fbedd3] to-[#c3a374] w-[120px]" />
          </div>
      </header>
          <div className="mt-10 items-start">
            <h2 className="text-white text-2xl">How are you planning to use SOAR?</h2>
            <p className="text-zinc-500 mt-2">
              We&apos;ll fit the experience to your needs. Don&apos;t worry, you can change it later.
            </p>
          </div>

          <form className="flex flex-col mt-8  text-white gap-6">
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
            <button className="w-32 mt-5 bg-gradient-to-b from-[#fbedd3] to-[#c3a374]  py-2 font-medium text-black rounded-full">
            <a href="/onboard/package">
              Next
            </a>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Page;
