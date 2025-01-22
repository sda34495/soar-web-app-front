// "use client";
// import React, { useRef } from "react";
// import Image from "next/image";
// import bgImage from "../../../../public/bg.png";

// function Verification() {

//   const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

//   // Focus next input when a valid character is entered
//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
//     const value = event.target.value;

//     // If input is not empty and is a valid character (only 1 character is allowed)
//     if (value && value.length === 1) {
//       // Move focus to next input field if it exists
//       if (index < inputRefs.current.length - 1) {
//         inputRefs.current[index + 1]?.focus();
//       }
//     }
//   };

//   const handleBack = (event: React.MouseEvent<HTMLButtonElement>) => {
//     event.preventDefault(); // Prevent default behavior if necessary
//     history.back(); // Go back to the previous page
//   };
//   return (
//     <div className=" bg-[#C2A171] min-h-screen text-white flex items-center justify-center px-4">
//       {/* Container */}
//       <div className="  relative opacity-95 overflow-hidden mt-8 mb-10 bg-gradient-to-l from-[#333333] to-[#121212] rounded-3xl max-w-3xl w-full p-8 sm:p-10 lg:p-12">
//         {/* Background image */}

//         <button
//           onClick={handleBack}
//           className="absolute top-5 text-[#EFEFEF]  text-sm sm:text-lg flex items-center"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="20"
//             height="20"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             className="mr-2"
//           >
//             <path d="M19 12H5"></path>
//             <path d="M12 5l-7 7 7 7"></path>
//           </svg>
//           <span className="hidden sm:inline">Back</span>
//         </button>

//         <Image
//           src={bgImage}
//           alt="bgimage"
//           className="w-full h-full opacity-95 absolute inset-0 -z-10" // Add -z-10 to send the image behind
//         />

//         {/* Header */}
//         <div className="text-center mb-2 relative z-20">
//           {" "}
//           {/* Added relative z-20 */}
//           <h1 className="text-4xl z-50 md:text-5xl lg:text-8xl font-bold text-transparent bg-clip-text bg-custom-heading-gradient">
//             SOAR
//           </h1>
//           <p className="text-[#F8F8F8] text-lg sm:text-xl md:text-2xl ">
//             Strive. Overcome. Achieve. Repeat
//           </p>
//           <div className="py-3 mt-4 flex items-center text-lg before:flex-1 before:border-t before:border-[#656565] before:me-6 after:flex-1 after:border-t after:border-[#656565] after:ms-6 dark:text-[#989898] text-[#989898]">
//             Let get started
//           </div>
//         </div>

//         {/* Login and Signup Forms */}
//         <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-20">
//           {" "}
//           {/* Add relative z-20 */}
//           {/* Login Form */}
//           <div className="flex-1 relative justify-center w-full max-w-xs mx-auto z-20">
//             <div>
//               <h2 className="text-4xl mb-1 mt-4 text-center font-semibold font-Bricolage-Grotesque ">
//                 Verification code
//               </h2>
//               <p className=" text-center text-lg mb-8 text-[#BDBDBD] ">
//                 Enter the code number we sent to{" "}
//                 <span className="text-white"> anders*******.com</span>
//               </p>
//             </div>
//             <form>
//               <div
//                 className="flex justify-center sm:mb-4 gap-x-3"
//                 data-hs-pin-input=""
//               >
//                {[...Array(6)].map((_, index) => (
//                   <input
//                     key={index}
//                     ref={(el) => (inputRefs.current[index] = el)} // Assign ref to each input
//                     type="text"
//                     className="block h-[40px] w-[40px] sm:h-[60px] sm:w-[60px] text-center text-white bg-transparent opacity-70 border rounded-lg text-4xl border-[#7c7c7c] caret-transparent"
//                     data-hs-pin-input-item=""
//                     placeholder="-"
//                     maxLength={1} // Only allow one character
//                     onChange={(e) => handleInputChange(e, index)} // Handle input change
//                   />
//                 ))}
//               </div>

//               <div className="">
//                 <button
//                   type="submit"
//                   className="w-full bg-custom-gradient hover:bg-custom-gradient-hover text-black font-semibold rounded-full p-3 mt-4"
//                 >
//                   Next
//                 </button>
//               </div>
//               <hr className="my-12 h-[2px] border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-45 dark:via-neutral-400" />

//               <p className=" -mt-6 text-sm sm:text-lg text-center text-[#989898] ">
//                 If you don't get the code, resend it in{" "}
//                 <span className="text-[#C2A171] font-semibold">
//                   24 seconds.
//                 </span>
//               </p>
//             </form>
//           </div>
//           {/* Signup Form */}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Verification;
"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import bgImage from "../../../../public/bg.png";
import { useRouter } from "next/navigation";
import { post } from "@/utils/axios";
import toast from "react-hot-toast";
import Spinner from "@/components/UI/Spinner";
import endpoints from "@/utils/endpoints";

function Verification() {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  const [email, setEmail] = React.useState<any>();
  const [otp, setOtp] = React.useState();
  const [loading, setLoading] = useState(false)
  const [counter, setCounter] = useState(60);
  const [resendEnabled, setResendEnabled] = useState(false);
  
  useEffect(() => {
    let timer;
    if (counter > 0) {
      timer = setInterval(() => {
        setCounter((prevCounter) => prevCounter - 1);
      }, 1000);
    } else {
      setResendEnabled(true);
    }
    let otp = localStorage.getItem("otp");
    const Useremail = localStorage.getItem("email");
    if (otp !== "verified") {
      router.push("/auth/forgetPassword");
    }

    if (!Useremail) {
      router.push("/auth/forgetPassword");
    }

    setEmail(Useremail);
    return () => clearInterval(timer); 
  }, [counter]);
  const handleResend = async ()  => {
    const formData = new FormData();
    formData.append("email", email);
    const response = await post(endpoints.OTP_RESEND, formData);
    if (response.status === 200) {
      setCounter(60); // Reset counter to 60 seconds
      setResendEnabled(false);
    }  // Disable resend button
  };
  // Handle input change
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = event.target.value;

    // If input is not empty and is a valid character (only 1 character is allowed)
    if (value && value.length === 1) {
      // Move focus to next input field if it exists
      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  // Handle paste
  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pasteData = event.clipboardData.getData("text").trim();

    // Ensure pasted data is valid and matches the OTP length
    if (!/^\d+$/.test(pasteData)) return;

    const otpLength = inputRefs.current.length;
    const characters = pasteData.slice(0, otpLength).split("");

    characters.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index]!.value = char;
      }
    });

    // Focus the next empty input field
    const nextInputIndex = Math.min(characters.length, otpLength - 1);
    inputRefs.current[nextInputIndex]?.focus();
  };

  const handleBack = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Prevent default behavior if necessary
    history.back(); // Go back to the previous page
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission

    // Collect the OTP value from the refs
    const otpValue = inputRefs.current
      .map((input) => input?.value || "") // Get the value of each input, fallback to empty string
      .join(""); // Join all values to form the complete OTP

    try {
      setLoading(true)
      const formData = new FormData();
      formData.append("email", email);
      formData.append("otp", otpValue);

      
      const response = await post(endpoints.OTP_VERIFY, formData);
      
      if (!response) return;
      

      toast.success("OTP verified successfully");
      

      if (response.status !== 200) {
        throw new Error(response.data.message || " failed");
      }
      localStorage.setItem("token", JSON.stringify(response.data.tempToken));
      router.push("/auth/newPassword");
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Verification failed";
      toast.error(errorMessage);
      
    } finally{
      setLoading(false)
    }

   
  };
  const maskEmail = (email) => {
    return email?.replace(/^(.{1})(.*)(@.*)$/, "$1*****$3");
  };

  return (
    <div className=" bg-[#C2A171] min-h-screen text-white flex items-center justify-center px-4">
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

        <Image
          src={bgImage}
          alt="bgimage"
          className="w-full h-full opacity-95 absolute inset-0 -z-10"
        />

        <div className="text-center mb-2 relative z-20">
          <h1 className="text-4xl z-50 md:text-5xl lg:text-8xl font-bold text-transparent bg-clip-text bg-custom-heading-gradient">
            SOAR
          </h1>
          <p className="text-[#F8F8F8] text-lg sm:text-xl md:text-2xl ">
            Strive. Overcome. Achieve. Repeat
          </p>
          <div className="py-3 mt-4 flex items-center text-lg before:flex-1 before:border-t before:border-[#656565] before:me-6 after:flex-1 after:border-t after:border-[#656565] after:ms-6 dark:text-[#989898] text-[#989898]">
            Let get started
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-20">
          <div className="flex-1 relative justify-center w-full max-w-xs mx-auto z-20">
            <div>
              <h2 className="text-4xl mb-1 mt-4 text-center font-semibold font-Bricolage-Grotesque ">
                Verification code
              </h2>
              <p className=" text-center text-lg mb-8 text-[#BDBDBD] ">
                Enter the code number we sent to{" "}
                <span className="text-white">{maskEmail(email)}</span>
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              <div
                className="flex justify-center sm:mb-4 gap-x-3"
                data-hs-pin-input=""
              >
                {[...Array(6)].map((_, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    className="block h-[40px] w-[40px] sm:h-[60px] sm:w-[60px] text-center text-white bg-transparent opacity-70 border rounded-lg text-4xl border-[#7c7c7c] caret-transparent"
                    data-hs-pin-input-item=""
                    placeholder="-"
                    maxLength={1}
                    onChange={(e) => handleInputChange(e, index)}
                    onPaste={handlePaste} // Add onPaste handler
                    required
                    disabled={loading}
                  />
                ))}
              </div>

              <div className="">
                <button
                  type="submit"
                  className="w-full bg-custom-gradient hover:bg-custom-gradient-hover text-black font-semibold rounded-full p-3 mt-4"
                >
                  {loading ? <Spinner/> :  "Next"}
                </button>
              </div>
            </form>
            {resendEnabled ? (
              <><hr className="my-12 h-[2px] border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-45 dark:via-neutral-400" /><p className=" -mt-6 text-sm sm:text-lg text-center text-[#989898] ">
                If you don't get the code,{" "}
                <button onClick={handleResend} className="text-[#C2A171] font-semibold">Resend</button>
              </p></>
            ): (
                <>
                  <hr className="my-12 h-[2px] border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-45 dark:via-neutral-400" /><p className=" -mt-6 text-sm sm:text-lg text-center text-[#989898] ">
                If you don't get the code, resend it after{" "}
                    <span className="text-[#C2A171] font-semibold">{counter}</span>
              </p>
                </>
             
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Verification;
