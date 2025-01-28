"use client";
import React, { useState } from "react";
import Image from "next/image";
import bgImage from "../../../../public/bg.png";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { post } from "@/utils/axios";
import toast from "react-hot-toast";
import Spinner from "@/components/UI/Spinner";
import endpoints from "@/utils/endpoints";

function ForgetPassword() {
  const [email, setEmail] = useState(""); // State to hold email value
  const [error, setError] = useState(""); // State to show error message
  const router = useRouter(); // To handle redirection
  const [loading , setLoading] = useState(false);
  const handleBack = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Prevent default behavior if necessary
    history.back(); // Go back to the previous page
  };

  // Handle form submission
  const handleSubmit = async (e: any) => {
    e.preventDefault(); // Prevent the default form submission behavior
    localStorage.clear();

    if (email.trim() === "") {
      setError("Email is required!");
      return; // Stop the function if email is empty
    } else {
      setError("");
      try {
        setLoading(true)
        const formdata = new FormData();

        formdata.append("email", email);
        

        ;
        const response = await post(endpoints.FORGET_PASSWORD_REQUEST_OTP, formdata);
        
        if (!response) return;
        
        
        if (response.status !== 200) {
          throw new Error(response.data.message || "Signup failed");
        }
        
        localStorage.setItem("email", email);
        localStorage.setItem("otp", "verified");
        toast.success("OTP sent successfully");
        router.push("/auth/verification");
        
      } catch (error: any) {
        console.log("OPT error:", error);

        if (error.response) {
          setError(
            error.response.data.message || "OPT failed. Please try again."
          );
        } else if (error.request) {
          // console.log("No response received:", error.request);
          setError("No response from server. Please check your connection.");
        } else {
          // console.log("Error:", error.message);
          setError("An error occurred while sending otp.");
        }
        // toast.error(error);
      } finally {
        setLoading(false);
      }
    }

    setError(""); // Reset any previous error messages
    // Simulate a delay (e.g., for some API call)
    // setTimeout(() => {
    //   // Redirect to verification page after delay
    //   router.push("/auth/verification");
    // }, 2000); // Wait 2 seconds before redirecting (you can change this time)
  };

  return (
    <div className="bg-[#C2A171] min-h-screen text-white flex items-center justify-center px-4">
      {/* Container */}
      <div className="relative  opacity-95 overflow-hidden mt-8 mb-10 bg-gradient-to-l from-[#333333] to-[#121212] rounded-3xl max-w-3xl w-full p-8 sm:p-10 lg:p-12">
        {/* Background image */}
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

        {/* Login Form */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-20">
          <div className="flex-1 relative justify-center w-full max-w-xs mx-auto z-20">
            <h2 className="text-3xl mb-8 mt-4 text-center font-semibold font-Bricolage-Grotesque ">
              Forget Password
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Update email state
                    className="peer py-3 px-4 pl-11 block w-full bg-transparent opacity-90 border-[#7c7c7c] rounded-lg  placeholder-[#7c7c7c] font-semibold focus:outline-none border "
                    required
                    disabled={loading}
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none pl-4">
                    <svg
                      className="shrink-0 w-6 h-6 text-[#7c7c7c]"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Error message for email */}
              {error && <p className="text-red-500 text-sm -mt-2">{error}</p>}

              <div>
                <button
                  type="submit"
                  className="w-full bg-custom-gradient hover:bg-custom-gradient-hover text-black font-semibold rounded-full p-3 mt-4"
                >
                  {loading ? <Spinner/> :  "Submit"}
                </button>
              </div>
            </form>

            <Link href="/auth/login">
              <p className="text-md mt-3 text-[#989898] font-semibold text-center cursor-pointer hover:underline">
                Try with another account
              </p>
            </Link>

            <hr className="my-12 h-[2px] border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-45 dark:via-neutral-400" />

            <p className=" -mt-6 text-sm sm:text-lg text-center text-[#989898] ">
              Didn’t receive the code!{" "}
              <span className="text-[#C2A171] font-semibold">Send again</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
