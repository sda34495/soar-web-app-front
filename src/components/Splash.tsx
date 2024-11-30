"use client";
import Image from "next/image";
import React from "react";
import bgImage from '../../public/bg.png'

function Splash() {
  return (
    <div className="relative w-full h-screen  bg-zinc-900 dark:bg-zinc-900" >
      {/* Background Image */}
      <Image
        src={bgImage}
        alt="bgimage"
        className="w-full h-full opacity-80 absolute inset-0"
      />

      {/* Centered Content */}
      <div className="flex flex-col items-center justify-center h-full text-white relative z-10 px-4">
        {/* Title Section */}
        <header className="text-center">
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-transparent bg-clip-text bg-custom-heading-gradient">
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
        <section className="mt-10 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-Bricolage-Grotesque text-[#DCDCDC]">
            Embrace a <br />
            <span className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#EFE8CD]">
              <span className="text-[#C78526]">Healthier,</span> Happier You!
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base md:text-lg lg:text-xl text-[#DCDCDC]">
            "Strive. Overcome. Achieve. Repeat"
            <br />
            Daily Check-in & Tracking
          </p>
        </section>

        {/* Buttons */}
        <footer className="mt-10 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <a href="/auth/login">
            <button className="px-12 w-full sm:px-20 py-4   text-white font-semibold  rounded-full border-2 border-[#FBF9EB]">
              Signup
            </button>
          </a>
          <a href="/auth/login">
            <button className="px-12 w-full  sm:px-20 py-4 text-black c bg-custom-gradient hover:bg-custom-gradient-hover rounded-full">
              Login
            </button>
          </a>
        </footer>
      </div>
    </div>
  );
}

export default Splash;
