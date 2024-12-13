"use client";
import React from 'react';
const Welcome = () => {

  
  return (
    <>
      <div className="relative w-full h-screen bg-image bg-zinc-900 dark:bg-zinc-900  ">
    
        {/* Centered Content */}
        <div className="flex flex-col items-center justify-center h-full text-white relative z-10 px-4">
          
          {/* Title Section */}
          <header className="text-center">
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#fbedd3] to-[#c3a374]">
              SOAR
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#F8F8F8]">
              Strive. Overcome. Achieve. Repeat
            </p>
          </header>

          {/* Divider */}
          <div className="flex mt-3 items-center justify-center w-full max-w-4xl">
            <div className="h-[1px] w-full bg-[#656565]"></div>
            <div className="h-3 w-6 bg-[#656565] rounded-full mx-4"></div>
            <div className="h-[1px] w-full bg-[#656565]"></div>
          </div>

          {/* Tagline */}
          <section className="mt-10 flex flex-col items-center text-center">
            <img
              src="/cone.png"
              alt="Cone"
              className="w-18 h-16 mx-auto mb-2"
              />

            <h1 className='text-3xl'>Welcome aboard!</h1>
            <p className="mt-10 text-sm sm:text-base md:text-lg lg:text-xl text-[#DCDCDC]">
              You've taken the first step toward an exciting journey. Get ready to
              <br />
              explore all the features waiting for you. We're thrilled to have you
              <br />
              with us!
            </p>
          </section>

          {/* Buttons */}
          <footer className="mt-10 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                      <a href="/onboard/onboarding">
                      <button className="bg-gradient-to-b from-[#fbedd3] to-[#c3a374] px-12 sm:px-16 py-2 font-medium text-black rounded-full">
              Explore Now
            </button>
                      </a>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Welcome;
