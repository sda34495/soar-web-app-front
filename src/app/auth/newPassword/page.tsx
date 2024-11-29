"use client";
import React, { useState } from "react";
import Image from "next/image";
import bgImage from "../../../../public/bg.png";
import { FaTwitter } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import { FaFacebook } from "react-icons/fa";

function CreatePassword() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleBack = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Prevent default behavior if necessary
    history.back(); // Go back to the previous page
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <div className="bg-[#C2A171] min-h-screen text-white flex items-center justify-center px-4">
      {/* Container */}
      <div className="relative opacity-95 overflow-hidden mt-8 mb-10 bg-gradient-to-l from-[#333333] to-[#121212] rounded-3xl max-w-3xl w-full p-8 sm:p-10 lg:p-12">
        <button
          onClick={handleBack}
          className="absolute top-5 text-[#EFEFEF] text-sm sm:text-lg flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2"
          >
            <path d="M19 12H5"></path>
            <path d="M12 5l-7 7 7 7"></path>
          </svg>
          <span className="hidden sm:inline">Back</span>
        </button>

        {/* Background image */}
        <Image
          src={bgImage}
          alt="bgimage"
          className="w-full h-full opacity-95 absolute inset-0 -z-10" // Add -z-10 to send the image behind
        />

        {/* Header */}
        <div className="text-center mb-2 relative z-20">
          <h1 className="text-4xl z-50 md:text-5xl lg:text-8xl font-bold text-transparent bg-clip-text bg-custom-heading-gradient">
            SOAR
          </h1>
          <p className="text-[#F8F8F8] text-lg sm:text-xl md:text-2xl ">
            Strive. Overcome. Achieve. Repeat
          </p>
          <div className="py-3 mt-4 flex items-center text-lg before:flex-1 before:border-t before:border-[#656565] before:me-6 after:flex-1 after:border-t after:border-[#656565] dark:text-[#989898] text-[#989898]">
            Let get started
          </div>
        </div>

        {/* Create New Password Form */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-20">
          <div className="flex-1 relative justify-center w-full max-w-xs mx-auto z-20">
            <h2 className="text-3xl mb-8 mt-4 text-center font-semibold font-Bricolage-Grotesque ">
              Create New Password
            </h2>
            <form>
              <div className="mb-4">
                <div className="relative">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    className="peer py-3 px-4  block w-full bg-transparent opacity-70 border-[#7c7c7c] rounded-lg placeholder-[#7c7c7c] font-semibold focus:outline-none  border"
                  />
                  <div
                    className="absolute inset-y-0 right-0 flex items-center cursor-pointer pr-4"
                    onClick={togglePasswordVisibility}
                  >
                    {passwordVisible ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 text-[#7c7c7c]"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 text-[#7c7c7c]"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="relative">
                  <input
                    type={confirmPasswordVisible ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className="peer py-3 px-4 block w-full bg-transparent opacity-70 border-[#7c7c7c] rounded-lg text- placeholder-[#7c7c7c] font-semibold focus:outline-none  border"
                  />
                  <div
                    className="absolute inset-y-0 right-0 flex items-center cursor-pointer pr-4"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {confirmPasswordVisible ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 text-[#7c7c7c]"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 text-[#7c7c7c]"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-custom-gradient hover:bg-custom-gradient-hover text-black font-semibold rounded-full p-3 mt-8"
              >
                Submit
              </button>
              <hr className="my-12 h-[2px] border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-45 dark:via-neutral-400" />
              <p className="-mt-6 text-sm sm:text-lg text-center text-[#989898] ">
                Try with another email.{" "}
                <a href="/auth/login">
                  <span className="text-[#C2A171] font-semibold">Login</span>
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePassword;
