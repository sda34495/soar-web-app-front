import React from "react";

const Page = () => {

   
  
  return (
    <>
      {/* Header Section */}
      <header className="w-[120px] text-center mt-10 ml-10">
        <hr className="bg-gradient-to-b from-[#fbedd3] to-[#c3a374] " />
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#fbedd3] to-[#c3a374]">
          SOAR
        </h1>
        <hr className="bg-gradient-to-b from-[#fbedd3] to-[#c3a374]" />
      </header>

      {/* Form Section */}
      <div className="flex flex-col mt-20 mx-6 sm:mx-20 lg:mx-40">
        <div className="mx-auto w-full sm:w-2/3 lg:w-1/2">
          <div className="mt-10 items-start">
            <h2 className="text-white text-2xl">How are you planning to use SOAR?</h2>
            <p className="text-zinc-500 mt-2">
              We&apos;ll fit the experience to your needs. Don&apos;t worry, you can change it later.
            </p>
          </div>

          <form className="flex flex-col mt-8 text-white gap-6">
            {/* Fitness Goal Input */}
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                <img src="/fitness.png" alt="Icon 1" className="w-12 h-12" />
           
              </div>
              <label className="text-lg">Fitness</label>
            </div>
            <input
              type="text"
              placeholder="Enter your fitness goal here"
              className=" drop-shadow-sm  bg-zinc-600/30 w-full rounded-md border border-gray-400 outline-none p-3 focus:border-[#c3a374] transition-all"
            />

            {/* Finance Goal Input */}
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                <img src="/dollar.png" alt="Icon 1" className="w-12 h-12" />
              
              </div>
              <label className="text-lg">Finance</label>
            </div>
            <input
              type="text"
              placeholder="Enter your finance goal here"
              className=" drop-shadow-sm  bg-zinc-600/30 w-full rounded-md border border-gray-400 outline-none p-3 focus:border-[#c3a374] transition-all"
            />

            {/* Alcohol/No-substance Goal Input */}
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                <img src="/null.png" alt="Icon 1" className="w-6 h-6" />
    
              </div>
              <label className="text-lg">Alcohol/No-substance</label>
            </div>
            <input
              type="text"
              placeholder="Enter your alcohol/No-substance goal here"
              className=" drop-shadow-sm  bg-zinc-600/30 w-full rounded-md border border-gray-400 outline-none p-3 focus:border-[#c3a374] transition-all"
            />

            {/* Next Button */}
            <button className="w-32 mt-5 bg-gradient-to-b from-[#fbedd3] to-[#c3a374]  py-2 font-medium text-black rounded-full">
              Next
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Page;
