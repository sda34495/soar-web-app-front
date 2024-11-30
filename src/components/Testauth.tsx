"use client";
import React, { useState } from "react";
import Image from "next/image";
import bgImage from "../../public/bg.png";
import { FaTwitter } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import { FaFacebook } from "react-icons/fa";

// Define types for form data
interface LoginData {
  email: string;
  password: string;
}

interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Define types for error messages
interface FormErrors {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  confirmPassword?: string;
}

function AuthPage() {
  // States for Login and Signup forms
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [signupData, setSignupData] = useState<SignupData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // States for error handling
  const [loginErrors, setLoginErrors] = useState<FormErrors>({});
  const [signupErrors, setSignupErrors] = useState<FormErrors>({});

  // Handling Login form input changes
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  // Handling Signup form input changes
  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value,
    });
  };

  // Validate Login form
  const validateLogin = (): FormErrors => {
    let errors: FormErrors = {};
    if (!loginData.email) {
      errors.email = "Email is required";
    }
    if (!loginData.password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  // Validate Signup form
  const validateSignup = (): FormErrors => {
    let errors: FormErrors = {};
    if (!signupData.firstName) {
      errors.firstName = "First name is required";
    }
    if (!signupData.lastName) {
      errors.lastName = "Last name is required";
    }
    if (!signupData.email) {
      errors.email = "Email is required";
    }
    if (!signupData.password) {
      errors.password = "Password is required";
    }
    if (signupData.password !== signupData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    return errors;
  };

  // Handle Login form submission
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateLogin();
    if (Object.keys(errors).length > 0) {
      setLoginErrors(errors);
    } else {
      console.log("Login data submitted", loginData);
    }
  };

  // Handle Signup form submission
  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateSignup();
    if (Object.keys(errors).length > 0) {
      setSignupErrors(errors);
    } else {
      // Handle successful signup (e.g., API call)
      console.log("Signup data submitted", signupData);
    }
  };

  return (
    <div className="bg-[#C2A171] text-white flex items-center justify-center px-4">
      {/* Container */}
      <div className="py-3 relative opacity-95 overflow-hidden mt-8 mb-10 bg-gradient-to-l from-[#333333] to-[#121212] rounded-3xl max-w-4xl w-full px-8 sm:px-10 lg:px-12">
        {/* Background image */}
        <Image
          src={bgImage}
          alt="bgimage"
          className="w-full h-full opacity-5 absolute inset-0 -z-10"
        />

        {/* Header */}
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

        {/* Login and Signup Forms */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-20">
          {/* Login Form */}
          <div className="flex-1 relative z-20">
            <h2 className="text-2xl font-semibold font-Bricolage-Grotesque mb-4">
              Login
            </h2>
            <form onSubmit={handleLoginSubmit}>
              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  className="w-full border rounded-md p-3 text-sm bg-transparent opacity-90 border-[#7c7c7c] placeholder-[#7c7c7c] font-semibold focus:outline-none"
                />
                {loginErrors.email && (
                  <p className="text-red-500 text-sm">{loginErrors.email}</p>
                )}
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  className="w-full bg-transparent opacity-70 border-[#7c7c7c] placeholder-[#7c7c7c] font-semibold border rounded-md p-3 text-sm focus:outline-none"
                />
                {loginErrors.password && (
                  <p className="text-red-500 text-sm">{loginErrors.password}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-custom-gradient hover:bg-custom-gradient-hover text-black font-semibold rounded-full p-3 mt-4"
              >
                Login
              </button>
              <p className="text-md mt-3 text-[#989898] font-semibold text-center cursor-pointer hover:underline">
                Forget Password
              </p>
              <hr className="my-12 h-[2px] border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400" />
              <div className="flex flex-row items-center justify-center space-x-3">
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook className="text-[#C2A171] w-8 h-8" />
                </a>
                <a
                  href="https://www.twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter className="text-[#C2A171] w-8 h-8" />
                </a>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <RiInstagramFill className="text-[#C2A171] w-8 h-8" />
                </a>
              </div>
            </form>
          </div>

          {/* Divider */}
          <div className="flex flex-col items-center h-full relative z-20">
            <div className="w-2 h-2 bg-[#656565] rounded-full"></div>
            <div className="w-0.5 h-96 bg-[#656565] flex-grow"></div>
            <div className="w-2 h-2 bg-[#656565] rounded-full"></div>
          </div>

          {/* Signup Form */}
          <div className="flex-1 relative z-20">
            <h2 className="text-2xl font-semibold font-Bricolage-Grotesque mb-4">
              Signup
            </h2>
            <form onSubmit={handleSignupSubmit}>
              <div className="flex gap-4 mb-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={signupData.firstName}
                  onChange={handleSignupChange}
                  className="w-1/2 bg-transparent opacity-70 border rounded-md p-3 text-sm border-[#7c7c7c] placeholder-[#7c7c7c] font-semibold focus:outline-none"
                />
                {signupErrors.firstName && (
                  <p className="text-red-500 text-sm">
                    {signupErrors.firstName}
                  </p>
                )}
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={signupData.lastName}
                  onChange={handleSignupChange}
                  className="w-1/2 border rounded-md p-3 text-sm bg-transparent opacity-70 border-[#7c7c7c] placeholder-[#7c7c7c] font-semibold focus:outline-none"
                />
                {signupErrors.lastName && (
                  <p className="text-red-500 text-sm">
                    {signupErrors.lastName}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={signupData.email}
                  onChange={handleSignupChange}
                  className="w-full border rounded-md p-3 text-sm bg-transparent opacity-70 border-[#7c7c7c] placeholder-[#7c7c7c] font-semibold focus:outline-none"
                />
                {signupErrors.email && (
                  <p className="text-red-500 text-sm">{signupErrors.email}</p>
                )}
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={signupData.password}
                  onChange={handleSignupChange}
                  className="w-full border rounded-md p-3 text-sm bg-transparent opacity-70 border-[#7c7c7c] placeholder-[#7c7c7c] font-semibold focus:outline-none"
                />
                {signupErrors.password && (
                  <p className="text-red-500 text-sm">
                    {signupErrors.password}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={signupData.confirmPassword}
                  onChange={handleSignupChange}
                  className="w-full border rounded-md p-3 text-sm bg-transparent opacity-70 border-[#7c7c7c] placeholder-[#7c7c7c] font-semibold focus:outline-none"
                />
                {signupErrors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {signupErrors.confirmPassword}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-custom-gradient hover:bg-custom-gradient-hover text-black font-semibold rounded-full p-3 mt-4"
              >
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
        <footer className="mt-4 text-sm sm:text-lg text-center text-[#989898]">
          Daily Check-in App for your health
        </footer>
      </div>
    </div>
  );
}

export default AuthPage;

// Without State Management

// "use client";
// import React from "react";
// import Image from "next/image";
// import bgImage from "../../../../public/bg.png";
// import { FaTwitter } from "react-icons/fa6";
// import { RiInstagramFill } from "react-icons/ri";
// import { FaFacebook } from "react-icons/fa";

// function AuthPage() {
//   return (
//     <div className=" bg-[#C2A171] text-white flex items-center justify-center px-4">
//       {/* Container */}
//       <div className=" py-3 relative opacity-95 overflow-hidden mt-8 mb-10 bg-gradient-to-l from-[#333333] to-[#121212] rounded-3xl max-w-4xl w-full px-8 sm:px-10 lg:px-12">
//   {/* Background image */}
//   <Image
//     src={bgImage}
//     alt="bgimage"
//     className="w-full h-full opacity-5 absolute inset-0 -z-10"  // Add -z-10 to send the image behind
//   />

//   {/* Header */}
//   <div className="text-center mb-2 relative z-20"> {/* Added relative z-20 */}
//     <h1 className="text-4xl z-50 md:text-5xl lg:text-8xl font-bold text-transparent bg-clip-text bg-custom-heading-gradient">
//       SOAR
//     </h1>
//     <p className="text-[#F8F8F8] text-lg sm:text-xl md:text-2xl ">Strive. Overcome. Achieve. Repeat</p>

//     <div className="py-3 mt-4 flex items-center text-lg before:flex-1 before:border-t before:border-[#656565] before:me-6 after:flex-1 after:border-t after:border-[#656565] after:ms-6 dark:text-[#989898] text-[#989898]">
//       Let get started
//     </div>
//   </div>

//   {/* Login and Signup Forms */}
//   <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-20"> {/* Add relative z-20 */}
//     {/* Login Form */}
//     <div className="flex-1 relative z-20">
//       <h2 className="text-2xl font-semibold font-Bricolage-Grotesque mb-4">Login</h2>
//       <form>
//         <div className="mb-4">
//           <input
//             type="email"
//             placeholder="Email"
//             className="w-full border rounded-md p-3 text-sm bg-transparent opacity-90 border-[#7c7c7c] placeholder-[#7c7c7c] font-semibold focus:outline-none"
//           />
//         </div>
//         <div className="mb-4">
//           <input
//             type="password"
//             placeholder="Password"
//             className="w-full bg-transparent opacity-70 border-[#7c7c7c] placeholder-[#7c7c7c] font-semibold border  rounded-md p-3 text-sm  focus:outline-none"
//           />
//         </div>
//         <button className="w-full bg-gradient-to-r from-[#c2a171] to-[#fddb9b] text-black font-semibold rounded-full p-3 mt-4">
//           Login
//         </button>
//         <p className="text-md mt-3 text-[#989898] font-semibold text-center cursor-pointer hover:underline">
//           Forget Password
//         </p>
//         <hr className="my-12 h-[2px] border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400" />
//         <div className="flex flex-row items-center justify-center space-x-3">
//   <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
//     <FaFacebook className="text-[#C2A171] w-8 h-8" />
//   </a>
//   <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
//     <FaTwitter className="text-[#C2A171] w-8 h-8" />
//   </a>
//   <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
//     <RiInstagramFill className="text-[#C2A171] w-8 h-8" />
//   </a>
// </div>
//       </form>
//     </div>

//     {/* Divider */}
//     <div className="flex flex-col items-center h-full relative z-20">
//       <div className="w-2 h-2 bg-[#656565] rounded-full"></div>
//       <div className="w-0.5 h-96 bg-[#656565] flex-grow"></div>
//       <div className="w-2 h-2 bg-[#656565] rounded-full"></div>
//     </div>

//     {/* Signup Form */}
//     <div className="flex-1 relative z-20">
//       <h2 className="text-2xl font-semibold font-Bricolage-Grotesque mb-4">Signup</h2>
//       <form>
//         <div className="flex gap-4 mb-4">
//           <input
//             type="text"
//             placeholder="First name"
//             className="w-1/2 bg-transparent opacity-70  border  rounded-md p-3 text-sm border-[#7c7c7c] placeholder-[#7c7c7c] font-semibold focus:outline-none"
//           />
//           <input
//             type="text"
//             placeholder="Last name"
//             className="w-1/2  border  rounded-md p-3 text-sm bg-transparent opacity-70 border-[#7c7c7c] placeholder-[#7c7c7c] font-semibold  focus:outline-none"
//           />
//         </div>
//         <div className="mb-4">
//           <input
//             type="email"
//             placeholder="Email Address"
//             className="w-full border  rounded-md p-3 text-sm bg-transparent opacity-70 border-[#7c7c7c] placeholder-[#7c7c7c] font-semibold  focus:outline-none"
//           />
//         </div>
//         <div className="mb-4">
//           <input
//             type="password"
//             placeholder="Password"
//             className="w-full  border rounded-md p-3 text-sm bg-transparent opacity-70 border-[#7c7c7c] placeholder-[#7c7c7c] font-semibold  focus:outline-none"
//           />
//         </div>
//         <div className="mb-4">
//           <input
//             type="password"
//             placeholder="Confirm password"
//             className="w-full  border  rounded-md p-3 text-sm bg-transparent opacity-70 border-[#7c7c7c] placeholder-[#7c7c7c] font-semibold  focus:outline-none"
//           />
//         </div>
//         <button className="w-full bg-gradient-to-r from-[#c2a171] to-[#fddb9b] text-black font-semibold rounded-full p-3 mt-4">
//           Signup
//         </button>
//         <p className="text-md font-semibold mt-4 text-[#989898] text-center">
//           Already have an account?{" "}
//           <span className="text-[#C2A171] cursor-pointer hover:underline">
//             Login
//           </span>
//         </p>
//       </form>
//     </div>
//   </div>

//   {/* Footer */}
//   <footer className="mt-4 text-sm   sm:text-lg text-center  text-[#989898]">
//     Daily Check-in App for your health
//   </footer>
// </div>

//     </div>
//   );
// }

// export default AuthPage;
