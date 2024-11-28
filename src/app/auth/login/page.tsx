"use client";
import React from "react";
import Image from "next/image";
import bgImage from '../../../../public/bg.png'
import { FaTwitter } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import { FaFacebook } from "react-icons/fa";



function AuthPage() {
  return (
    <div className=" bg-[#C2A171] text-white flex items-center justify-center px-4">





      {/* Container */}
      <div className="relative overflow-hidden mt-8 mb-10 bg-gradient-to-l from-[#333333] to-[#121212] rounded-3xl  max-w-4xl w-full p-8 sm:p-10 lg:p-12">

      <Image
        src={bgImage}
        alt="bgimage"
        className="w-full h-full opacity-10 absolute inset-0"
      />
        {/* Header */}
        <div className="text-center mb-2">
          <h1 className="text-4xl md:text-5xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#fbedd3] to-[#c3a374]">
            SOAR
          </h1>
          <p className="text-[#F8F8F8] text-lg sm:text-xl md:text-2xl ">
            Strive. Overcome. Achieve. Repeat
          </p>

          <div className="py-3 mt-4 flex items-center text-lg before:flex-1 before:border-t before:border-[#656565] before:me-6 after:flex-1 after:border-t after:border-[#656565] after:ms-6 dark:text-[#989898] text-[#989898]">Let get started</div>

          
          {/* <p className="mt-4 text-sm text-[#989898]">Let get started</p> */}
        </div>

        {/* Login and Signup Forms */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Login Form */}
          <div className="flex-1">
            <h2 className="text-2xl font-semibold font-Bricolage-Grotesque mb-4">Login</h2>
            <form>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full border rounded-md p-3 text-sm bg-[#292929] opacity-70 border-[#7c7c7c] placeholder-[#7c7c7c] font-semibold focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full bg-[#292929] opacity-70 border-[#7c7c7c] placeholder-[#7c7c7c] font-semibold border  rounded-md p-3 text-sm  focus:outline-none"
                />
              </div>
              <button className="w-full bg-gradient-to-r from-[#c2a171] to-[#fddb9b] text-black font-semibold rounded-full p-3 mt-4">
                Login
              </button>
              <p className="text-md mt-4 text-[#989898] font-semibold text-center cursor-pointer hover:underline">
                Forget Password
              </p>
            </form>
            <hr
  className="my-12 h-[2px] border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400" />
    <div className="flex flex-row items-center justify-center space-x-3">
    <FaFacebook className="text-[#C2A171] w-8 h-8" />

    <FaTwitter className="text-[#C2A171] w-8 h-8" />
    <RiInstagramFill className="text-[#C2A171] w-8 h-8" />

    </div>


          </div>

          {/* Divider */}
          {/* <div className="flex items-center justify-center flex-col">
            <div className="w-px h-20 bg-[#656565]"></div>
            <div className="h-3 w-3 rounded-full bg-[#656565]"></div>
            <div className="w-px h-20 bg-[#656565]"></div>
          </div> */}

<div className="flex flex-col items-center h-full">

  <div className="w-2 h-2 bg-[#656565] rounded-full"></div>

  <div className="w-0.5 h-96 bg-[#656565] flex-grow"></div>

  <div className="w-2 h-2 bg-[#656565] rounded-full"></div>
</div>

          {/* Signup Form */}
          <div className="flex-1">
            <h2 className="text-2xl font-semibold font-Bricolage-Grotesque mb-4">Signup</h2>
            <form>
              <div className="flex gap-4 mb-4">
                <input
                  type="text"
                  placeholder="First name"
                  className="w-1/2 bg-[#292929] opacity-70  border  rounded-md p-3 text-sm border-[#7c7c7c] placeholder-[#7c7c7c] font-semibold focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Last name"
                  className="w-1/2  border  rounded-md p-3 text-sm bg-[#292929] opacity-70 border-[#7c7c7c] placeholder-[#7c7c7c] font-semibold  focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full border  rounded-md p-3 text-sm bg-[#292929] opacity-70 border-[#7c7c7c] placeholder-[#7c7c7c] font-semibold  focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full  border rounded-md p-3 text-sm bg-[#292929] opacity-70 border-[#7c7c7c] placeholder-[#7c7c7c] font-semibold  focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Confirm password"
                  className="w-full  border  rounded-md p-3 text-sm bg-[#292929] opacity-70 border-[#7c7c7c] placeholder-[#7c7c7c] font-semibold  focus:outline-none"
                />
              </div>
              <button className="w-full bg-gradient-to-r from-[#c2a171] to-[#fddb9b] text-black font-semibold rounded-full p-3 mt-4">
                Signup
              </button>
              <p className="text-md font-semibold mt-4 text-[#989898] text-center">
                Already have an account?{" "}
                <span className="text-[#C2A171] cursor-pointer hover:underline">
                  Login
                </span>
              </p>
            </form>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-4 text-center text-sm text-[#989898]">
          Daily Check-in App for your health
        </footer>
      </div>
    </div>
  );
}

export default AuthPage;
